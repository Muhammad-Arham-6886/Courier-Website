import { getCMSContent } from "@/lib/cms-data";
import HeroSlider from "@/components/ui/HeroSlider";
import StatsCounter from "@/components/ui/StatsCounter";
import TestimonialSlider from "@/components/ui/TestimonialSlider";
import QuoteSection from "@/components/ui/QuoteSection";
import Image from "next/image";
import Link from "next/link";
import {
  Clock, Shield, RefreshCw, MapPin, ThumbsUp, Zap, ArrowRight
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock size={26} />,
  Shield: <Shield size={26} />,
  RefreshCw: <RefreshCw size={26} />,
  MapPin: <MapPin size={26} />,
  ThumbsUp: <ThumbsUp size={26} />,
  Zap: <Zap size={26} />,
};

export default async function HomePage() {
  const content = await getCMSContent();
  const { home, stats, testimonials } = content;

  return (
    <>
      {/* Hero Slider */}
      <HeroSlider slides={content.hero.slides} phone={content.contact.phone} />

      {/* Stats Strip */}
      <div className="bg-dark">
        <div className="container-custom py-8">
          <StatsCounter stats={stats} />
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-card-hover">
                <Image
                  src={home.whyChoose.image}
                  alt={home.whyChoose.imageAlt}
                  width={620}
                  height={520}
                  className="w-full h-80 lg:h-[480px] object-cover object-top"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -right-4 bg-primary text-white rounded-2xl px-6 py-4 shadow-glow text-center">
                <p className="text-3xl font-black">{home.whyChoose.badgeValue}</p>
                <p className="text-xs font-medium opacity-90">{home.whyChoose.badgeLabel}</p>
              </div>
            </div>

            {/* Content */}
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{home.whyChoose.label}</p>
              <h2 className="section-title mb-4">{home.whyChoose.title}</h2>
              <p className="text-dark-light leading-relaxed mb-8">{home.whyChoose.subtitle}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {home.whyChoose.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {iconMap[item.icon] ?? <Zap size={26} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-dark text-sm mb-1">{item.title}</h3>
                      <p className="text-dark-light text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-outline mt-8">
                More About Us <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">{home.servicesSection.label}</p>
            <h2 className="section-title">{home.servicesSection.title}</h2>
            <p className="text-dark-light mt-4 max-w-2xl mx-auto leading-relaxed">{home.servicesSection.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 group border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Zap size={24} />
                </div>
                <h3 className="font-bold text-dark mb-2">{service.title}</h3>
                <p className="text-dark-light text-sm leading-relaxed mb-4">{service.shortDescription}</p>
                <Link
                  href="/services"
                  className="text-primary text-sm font-semibold hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary px-10">
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos Trust Band */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
            {home.clientLogos.label}
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 items-center justify-items-center">
            {home.clientLogos.items.map((logo) => (
              <Image
                key={logo.id}
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={80}
                className="h-20 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity grayscale hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Strip */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src={home.guarantee.image}
                alt={home.guarantee.imageAlt}
                width={600}
                height={400}
                className="w-full h-72 lg:h-96 object-cover object-top"
              />
            </div>
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">{home.guarantee.label}</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                {home.guarantee.title.split("\n").map((line, i) => (
                  <span key={i}>{line}{i === 0 && <br />}</span>
                ))}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">{home.guarantee.body}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {home.guarantee.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30">
                    {tag}
                  </span>
                ))}
              </div>
              <Link href={home.guarantee.ctaLink} className="btn-primary shadow-glow">
                {home.guarantee.ctaText} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0faf0 0%, #e8f5e9 40%, #f5f9ff 100%)" }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-custom relative">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">{home.testimonials.label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-dark">{home.testimonials.title}</h2>
            <p className="text-dark-light mt-3 max-w-xl mx-auto">{home.testimonials.subtitle}</p>
          </div>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* Quote Form */}
      <QuoteSection />
    </>
  );
}
