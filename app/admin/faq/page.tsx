"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function FAQEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetch("/api/cms").then(r => r.json()).then(setContent); }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const update = (idx: number, field: string, val: string) => {
        if (!content) return;
        const f = [...content.faqs];
        f[idx] = { ...f[idx], [field]: val };
        setContent({ ...content, faqs: f });
    };

    const add = () => {
        if (!content) return;
        setContent({ ...content, faqs: [...content.faqs, { id: Date.now().toString(), question: "", answer: "" }] });
    };

    const remove = (idx: number) => {
        if (!content) return;
        setContent({ ...content, faqs: content.faqs.filter((_, i) => i !== idx) });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">FAQs</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-4">
                {content.faqs.map((faq, i) => (
                    <div key={faq.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex justify-between mb-3">
                            <span className="font-semibold text-gray-700 text-sm">FAQ {i + 1}</span>
                            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Question</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={faq.question} onChange={e => update(i, "question", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Answer</label>
                                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={3} value={faq.answer} onChange={e => update(i, "answer", e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={add} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 text-sm">
                    <Plus size={18} /> Add FAQ
                </button>
            </main>
        </div>
    );
}
