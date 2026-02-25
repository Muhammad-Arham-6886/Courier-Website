"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function HeroEditor() {
    const [content, setContent] = useState<CMSContent | null>(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/cms").then((r) => r.json()).then(setContent);
    }, []);

    const save = async () => {
        setSaving(true);
        await fetch("/api/cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
        setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000);
    };

    const updateSlide = (idx: number, field: string, val: string) => {
        if (!content) return;
        const slides = [...content.hero.slides];
        slides[idx] = { ...slides[idx], [field]: val };
        setContent({ ...content, hero: { slides } });
    };

    const addSlide = () => {
        if (!content) return;
        const newSlide = { id: Date.now().toString(), title: "New Slide", subtitle: "", ctaText: "Learn More", ctaLink: "/services", bgColor: "#0F172A", image: "" };
        setContent({ ...content, hero: { slides: [...content.hero.slides, newSlide] } });
    };

    const removeSlide = (idx: number) => {
        if (!content) return;
        const slides = content.hero.slides.filter((_, i) => i !== idx);
        setContent({ ...content, hero: { slides } });
    };

    if (!content) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Hero Slider</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-colors">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
                {content.hero.slides.map((slide, idx) => (
                    <div key={slide.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-gray-800">Slide {idx + 1}</h2>
                            <button onClick={() => removeSlide(idx)} className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm"><Trash2 size={16} /> Remove</button>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <ImagePicker label="Background Image" value={slide.image || ""} onChange={(v) => updateSlide(idx, "image", v)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={slide.title} onChange={(e) => updateSlide(idx, "title", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Text</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={slide.ctaText} onChange={(e) => updateSlide(idx, "ctaText", e.target.value)} />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Subtitle</label>
                                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} value={slide.subtitle} onChange={(e) => updateSlide(idx, "subtitle", e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">CTA Link</label>
                                <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={slide.ctaLink} onChange={(e) => updateSlide(idx, "ctaLink", e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
                <button onClick={addSlide} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 transition-colors">
                    <Plus size={18} /> Add Slide
                </button>
            </main>
        </div>
    );
}
