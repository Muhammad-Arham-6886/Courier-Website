import { Metadata } from "next";
import { getCMSContent } from "@/lib/cms-data";
import PageHero from "@/components/ui/PageHero";
import QuoteSection from "@/components/ui/QuoteSection";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Yasco Couriers",
    description: "Learn about Yasco Couriers — Bradford's trusted same-day courier service with over a decade of experience.",
};

export default async function AboutPage() {
    const content = getCMSContent();
    const { about } = content;

    return (
        <>
            <PageHero
                breadcrumb={about.hero.breadcrumb}
                title={about.hero.title}
                subtitle={about.hero.subtitle}
                ctaText={about.hero.ctaText}
                ctaLink={about.hero.ctaLink}
                secondaryCtaText={about.hero.secondaryCtaText}
                secondaryCtaLink={about.hero.secondaryCtaLink}
                backgroundImage={about.hero.image}
                imagePosition={about.hero.imagePosition}
            />

            {/* Intro */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-14 items-center">
                        <div>
                            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{about.intro.label}</p>
                            <h2 className="section-title mb-6">{about.intro.title}</h2>
                            {about.intro.body.split("\n\n").map((para, i) => (
                                <p key={i} className="text-dark-light leading-relaxed mb-4">{para}</p>
                            ))}
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-card-hover">
                            <Image
                                src={about.team.image}
                                alt={about.team.imageAlt}
                                width={620}
                                height={480}
                                className="w-full h-80 lg:h-[420px] object-cover object-top"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 60-Minute Guarantee */}
            <section className="section-padding bg-dark">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{about.guarantee.label}</p>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">{about.guarantee.title}</h2>
                            <p className="text-gray-300 leading-relaxed">{about.guarantee.body}</p>
                        </div>
                        <div className="relative order-1 lg:order-2">
                            <div className="rounded-2xl overflow-hidden shadow-card-hover">
                                <Image
                                    src={about.guarantee.image}
                                    alt={about.guarantee.imageAlt}
                                    width={600}
                                    height={450}
                                    className="w-full h-80 object-cover object-top"
                                />
                            </div>
                            <div className="absolute top-4 left-4 bg-primary text-white rounded-2xl px-5 py-3 text-center shadow-glow">
                                <p className="text-2xl font-black">60</p>
                                <p className="text-xs">Min<br />Guarantee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Steps */}
            <section className="section-padding bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">How It Works</p>
                        <h2 className="section-title">Simple, Streamlined, Reliable</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {about.processSteps.map((step) => (
                            <div key={step.id} className="text-center">
                                <div className="w-14 h-14 rounded-full bg-primary text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                                    {step.step}
                                </div>
                                <h3 className="font-bold text-dark mb-2">{step.title}</h3>
                                <p className="text-dark-light text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-dark">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our DNA</p>
                        <h2 className="text-3xl md:text-4xl font-black text-white">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {about.values.map((value) => (
                            <div key={value.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-primary/10 hover:border-primary/30 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <div className="w-3 h-3 rounded-full bg-primary" />
                                </div>
                                <h3 className="font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <QuoteSection />
        </>
    );
}
