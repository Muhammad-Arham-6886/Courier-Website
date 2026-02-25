"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";

interface ImagePickerProps {
    value: string;
    onChange: (src: string) => void;
    label?: string;
}

export default function ImagePicker({ value, onChange, label = "Image" }: ImagePickerProps) {
    const [images, setImages] = useState<string[]>([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (open && images.length === 0) {
            fetch("/api/cms/images")
                .then((r) => r.json())
                .then((d) => setImages(d.images || []));
        }
    }, [open, images.length]);

    const filtered = images.filter((img) =>
        img.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>
            {/* Preview */}
            <div
                className="relative w-full h-36 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors group"
                onClick={() => setOpen(true)}
            >
                {value ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={value} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <span className="text-white text-sm font-semibold">Change Image</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                        <ImageIcon size={32} />
                        <span className="text-sm">Click to select an image</span>
                    </div>
                )}
            </div>
            {/* Path display */}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="/image-filename.jpg"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono"
            />

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-lg">Select Image</h3>
                            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                                <X size={22} />
                            </button>
                        </div>
                        <div className="p-4 border-b">
                            <input
                                type="text"
                                placeholder="Search images..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                            {filtered.map((img) => (
                                <button
                                    key={img}
                                    onClick={() => { onChange("/" + img); setOpen(false); }}
                                    className={`relative rounded-xl overflow-hidden border-2 aspect-square transition-all ${value === "/" + img ? "border-green-500 ring-2 ring-green-300" : "border-transparent hover:border-green-400"}`}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={"/" + img} alt={img} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                                        <p className="text-white text-[10px] truncate">{img}</p>
                                    </div>
                                </button>
                            ))}
                            {filtered.length === 0 && (
                                <p className="col-span-4 text-center text-gray-400 py-10">No images found</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
