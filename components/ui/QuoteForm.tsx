"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface QuoteFormProps {
    compact?: boolean;
}

export default function QuoteForm({ compact = false }: QuoteFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        fromPostcode: "",
        toPostcode: "",
        message: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!formData.name.trim()) errs.name = "Name is required";
        if (!formData.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
            errs.email = "Enter a valid email address";
        if (!formData.phone.trim()) errs.phone = "Phone number is required";
        if (!formData.message.trim()) errs.message = "Please provide some details";
        return errs;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setLoading(true);
        // Call API
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) setSubmitted(true);
            else setErrors({ message: "Failed to send message. Please try again." });
        } catch (err) {
            setErrors({ message: "Network error. Please try again later." });
        }
        setLoading(false);
        setSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-4"
            >
                <CheckCircle size={56} className="text-green-500" />
                <h3 className="text-2xl font-bold text-dark">Quote Request Sent!</h3>
                <p className="text-dark-light max-w-sm">
                    Thank you — we&apos;ll get back to you with a competitive quote as
                    soon as possible.
                </p>
            </motion.div>
        );
    }

    const inputClass = (field: string) =>
        `w-full px-4 py-3 rounded-lg border text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/30 ${errors[field]
            ? "border-red-400 bg-red-50"
            : "border-gray-200 bg-white focus:border-primary"
        }`;

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
                <div>
                    <label
                        htmlFor="quote-name"
                        className="block text-sm font-medium text-dark mb-1"
                    >
                        Full Name *
                    </label>
                    <input
                        id="quote-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={inputClass("name")}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="quote-email"
                        className="block text-sm font-medium text-dark mb-1"
                    >
                        Email Address *
                    </label>
                    <input
                        id="quote-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClass("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="quote-phone"
                        className="block text-sm font-medium text-dark mb-1"
                    >
                        Phone Number *
                    </label>
                    <input
                        id="quote-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="07700 000000"
                        className={inputClass("phone")}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                </div>
                {!compact && (
                    <div>
                        <label
                            htmlFor="quote-from"
                            className="block text-sm font-medium text-dark mb-1"
                        >
                            Collection Postcode
                        </label>
                        <input
                            id="quote-from"
                            type="text"
                            name="fromPostcode"
                            value={formData.fromPostcode}
                            onChange={handleChange}
                            placeholder="BD7 4EA"
                            className={inputClass("fromPostcode")}
                        />
                    </div>
                )}
                {!compact && (
                    <div>
                        <label
                            htmlFor="quote-to"
                            className="block text-sm font-medium text-dark mb-1"
                        >
                            Delivery Postcode
                        </label>
                        <input
                            id="quote-to"
                            type="text"
                            name="toPostcode"
                            value={formData.toPostcode}
                            onChange={handleChange}
                            placeholder="LS1 1AA"
                            className={inputClass("toPostcode")}
                        />
                    </div>
                )}
            </div>
            <div>
                <label
                    htmlFor="quote-message"
                    className="block text-sm font-medium text-dark mb-1"
                >
                    Details / Message *
                </label>
                <textarea
                    id="quote-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={compact ? 3 : 4}
                    placeholder="Describe what you need delivered, any special requirements..."
                    className={`${inputClass("message")} resize-none`}
                />
                {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
            </div>
            <button
                id="quote-submit"
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                        </svg>
                        Sending...
                    </span>
                ) : (
                    <>
                        <Send size={18} />
                        Send My Quote Request
                    </>
                )}
            </button>
        </form>
    );
}
