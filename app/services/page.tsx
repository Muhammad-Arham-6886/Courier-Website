import { Metadata } from "next";
import { getCMSContent } from "@/lib/cms-data";
import PageHero from "@/components/ui/PageHero";
import QuoteSection from "@/components/ui/QuoteSection";
import Image from "next/image";
import { Zap, MapPin, Heart, FileText } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap size={28} />,
    MapPin: <MapPin size={28} />,
    Heart: <Heart size={28} />,
    FileText: <FileText size={28} />,
};

export const metadata: Metadata = {
    title: "Our Services",
    description: "Yasco Couriers offers same-day, multi-drop, medical, and document courier services across Bradford and the UK.",
};

export default async function ServicesPage() {
    const content = await getCMSContent();
    const { pages, services } = content;
    const pg = pages.services;

    return (
        <>
            <PageHero
                breadcrumb={pg.breadcrumb}
                title={pg.title}
                subtitle={pg.subtitle}
                ctaText={pg.ctaText}
                ctaLink={pg.ctaLink}
                backgroundImage={pg.image}
                imagePosition={pg.imagePosition}
            />

            {/* Services Intro */}
            <section className="section-padding bg-white">
                <div className="container-custom text-center max-w-3xl mx-auto">
                    <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{pg.introLabel}</p>
                    <h2 className="section-title mb-4">{pg.introTitle}</h2>
                    <p className="text-dark-light leading-relaxed">{pg.introBody}</p>
                </div>
            </section>

            {/* Service Detail Cards */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom space-y-16">
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                        >
                            <div className={`relative rounded-2xl overflow-hidden shadow-card-hover ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={620}
                                    height={420}
                                    className="w-full h-72 lg:h-[380px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-glow">
                                    {iconMap[service.icon] ?? <Zap size={28} />}
                                </div>
                            </div>
                            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                                    {iconMap[service.icon] ?? <Zap size={28} />}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-black text-dark mb-4">{service.title}</h2>
                                <p className="text-dark-light leading-relaxed">{service.fullDescription}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <QuoteSection />
        </>
    );
}
