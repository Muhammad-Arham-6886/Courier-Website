"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/cms-data";

interface HeroSliderProps {
    slides: HeroSlide[];
    phone: string;
}



export default function HeroSlider({ slides, phone }: HeroSliderProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 6000, stopOnInteraction: false }),
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    return (
        <section className="relative bg-dark overflow-hidden" style={{ minHeight: "90vh" }}>
            <div className="embla h-full" ref={emblaRef} style={{ minHeight: "90vh" }}>
                <div className="embla__container h-full" style={{ minHeight: "90vh" }}>
                    {slides.map((slide, idx) => (
                        <div
                            className="embla__slide relative flex items-center"
                            key={slide.id}
                            style={{ minHeight: "90vh" }}
                        >
                            {/* Background image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image || "/Yasco Couriers branded delivery van.jpg"}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                    quality={85}
                                />
                                {/* Dark overlay — stronger on sides for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/30" />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
                            </div>

                            {/* Content */}
                            <div className="relative container-custom w-full py-24 lg:py-32">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={selectedIndex === idx ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="max-w-3xl"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-1 bg-primary rounded-full" />
                                        <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                                            Yasco Couriers
                                        </span>
                                    </div>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>
                                    <p className="mt-6 text-xl text-gray-200 leading-relaxed max-w-2xl drop-shadow">
                                        {slide.subtitle}
                                    </p>
                                    <div className="mt-10 flex items-center flex-wrap gap-4">
                                        <Link href={slide.ctaLink} className="btn-primary text-base px-8 py-4 shadow-glow">
                                            {slide.ctaText}
                                            <ArrowRight size={20} />
                                        </Link>
                                        <a
                                            href={`tel:${phone}`}
                                            className="inline-flex items-center gap-3 text-white font-semibold hover:text-primary transition-colors"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                                                <Phone size={20} />
                                            </div>
                                            {phone}
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                id="hero-prev"
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
            >
                <ChevronLeft size={22} />
            </button>
            <button
                id="hero-next"
                onClick={scrollNext}
                aria-label="Next slide"
                className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 backdrop-blur-sm"
            >
                <ChevronRight size={22} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${selectedIndex === idx ? "bg-primary w-12" : "bg-white/40 w-8"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
