"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function HomeEditor() {
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

    const { home, stats } = content;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Home Page</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                {/* Stats */}
                <Section title="Stats Strip">
                    {stats.map((stat, i) => (
                        <div key={stat.id} className="grid grid-cols-3 gap-3">
                            <Field label="Value" type="number" value={String(stat.value)} onChange={v => { const s = [...stats]; s[i] = { ...s[i], value: Number(v) }; set(["stats"], s); }} />
                            <Field label="Suffix" value={stat.suffix} onChange={v => { const s = [...stats]; s[i] = { ...s[i], suffix: v }; set(["stats"], s); }} />
                            <Field label="Label" value={stat.label} onChange={v => { const s = [...stats]; s[i] = { ...s[i], label: v }; set(["stats"], s); }} />
                        </div>
                    ))}
                </Section>

                {/* Why Choose Us */}
                <Section title="Why Choose Us Section">
                    <Field label="Label (small text)" value={home.whyChoose.label} onChange={v => set(["home", "whyChoose", "label"], v)} />
                    <Field label="Heading" value={home.whyChoose.title} onChange={v => set(["home", "whyChoose", "title"], v)} />
                    <FieldArea label="Subtitle" value={home.whyChoose.subtitle} onChange={v => set(["home", "whyChoose", "subtitle"], v)} />
                    <ImagePicker label="Section Image" value={home.whyChoose.image} onChange={v => set(["home", "whyChoose", "image"], v)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Badge Value (e.g. 15+)" value={home.whyChoose.badgeValue} onChange={v => set(["home", "whyChoose", "badgeValue"], v)} />
                        <Field label="Badge Label" value={home.whyChoose.badgeLabel} onChange={v => set(["home", "whyChoose", "badgeLabel"], v)} />
                    </div>
                    <hr className="my-3" />
                    <p className="text-sm font-semibold text-gray-700 mb-3">Feature Items</p>
                    {home.whyChoose.items.map((item, i) => (
                        <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-3 space-y-2">
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Title" value={item.title} onChange={v => { const items = [...home.whyChoose.items]; items[i] = { ...items[i], title: v }; set(["home", "whyChoose", "items"], items); }} />
                                <Field label="Icon" value={item.icon} onChange={v => { const items = [...home.whyChoose.items]; items[i] = { ...items[i], icon: v }; set(["home", "whyChoose", "items"], items); }} />
                            </div>
                            <FieldArea label="Description" value={item.desc} onChange={v => { const items = [...home.whyChoose.items]; items[i] = { ...items[i], desc: v }; set(["home", "whyChoose", "items"], items); }} />
                        </div>
                    ))}
                </Section>

                {/* Services Section Labels */}
                <Section title="Services Section">
                    <Field label="Label" value={home.servicesSection.label} onChange={v => set(["home", "servicesSection", "label"], v)} />
                    <Field label="Heading" value={home.servicesSection.title} onChange={v => set(["home", "servicesSection", "title"], v)} />
                    <FieldArea label="Subtitle" value={home.servicesSection.subtitle} onChange={v => set(["home", "servicesSection", "subtitle"], v)} />
                </Section>

                {/* Client Logos */}
                <Section title="Client Logos Strip">
                    <Field label="Strip Label" value={home.clientLogos.label} onChange={v => set(["home", "clientLogos", "label"], v)} />
                    {home.clientLogos.items.map((logo, i) => (
                        <div key={logo.id} className="bg-gray-50 rounded-xl p-4 mb-3">
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <Field label="Alt Text" value={logo.alt} onChange={v => { const items = [...home.clientLogos.items]; items[i] = { ...items[i], alt: v }; set(["home", "clientLogos", "items"], items); }} />
                            </div>
                            <ImagePicker label="Logo Image" value={logo.src} onChange={v => { const items = [...home.clientLogos.items]; items[i] = { ...items[i], src: v }; set(["home", "clientLogos", "items"], items); }} />
                        </div>
                    ))}
                    <button onClick={() => { const items = [...home.clientLogos.items, { id: Date.now().toString(), src: "", alt: "Logo" }]; set(["home", "clientLogos", "items"], items); }} className="btn-add">
                        <Plus size={16} /> Add Logo
                    </button>
                </Section>

                {/* Guarantee */}
                <Section title="Guarantee Section">
                    <Field label="Label" value={home.guarantee.label} onChange={v => set(["home", "guarantee", "label"], v)} />
                    <Field label="Heading" value={home.guarantee.title} onChange={v => set(["home", "guarantee", "title"], v)} />
                    <FieldArea label="Body" value={home.guarantee.body} onChange={v => set(["home", "guarantee", "body"], v)} />
                    <ImagePicker label="Image" value={home.guarantee.image} onChange={v => set(["home", "guarantee", "image"], v)} />
                    <Field label="CTA Text" value={home.guarantee.ctaText} onChange={v => set(["home", "guarantee", "ctaText"], v)} />
                    <Field label="CTA Link" value={home.guarantee.ctaLink} onChange={v => set(["home", "guarantee", "ctaLink"], v)} />
                </Section>

                {/* Testimonials Section Labels */}
                <Section title="Testimonials Section">
                    <Field label="Label" value={home.testimonials.label} onChange={v => set(["home", "testimonials", "label"], v)} />
                    <Field label="Heading" value={home.testimonials.title} onChange={v => set(["home", "testimonials", "title"], v)} />
                    <FieldArea label="Subtitle" value={home.testimonials.subtitle} onChange={v => set(["home", "testimonials", "subtitle"], v)} />
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

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input type={type} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" value={value} onChange={e => onChange(e.target.value)} />
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
