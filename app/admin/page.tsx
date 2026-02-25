"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    LayoutDashboard, Sliders, Home, Info, Briefcase, Phone,
    HelpCircle, Users, Settings, LogOut, ChevronRight, CheckCircle, Mail, FileText
} from "lucide-react";

const sections = [
    { href: "/admin/global", icon: <Settings size={20} />, title: "Global Settings", desc: "Site name, logo, footer tagline" },
    { href: "/admin/hero", icon: <Sliders size={20} />, title: "Hero Slider", desc: "Slides, titles, images, CTAs" },
    { href: "/admin/home", icon: <Home size={20} />, title: "Homepage", desc: "Stats, services, logos" },
    { href: "/admin/submissions", icon: <Mail size={20} />, title: "Form Submissions", desc: "View Quote Requests" },
    { href: "/admin/about", icon: <FileText size={20} />, title: "About Page", desc: "Intro, team, process, values" },
    { href: "/admin/services", icon: <Briefcase size={20} />, title: "Services", desc: "Service cards, images, descriptions" },
    { href: "/admin/pages", icon: <LayoutDashboard size={20} />, title: "Page Banners", desc: "Hero images & text for inner pages" },
    { href: "/admin/testimonials", icon: <Users size={20} />, title: "Testimonials", desc: "Client reviews and ratings" },
    { href: "/admin/contact", icon: <Phone size={20} />, title: "Contact Info", desc: "Phone, email, address, hours" },
    { href: "/admin/faq", icon: <HelpCircle size={20} />, title: "FAQs", desc: "Questions & answers" },
    { href: "/admin/quote", icon: <CheckCircle size={20} />, title: "Quote Section", desc: "Global free quote CTA block" },
    { href: "/admin/privacy", icon: <Info size={20} />, title: "Privacy & Terms", desc: "Legal content and banner" },
];

export default function AdminDashboard() {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isAuthed = localStorage.getItem("cms-auth") === "true";
        setAuthed(isAuthed);
        setLoading(false);
        if (!isAuthed) window.location.href = "/admin/login";
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>;
    if (!authed) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                            <LayoutDashboard size={16} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">Yasco CMS</h1>
                            <p className="text-xs text-gray-500">Content Management System</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/" target="_blank" className="text-sm text-green-600 hover:underline font-medium">
                            View Site ↗
                        </Link>
                        <button
                            onClick={() => { localStorage.removeItem("cms-auth"); window.location.href = "/admin/login"; }}
                            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-900">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Select a section to edit your website content.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sections.map((s) => (
                        <Link
                            key={s.href}
                            href={s.href}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-200 flex items-start gap-4"
                        >
                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-all duration-200">
                                {s.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900">{s.title}</h3>
                                <p className="text-sm text-gray-500 mt-0.5">{s.desc}</p>
                            </div>
                            <ChevronRight size={18} className="text-gray-300 group-hover:text-green-500 transition-colors shrink-0 mt-1" />
                        </Link>
                    ))}
                </div>

                <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-green-800 text-sm">Full CMS Active</p>
                        <p className="text-green-700 text-sm mt-0.5">Every section of your website is editable — including images, background images, and all text content.</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
