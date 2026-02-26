import { Metadata } from "next";
import { getCMSContent } from "@/lib/cms-data";
import PageHero from "@/components/ui/PageHero";
import FAQAccordion from "@/components/ui/FAQAccordion";
import QuoteSection from "@/components/ui/QuoteSection";

export const metadata: Metadata = {
    title: "Frequently Asked Questions",
    description:
        "Common questions about Yasco Couriers same-day delivery service — pricing, collection times, tracking, insurance, and more.",
};

export default async function FAQPage() {
    const content = await getCMSContent();
    const pg = content.pages.faq;

    return (
        <>
            <PageHero
                breadcrumb={pg.breadcrumb}
                title={pg.title}
                subtitle={pg.subtitle}
                backgroundImage={pg.image}
                imagePosition={pg.imagePosition}
            />

            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <FAQAccordion faqs={content.faqs} />
                    </div>
                </div>
            </section>

            <QuoteSection />
        </>
    );
}
