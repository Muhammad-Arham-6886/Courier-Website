import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const QUOTES_FILE = path.join(process.cwd(), 'data', 'cms', 'quotes.json');

// Get stored quotes
export async function GET() {
    try {
        if (!fs.existsSync(QUOTES_FILE)) {
            return NextResponse.json({ quotes: [] });
        }
        const data = fs.readFileSync(QUOTES_FILE, 'utf-8');
        return NextResponse.json({ quotes: JSON.parse(data) || [] });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to read quotes' }, { status: 500 });
    }
}

// Submit a new quote
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validation basic
        if (!body.name || !body.email || !body.phone || !body.message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newQuote = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...body,
            status: 'new' // 'new', 'read', 'replied'
        };

        // 1. Save to CMS Dashboard (quotes.json)
        let quotes = [];
        if (fs.existsSync(QUOTES_FILE)) {
            const data = fs.readFileSync(QUOTES_FILE, 'utf-8');
            quotes = JSON.parse(data);
        }
        quotes.unshift(newQuote); // add to top
        fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2));

        // 2. Send Email
        try {
            // Configure proper SMTP details via Environment Variables for production.
            // Form submissions will be sent to the configured SMTP_TO address or fallback to info@yascocouriers.co.uk
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: Number(process.env.SMTP_PORT) || 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            // Since SMTP is likely not set up yet in their local env, 
            // we will catch the error so it doesn't break the form submission, 
            // but the logic is here for when they add their env vars.

            const mailOptions = {
                from: process.env.SMTP_FROM || '"Yasco Website" <noreply@yascocouriers.co.uk>',
                to: process.env.SMTP_TO || 'info@yascocouriers.co.uk',
                subject: `New Quote Request from ${body.name}`,
                text: `
                    You have received a new quote request from the website.
                    
                    Name: ${body.name}
                    Email: ${body.email}
                    Phone: ${body.phone}
                    From Postcode: ${body.fromPostcode || 'N/A'}
                    To Postcode: ${body.toPostcode || 'N/A'}
                    
                    Message:
                    ${body.message}
                `,
                html: `
                    <h2>New Quote Request</h2>
                    <p><strong>Name:</strong> ${body.name}</p>
                    <p><strong>Email:</strong> ${body.email}</p>
                    <p><strong>Phone:</strong> ${body.phone}</p>
                    <p><strong>Collection Postcode:</strong> ${body.fromPostcode || 'N/A'}</p>
                    <p><strong>Delivery Postcode:</strong> ${body.toPostcode || 'N/A'}</p>
                    <br/>
                    <p><strong>Message:</strong></p>
                    <p>${body.message.replace(/\n/g, '<br/>')}</p>
                `
            };

            // Only attempt to send if SMTP_USER is configured to avoid crashes locally
            if (process.env.SMTP_USER) {
                await transporter.sendMail(mailOptions);
            } else {
                console.log('📝 SMTP details not configured. Quote saved to CMS but email skipped.');
                console.log('Mail payload:', mailOptions);
            }

        } catch (emailError) {
            console.error('Failed to send email:', emailError);
            // We don't throw here. We still want to return a success to the user 
            // if the quote was saved to the CMS successfully.
        }

        return NextResponse.json({ success: true, message: 'Quote submitted successfully' });

    } catch (err) {
        console.error('POST Quote Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Delete a quote
export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing Quote ID' }, { status: 400 });
        }

        if (!fs.existsSync(QUOTES_FILE)) {
            return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
        }

        const data = fs.readFileSync(QUOTES_FILE, 'utf-8');
        let quotes = JSON.parse(data);

        const initialLength = quotes.length;
        quotes = quotes.filter((q: any) => q.id !== id);

        if (quotes.length === initialLength) {
            return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
        }

        fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2));
        return NextResponse.json({ success: true, message: 'Quote deleted successfully' });

    } catch (err) {
        console.error('DELETE Quote Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
