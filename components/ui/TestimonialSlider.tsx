"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/cms-data";

interface TestimonialSliderProps {
    testimonials: Testimonial[];
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: "center" },
        [Autoplay({ delay: 5000, stopOnInteraction: false })]
    );

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    return (
        <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {testimonials.map((t, idx) => (
                        <div
                            className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_60%] lg:flex-[0_0_45%] px-3 py-4"
                            key={t.id}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-500 border ${idx === selectedIndex
                                        ? "bg-dark shadow-[0_8px_40px_rgba(77,184,72,0.18)] border-primary/40 scale-[1.02]"
                                        : "bg-white shadow-card border-gray-100 opacity-75"
                                    }`}
                            >
                                {/* Large decorative quote */}
                                <Quote
                                    size={48}
                                    className={`mb-4 ${idx === selectedIndex ? "text-primary/40" : "text-gray-200"}`}
                                    aria-hidden
                                />

                                {/* Stars */}
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Quote text */}
                                <blockquote
                                    className={`text-base md:text-lg leading-relaxed flex-1 mb-8 ${idx === selectedIndex ? "text-gray-200" : "text-dark-light"
                                        }`}
                                >
                                    &ldquo;{t.content}&rdquo;
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-black text-xl ${idx === selectedIndex
                                            ? "bg-primary text-white ring-4 ring-primary/30"
                                            : "bg-primary/10 text-primary"
                                        }`}>
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className={`font-bold text-base ${idx === selectedIndex ? "text-white" : "text-dark"}`}>
                                            {t.name}
                                        </p>
                                        <p className={`text-sm ${idx === selectedIndex ? "text-primary" : "text-gray-400"}`}>
                                            {t.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Active indicator bar */}
                                {idx === selectedIndex && (
                                    <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary to-primary/40 rounded-full" />
                                )}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
                <button
                    id="testimonial-prev"
                    onClick={scrollPrev}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-dark transition-all duration-200 shadow-sm"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${i === selectedIndex
                                    ? "w-6 h-3 bg-primary"
                                    : "w-3 h-3 bg-gray-300 hover:bg-primary/50"
                                }`}
                        />
                    ))}
                </div>

                <button
                    id="testimonial-next"
                    onClick={scrollNext}
                    className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-dark transition-all duration-200 shadow-sm"
                    aria-label="Next testimonial"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
