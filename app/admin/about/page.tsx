"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function AboutEditor() {
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

    const { about } = content;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">About Page</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                {/* Hero */}
                <Section title="Page Hero Banner">
                    <Field label="Breadcrumb" value={about.hero.breadcrumb} onChange={v => set(["about", "hero", "breadcrumb"], v)} />
                    <Field label="Title" value={about.hero.title} onChange={v => set(["about", "hero", "title"], v)} />
                    <FieldArea label="Subtitle" value={about.hero.subtitle} onChange={v => set(["about", "hero", "subtitle"], v)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="CTA Text" value={about.hero.ctaText} onChange={v => set(["about", "hero", "ctaText"], v)} />
                        <Field label="CTA Link" value={about.hero.ctaLink} onChange={v => set(["about", "hero", "ctaLink"], v)} />
                        <Field label="Secondary CTA Text" value={about.hero.secondaryCtaText} onChange={v => set(["about", "hero", "secondaryCtaText"], v)} />
                        <Field label="Secondary CTA Link" value={about.hero.secondaryCtaLink} onChange={v => set(["about", "hero", "secondaryCtaLink"], v)} />
                    </div>
                    <ImagePicker label="Hero Background Image" value={about.hero.image} onChange={v => set(["about", "hero", "image"], v)} />
                    <Field label="Image Focus Position (e.g. center top)" value={about.hero.imagePosition} onChange={v => set(["about", "hero", "imagePosition"], v)} />
                </Section>

                {/* Intro */}
                <Section title="Introduction Section">
                    <Field label="Label" value={about.intro.label} onChange={v => set(["about", "intro", "label"], v)} />
                    <Field label="Heading" value={about.intro.title} onChange={v => set(["about", "intro", "title"], v)} />
                    <FieldArea label="Body (use blank line for paragraph breaks)" value={about.intro.body} onChange={v => set(["about", "intro", "body"], v)} />
                    <ImagePicker label="Team Photo" value={about.team.image} onChange={v => set(["about", "team", "image"], v)} />
                </Section>

                {/* Guarantee */}
                <Section title="60-Minute Guarantee Section">
                    <Field label="Label" value={about.guarantee.label} onChange={v => set(["about", "guarantee", "label"], v)} />
                    <Field label="Heading" value={about.guarantee.title} onChange={v => set(["about", "guarantee", "title"], v)} />
                    <FieldArea label="Body" value={about.guarantee.body} onChange={v => set(["about", "guarantee", "body"], v)} />
                    <ImagePicker label="Guarantee Image" value={about.guarantee.image} onChange={v => set(["about", "guarantee", "image"], v)} />
                </Section>

                {/* Process Steps */}
                <Section title="Process Steps">
                    {about.processSteps.map((step, i) => (
                        <div key={step.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-700">Step {step.step}</span>
                                <button onClick={() => { const s = about.processSteps.filter((_, j) => j !== i); set(["about", "processSteps"], s); }} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                            </div>
                            <div className="space-y-2">
                                <Field label="Title" value={step.title} onChange={v => { const s = [...about.processSteps]; s[i] = { ...s[i], title: v }; set(["about", "processSteps"], s); }} />
                                <FieldArea label="Description" value={step.desc} onChange={v => { const s = [...about.processSteps]; s[i] = { ...s[i], desc: v }; set(["about", "processSteps"], s); }} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => { const num = about.processSteps.length + 1; set(["about", "processSteps"], [...about.processSteps, { id: Date.now().toString(), step: String(num).padStart(2, "0"), title: "New Step", desc: "" }]); }} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 text-sm">
                        <Plus size={16} /> Add Step
                    </button>
                </Section>

                {/* Values */}
                <Section title="Core Values">
                    {about.values.map((val, i) => (
                        <div key={val.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold text-gray-700">Value {i + 1}</span>
                                <button onClick={() => set(["about", "values"], about.values.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                            </div>
                            <div className="space-y-2">
                                <Field label="Title" value={val.title} onChange={v => { const vals = [...about.values]; vals[i] = { ...vals[i], title: v }; set(["about", "values"], vals); }} />
                                <FieldArea label="Description" value={val.desc} onChange={v => { const vals = [...about.values]; vals[i] = { ...vals[i], desc: v }; set(["about", "values"], vals); }} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => set(["about", "values"], [...about.values, { id: Date.now().toString(), title: "New Value", desc: "" }])} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-green-400 hover:text-green-600 flex items-center justify-center gap-2 text-sm">
                        <Plus size={16} /> Add Value
                    </button>
                </Section>

            </main>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-5 text-lg">{title}</h2>
            <div className="space-y-4">{children}</div>
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
