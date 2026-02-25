"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Mail, Phone, Calendar, Trash2 } from "lucide-react";

type Quote = {
    id: string;
    date: string;
    name: string;
    email: string;
    phone: string;
    fromPostcode: string;
    toPostcode: string;
    message: string;
    status: string;
};

export default function QuotesAdmin() {
    const [quotes, setQuotes] = useState<Quote[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchQuotes = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/contact");
            const data = await res.json();
            setQuotes(data.quotes || []);
        } catch (err) {
            console.error("Failed to load quotes", err);
        }
        setLoading(false);
    };

    useEffect(() => { fetchQuotes(); }, []);

    const markRead = async (quote: Quote) => {
        // Since we don't have a PUT route right now, we can skip full mark-read 
        // without writing a complicated endpoint just for status
        alert("Mark as read/replied not hooked up yet, but we have the quote data!");
    };

    const deleteQuote = async (id: string) => {
        if (!confirm("Are you sure you want to delete this quote request?")) return;

        try {
            const res = await fetch(`/api/contact?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                setQuotes(quotes?.filter(q => q.id !== id) || null);
            } else {
                alert("Failed to delete quote.");
            }
        } catch (err) {
            console.error(err);
            alert("Error deleting quote.");
        }
    };

    if (loading && !quotes) return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="text-gray-400 hover:text-gray-700">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="font-bold text-gray-900">Form Submissions ({quotes?.length || 0})</h1>
                    </div>
                    <button onClick={fetchQuotes} disabled={loading} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-semibold">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8">
                {quotes?.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-white rounded-2xl border border-gray-100">
                        <Mail size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No quotes have been submitted yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {quotes?.map((quote) => (
                            <div key={quote.id} className="bg-white p-6 justify-between gap-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-start group transition-all hover:border-primary/30">
                                <div className="space-y-3 flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-gray-900">{quote.name}</h3>
                                        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {quote.status}
                                        </span>
                                        <p className="text-sm text-gray-500 ml-auto flex items-center gap-2">
                                            <Calendar size={14} />
                                            {new Date(quote.date).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" />
                                            <a href={`mailto:${quote.email}`} className="hover:text-primary transition-colors">{quote.email}</a>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone size={16} className="text-gray-400" />
                                            <a href={`tel:${quote.phone}`} className="hover:text-primary transition-colors">{quote.phone}</a>
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {quote.fromPostcode && (
                                            <div className="bg-gray-50 rounded p-2 text-sm border">
                                                <span className="text-xs font-bold text-gray-400 block uppercase mb-0.5">Collection</span>
                                                <span className="font-semibold">{quote.fromPostcode}</span>
                                            </div>
                                        )}
                                        {quote.toPostcode && (
                                            <div className="bg-gray-50 rounded p-2 text-sm border">
                                                <span className="text-xs font-bold text-gray-400 block uppercase mb-0.5">Delivery</span>
                                                <span className="font-semibold">{quote.toPostcode}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-sm text-gray-800 bg-gray-50/50 p-4 rounded-xl border border-gray-100 leading-relaxed whitespace-pre-wrap">
                                            {quote.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-48 shrink-0 flex flex-col gap-2">
                                    <a href={`mailto:${quote.email}?subject=Re: Your Quote Request for Yasco Couriers`} className="btn-primary w-full text-center text-sm py-2">
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteQuote(quote.id)}
                                        className="btn-secondary w-full text-center text-sm py-2 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200 justify-center"
                                    >
                                        <Trash2 size={16} className="inline-block mr-2" />
                                        Delete Quote
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
