"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

const PAGE_KEYS = ["contact", "faq"] as const;
const PAGE_LABELS: Record<string, string> = {
    contact: "Contact Page Banner",
    faq: "FAQ Page Banner",
};

export default function PagesEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch("/api/cms").then(r => r.json()).then(setContent); }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const set = (path: string[], val: unknown) => {
        if (!content) return;
        const updated = JSON.parse(JSON.stringify(content));
        let obj: Record<string, unknown> = updated;
        for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]] as Record<string, unknown>;
        obj[path[path.length - 1]] = val;
        setContent(updated);
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Page Banners</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                <p className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                    💡 To edit the Services page banner, go to the <Link href="/admin/services" className="text-blue-600 underline">Services editor</Link>. The About page banner is in the <Link href="/admin/about" className="text-blue-600 underline">About editor</Link>.
                </p>

                {PAGE_KEYS.map((key) => {
                    const pg = content.pages[key];
                    return (
                        <div key={key} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <h2 className="font-bold text-gray-800 mb-5 text-lg">{PAGE_LABELS[key]}</h2>
                            <div className="space-y-4">
                                <Field label="Breadcrumb" value={pg.breadcrumb} onChange={v => set(["pages", key, "breadcrumb"], v)} />
                                <Field label="Title" value={pg.title} onChange={v => set(["pages", key, "title"], v)} />
                                <FieldArea label="Subtitle" value={pg.subtitle} onChange={v => set(["pages", key, "subtitle"], v)} />
                                <ImagePicker label="Background Image" value={pg.image} onChange={v => set(["pages", key, "image"], v)} />
                                <Field label="Image Focus Position (e.g. center 25%)" value={pg.imagePosition} onChange={v => set(["pages", key, "imagePosition"], v)} />
                            </div>
                        </div>
                    );
                })}
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
