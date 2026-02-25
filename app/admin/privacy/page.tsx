"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function PrivacyEditor() {
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
        setContent({
            ...content,
            pages: {
                ...content.pages,
                privacy: { ...content.pages.privacy, [field]: val }
            }
        });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    const pg = content.pages.privacy;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Privacy & Terms</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h2 className="font-bold text-gray-800 mb-2">Page Banner</h2>
                    <Field label="Breadcrumb" value={pg.breadcrumb} onChange={v => update("breadcrumb", v)} />
                    <Field label="Title" value={pg.title} onChange={v => update("title", v)} />
                    <FieldArea label="Subtitle" value={pg.subtitle} onChange={v => update("subtitle", v)} />
                    <ImagePicker label="Hero Background Image" value={pg.image} onChange={v => update("image", v)} />
                    <Field label="Image Focus Position (e.g. center center)" value={pg.imagePosition} onChange={v => update("imagePosition", v)} />
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                    <h2 className="font-bold text-gray-800 mb-2">Page Content</h2>
                    <p className="text-sm text-gray-500 mb-4">You can use standard HTML tags here such as <b>&lt;h2&gt;</b>, <b>&lt;p&gt;</b>, <b>&lt;b&gt;</b>, and <b>&lt;ul&gt;</b> to format your privacy policy and terms of service.</p>

                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm font-mono h-[300px]"
                        value={pg.content}
                        onChange={e => update("content", e.target.value)}
                        placeholder="<h2>Privacy Policy</h2><p>Your text here...</p>"
                    />
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
