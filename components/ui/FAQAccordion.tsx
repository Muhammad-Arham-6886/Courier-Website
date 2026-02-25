"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/cms-data";

interface FAQAccordionProps {
    faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => setOpenId(openId === id ? null : id);

    return (
        <div className="space-y-3">
            {faqs.map((faq, idx) => (
                <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                >
                    <button
                        id={`faq-toggle-${faq.id}`}
                        onClick={() => toggle(faq.id)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 group"
                        aria-expanded={openId === faq.id}
                    >
                        <span className="font-semibold text-dark pr-4 text-base group-hover:text-primary transition-colors">
                            {faq.question}
                        </span>
                        <motion.div
                            animate={{ rotate: openId === faq.id ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="shrink-0"
                        >
                            <ChevronDown
                                size={20}
                                className={`transition-colors ${openId === faq.id ? "text-primary" : "text-gray-400"
                                    }`}
                            />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {openId === faq.id && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-6 pb-5 pt-1 bg-white border-t border-gray-50">
                                    <p className="text-dark-light leading-relaxed text-sm">
                                        {faq.answer}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
}
