"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function GlobalEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch("/api/cms").then(r => r.json()).then(setContent); }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const set = (field: string, val: string) => {
        if (!content) return;
        setContent({ ...content, global: { ...content.global, [field]: val } });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Global Settings</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Site Name</label>
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={content.global.siteName} onChange={e => set("siteName", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline</label>
                        <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={content.global.tagline} onChange={e => set("tagline", e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Footer Tagline</label>
                        <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} value={content.global.footerTagline} onChange={e => set("footerTagline", e.target.value)} />
                    </div>
                    <ImagePicker label="Logo" value={content.global.logo} onChange={v => set("logo", v)} />
                </div>
            </main>
        </div>
    );
}
