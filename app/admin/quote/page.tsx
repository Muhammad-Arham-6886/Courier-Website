"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function QuoteAdminEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch("/api/cms").then(r => r.json()).then(setContent); }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const update = (field: string, val: string) => {
        if (!content) return;
        setContent({ ...content, quoteSection: { ...content.quoteSection, [field]: val } });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    const { quoteSection } = content;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Quote Section (Global CTA)</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <p className="text-sm text-gray-500 mb-6">This section appears at the bottom of almost every page (Home, About, Services, etc).</p>

                    <Field label="Label (Small top text)" value={quoteSection.label} onChange={v => update("label", v)} />
                    <Field label="Heading" value={quoteSection.title} onChange={v => update("title", v)} />
                    <FieldArea label="Subtitle" value={quoteSection.subtitle} onChange={v => update("subtitle", v)} />

                    <hr className="my-4" />
                    <h3 className="font-bold text-gray-800 mb-2">Phone Block</h3>
                    <Field label="Phone Block Label" value={quoteSection.phoneLabel} onChange={v => update("phoneLabel", v)} />
                    <Field label="Phone Block Subtext" value={quoteSection.phoneSub} onChange={v => update("phoneSub", v)} />

                    <hr className="my-4" />
                    <FieldArea label="Footer italic text" value={quoteSection.footerText} onChange={v => update("footerText", v)} />
                </div>
            </main>
        </div>
    );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={value} onChange={e => onChange(e.target.value)} />
        </div>
    );
}
function FieldArea({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={3} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    );
}
