import { getCMSContent } from "@/lib/cms-data";
import QuoteForm from "./QuoteForm";

export default async function QuoteSection() {
    const content = getCMSContent();
    const { contact, quoteSection } = content;

    return (
        <section className="section-padding bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-14 items-start">
                    <div>
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                            {quoteSection.label}
                        </p>
                        <h2 className="section-title mb-4">{quoteSection.title}</h2>
                        <p className="text-dark-light text-lg leading-relaxed mb-6">
                            {quoteSection.subtitle}
                        </p>
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-4">
                            <p className="font-semibold text-dark mb-1">{quoteSection.phoneLabel}</p>
                            <a
                                href={`tel:${contact.phone}`}
                                className="text-2xl font-black text-primary hover:text-primary-dark transition-colors"
                            >
                                {contact.phone}
                            </a>
                            <p className="text-sm text-gray-500 mt-1">
                                {quoteSection.phoneSub}
                            </p>
                        </div>
                        <p className="text-sm text-dark-light italic">
                            {quoteSection.footerText}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-8 shadow-card">
                        <QuoteForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
