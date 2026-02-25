"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface PageHeroProps {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    breadcrumb?: string;
    backgroundImage?: string;
    imagePosition?: string;
}

export default function PageHero({
    title,
    subtitle,
    ctaText,
    ctaLink = "/contact",
    secondaryCtaText,
    secondaryCtaLink,
    breadcrumb,
    backgroundImage,
    imagePosition = "center top",
}: PageHeroProps) {
    return (
        <section className="relative bg-dark overflow-hidden">
            {/* Background image or dot pattern */}
            {backgroundImage ? (
                <>
                    <Image
                        src={backgroundImage}
                        alt={title}
                        fill
                        className="object-cover"
                        style={{ objectPosition: imagePosition }}
                        quality={80}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-dark/20" />
                </>
            ) : (
                <>
                    <div
                        className="absolute inset-0 opacity-[0.07]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 2px 2px, #4DB848 1px, transparent 0)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/70" />
                </>
            )}

            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />

            <div className="relative container-custom py-20 md:py-28">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    {breadcrumb && (
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                            {breadcrumb}
                        </p>
                    )}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                        {title}
                    </h1>
                    {subtitle && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-5 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl"
                        >
                            {subtitle}
                        </motion.p>
                    )}
                    {(ctaText || secondaryCtaText) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="mt-8 flex items-center flex-wrap gap-4"
                        >
                            {ctaText && (
                                <Link href={ctaLink} className="btn-primary shadow-glow">
                                    {ctaText} <ArrowRight size={18} />
                                </Link>
                            )}
                            {secondaryCtaText && secondaryCtaLink && (
                                <Link href={secondaryCtaLink} className="btn-secondary">
                                    {secondaryCtaText}
                                </Link>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
