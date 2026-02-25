"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactInfo } from "@/lib/cms-data";

interface HeaderProps {
    contact: ContactInfo;
}

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQs" },
];

export default function Header({ contact }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div className="bg-primary text-white text-sm py-2">
                <div className="container-custom flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <a href={`tel:${contact.phone}`} className="hover:underline font-medium">
                            {contact.phone}
                        </a>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-xs">
                        <span>{contact.hours.weekdays}</span>
                        <span>{contact.hours.saturday}</span>
                    </div>
                </div>
            </div>

            {/* Main Nav */}
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-dark shadow-[0_2px_20px_rgba(0,0,0,0.3)]" : "bg-dark"
                    }`}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <Image
                                src="/yasco-logo.png"
                                alt="Yasco Couriers"
                                width={160}
                                height={56}
                                className="h-10 lg:h-12 w-auto object-contain"
                                priority
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="nav-link text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + Mobile Toggle */}
                        <div className="flex items-center gap-3">
                            <Link href="/contact" className="hidden sm:inline-flex btn-primary text-sm py-2.5">
                                Get a Quote
                            </Link>
                            <button
                                id="mobile-menu-toggle"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMenuOpen}
                            >
                                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden border-t border-white/10 bg-dark-mid overflow-hidden"
                        >
                            <nav className="container-custom py-4 flex flex-col gap-1">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.06 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className="pt-2 pb-1">
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="btn-primary w-full justify-center"
                                    >
                                        Get a Free Quote
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
