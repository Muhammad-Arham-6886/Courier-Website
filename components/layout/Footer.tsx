import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import type { ContactInfo } from "@/lib/cms-data";

interface FooterProps {
    contact: ContactInfo;
}

export default function Footer({ contact }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-gray-300">
            {/* CTA Strip */}
            <div className="bg-primary">
                <div className="container-custom py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-white font-bold text-xl">Need a same-day courier?</h3>
                        <p className="text-white/80 text-sm mt-1">Call us now — we collect within the hour.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href={`tel:${contact.phone}`} className="btn-secondary text-sm font-bold">
                            <Phone size={16} />{contact.phone}
                        </a>
                        <Link href="/contact" className="btn-secondary text-sm">Get a Quote</Link>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="container-custom py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center mb-5">
                            <Image
                                src="/yasco-logo.png"
                                alt="Yasco Couriers"
                                width={140}
                                height={50}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Friendly &amp; professional same-day courier services across Bradford, West Yorkshire and the UK.
                        </p>

                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone size={15} className="text-primary mt-0.5 shrink-0" />
                                <a href={`tel:${contact.phone}`} className="hover:text-primary transition-colors">{contact.phone}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={15} className="text-primary mt-0.5 shrink-0" />
                                <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors break-all">{contact.email}</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                                <address className="not-italic">
                                    Yasco Couriers Ltd<br />
                                    {contact.address.street}<br />
                                    {contact.address.city}, {contact.address.postcode}<br />
                                    {contact.address.country}
                                </address>
                            </li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Office Hours</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2"><Clock size={14} className="text-primary shrink-0" />{contact.hours.weekdays}</li>
                            <li className="flex items-center gap-2"><Clock size={14} className="text-primary shrink-0" />{contact.hours.saturday}</li>
                            <li className="flex items-center gap-2"><Clock size={14} className="text-primary shrink-0" />{contact.hours.sunday}</li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-widest">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "/about", label: "About Us" },
                                { href: "/services", label: "Our Services" },
                                { href: "/contact", label: "Locations" },
                                { href: "/faq", label: "FAQs" },
                                { href: "/privacy-terms", label: "Privacy & Terms" },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="flex items-center gap-2 hover:text-primary transition-colors group">
                                        <ChevronRight size={14} className="text-primary group-hover:translate-x-1 transition-transform" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10">
                <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
                    <p>&copy; {currentYear} Yasco Couriers Ltd. All rights reserved.</p>
                    <Link href="/privacy-terms" className="hover:text-primary transition-colors">Privacy &amp; Terms</Link>
                </div>
            </div>
        </footer>
    );
}
