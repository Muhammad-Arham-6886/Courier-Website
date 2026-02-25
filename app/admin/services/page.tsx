"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ImagePicker from "@/components/admin/ImagePicker";
import { ArrowLeft, Save } from "lucide-react";
import type { CMSContent } from "@/lib/cms-data";

export default function ServicesEditor() {
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

    const { services, pages } = content;
    const pg = pages.services;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700"><ArrowLeft size={20} /></Link>
                        <h1 className="font-bold text-gray-900">Services</h1>
                    </div>
                    <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold text-sm">
                        <Save size={16} />{saved ? "Saved!" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">

                {/* Services Page Hero */}
                <Section title="Services Page Hero Banner">
                    <Field label="Breadcrumb" value={pg.breadcrumb} onChange={v => set(["pages", "services", "breadcrumb"], v)} />
                    <Field label="Title" value={pg.title} onChange={v => set(["pages", "services", "title"], v)} />
                    <FieldArea label="Subtitle" value={pg.subtitle} onChange={v => set(["pages", "services", "subtitle"], v)} />
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="CTA Text" value={pg.ctaText || ""} onChange={v => set(["pages", "services", "ctaText"], v)} />
                        <Field label="CTA Link" value={pg.ctaLink || ""} onChange={v => set(["pages", "services", "ctaLink"], v)} />
                    </div>
                    <ImagePicker label="Hero Background Image" value={pg.image} onChange={v => set(["pages", "services", "image"], v)} />
                    <Field label="Image Focus Position (e.g. center 30%)" value={pg.imagePosition} onChange={v => set(["pages", "services", "imagePosition"], v)} />
                    <hr className="my-1" />
                    <Field label="Intro Label" value={pg.introLabel || ""} onChange={v => set(["pages", "services", "introLabel"], v)} />
                    <Field label="Intro Heading" value={pg.introTitle || ""} onChange={v => set(["pages", "services", "introTitle"], v)} />
                    <FieldArea label="Intro Body" value={pg.introBody || ""} onChange={v => set(["pages", "services", "introBody"], v)} />
                </Section>

                {/* Service Cards */}
                {services.map((service, i) => (
                    <Section key={service.id} title={`Service: ${service.title}`}>
                        <Field label="Title" value={service.title} onChange={v => { const s = [...services]; s[i] = { ...s[i], title: v }; set(["services"], s); }} />
                        <FieldArea label="Short Description" value={service.shortDescription} onChange={v => { const s = [...services]; s[i] = { ...s[i], shortDescription: v }; set(["services"], s); }} />
                        <FieldArea label="Full Description" value={service.fullDescription} onChange={v => { const s = [...services]; s[i] = { ...s[i], fullDescription: v }; set(["services"], s); }} />
                        <ImagePicker label="Service Image" value={service.image} onChange={v => { const s = [...services]; s[i] = { ...s[i], image: v }; set(["services"], s); }} />
                    </Section>
                ))}

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
