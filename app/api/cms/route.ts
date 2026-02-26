import { NextRequest, NextResponse } from "next/server";
import { getCMSContent, saveCMSContent, CMSContent } from "@/lib/cms-data";

export async function GET() {
    try {
        const content = await getCMSContent();
        return NextResponse.json(content);
    } catch {
        return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as CMSContent;

        // Save directly to MongoDB using the refactored saveCMSContent function
        await saveCMSContent(body);
        return NextResponse.json({ success: true, message: "Saved to MongoDB" });
    } catch (e) {
        console.error("CMS POST Error:", e);
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
