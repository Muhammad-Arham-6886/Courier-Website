"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function AdminContactPage() {
    const router = useRouter();
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("cms-auth") !== "true") { router.replace("/admin/login"); return; }
        fetch("/api/cms").then((r) => r.json()).then(setContent);
    }, [router]);

    const saveContent = async () => {
        if (!content) return;
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-secret": "yasco-admin-2024" }, body: JSON.stringify(content) });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const set = (path: string[], value: string) => {
        if (!content) return;
        const newContent = JSON.parse(JSON.stringify(content)) as CMSContent;
        let obj: Record<string, unknown> = newContent as unknown as Record<string, unknown>;
        for (let i = 0; i < path.length - 1; i++) {
            obj = obj[path[i]] as Record<string, unknown>;
        }
        obj[path[path.length - 1]] = value;
        setContent(newContent);
    };

    if (!content) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

    const fields = [
        { label: "Phone", id: "contact-phone", path: ["contact", "phone"], type: "tel", value: content.contact.phone },
        { label: "Email", id: "contact-email", path: ["contact", "email"], type: "email", value: content.contact.email },
        { label: "Street Address", id: "contact-street", path: ["contact", "address", "street"], type: "text", value: content.contact.address.street },
        { label: "City", id: "contact-city", path: ["contact", "address", "city"], type: "text", value: content.contact.address.city },
        { label: "Postcode", id: "contact-postcode", path: ["contact", "address", "postcode"], type: "text", value: content.contact.address.postcode },
        { label: "Weekday Hours", id: "contact-weekday", path: ["contact", "hours", "weekdays"], type: "text", value: content.contact.hours.weekdays },
        { label: "Saturday Hours", id: "contact-saturday", path: ["contact", "hours", "saturday"], type: "text", value: content.contact.hours.saturday },
        { label: "Sunday Hours", id: "contact-sunday", path: ["contact", "hours", "sunday"], type: "text", value: content.contact.hours.sunday },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-dark border-b border-white/10 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-gray-400 hover:text-white"><ArrowLeft size={20} /></Link>
                        <h1 className="text-white font-bold">Contact Info</h1>
                    </div>
                    <button id="save-contact" onClick={saveContent} disabled={saving} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${saved ? "bg-green-500" : "bg-primary hover:bg-primary-dark"} text-white disabled:opacity-70`}>
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {fields.map((f) => (
                            <div key={f.id}>
                                <label htmlFor={f.id} className="block text-sm font-medium text-dark-light mb-1.5">{f.label}</label>
                                <input id={f.id} type={f.type} value={f.value} onChange={(e) => set(f.path, e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
