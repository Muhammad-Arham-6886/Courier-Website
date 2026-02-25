"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function TestimonialsEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch("/api/cms").then(r => r.json()).then(setContent); }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const update = (idx: number, field: string, val: string | number) => {
        if (!content) return;
        const t = [...content.testimonials];
        t[idx] = { ...t[idx], [field]: val };
        setContent({ ...content, testimonials: t });
    };

    const add = () => {
        if (!content) return;
        setContent({ ...content, testimonials: [...content.testimonials, { id: Date.now().toString(), name: "", role: "", content: "", rating: 5 }] });
    };

    const remove = (idx: number) => {
        if (!content) return;
        setContent({ ...content, testimonials: content.testimonials.filter((_, i) => i !== idx) });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Testimonials</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                {content.testimonials.map((t, i) => (
                    <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-bold text-gray-800">Review {i + 1}</h3>
                            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm"><Trash2 size={16} />Remove</button>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={t.name} onChange={e => update(i, "name", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Company</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={t.role} onChange={e => update(i, "role", e.target.value)} />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Review</label>
                                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={3} value={t.content} onChange={e => update(i, "content", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Rating (1–5)</label>
                                <input type="number" min="1" max="5" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={t.rating} onChange={e => update(i, "rating", Number(e.target.value))} />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={add} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 text-sm">
                    <Plus size={18} /> Add Review
                </button>
            </main>
        </div>
    );
}
