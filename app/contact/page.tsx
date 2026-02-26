import { Metadata } from "next";
import { getCMSContent } from "@/lib/cms-data";
import PageHero from "@/components/ui/PageHero";
import QuoteForm from "@/components/ui/QuoteForm";
import { Phone, Mail, MapPin, Clock, MapPinned } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Yasco Couriers — call, email, or fill in our form for a fast, competitive same-day courier quote. Based in Bradford, West Yorkshire.",
};

export default async function ContactPage() {
    const content = await getCMSContent();
    const { contact, locations } = content;
    const pg = content.pages.contact;

    return (
        <>
            <PageHero
                breadcrumb={pg.breadcrumb}
                title={pg.title}
                subtitle={pg.subtitle}
                backgroundImage={pg.image}
                imagePosition={pg.imagePosition}
            />

            {/* Contact Cards + Form */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                        {[
                            {
                                icon: <Phone size={24} />,
                                title: "Phone",
                                content: (
                                    <a
                                        href={`tel:${contact.phone}`}
                                        className="text-primary font-bold text-lg hover:text-primary-dark transition-colors"
                                    >
                                        {contact.phone}
                                    </a>
                                ),
                            },
                            {
                                icon: <Mail size={24} />,
                                title: "Email",
                                content: (
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-primary font-semibold hover:text-primary-dark text-sm break-all transition-colors"
                                    >
                                        {contact.email}
                                    </a>
                                ),
                            },
                            {
                                icon: <MapPin size={24} />,
                                title: "Address",
                                content: (
                                    <address className="not-italic text-sm text-dark-light">
                                        Yasco Couriers Ltd
                                        <br />
                                        {contact.address.street}
                                        <br />
                                        {contact.address.city}, {contact.address.postcode}
                                        <br />
                                        {contact.address.country}
                                    </address>
                                ),
                            },
                            {
                                icon: <Clock size={24} />,
                                title: "Office Hours",
                                content: (
                                    <ul className="space-y-1 text-sm text-dark-light">
                                        <li>{contact.hours.weekdays}</li>
                                        <li>{contact.hours.saturday}</li>
                                        <li>{contact.hours.sunday}</li>
                                    </ul>
                                ),
                            },
                        ].map((card) => (
                            <div
                                key={card.title}
                                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="font-bold text-dark mb-2">{card.title}</h3>
                                {card.content}
                            </div>
                        ))}
                    </div>

                    {/* Form + Map */}
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-6">
                                Send Us a Message
                            </h2>
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <QuoteForm />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-6">Find Us</h2>
                            <div className="rounded-2xl overflow-hidden shadow-card h-[400px] lg:h-full min-h-[350px]">
                                <iframe
                                    title="Yasco Couriers Location — Bradford, West Yorkshire"
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                                        "56 Southmere Drive, Bradford, BD7 4EA, UK"
                                    )}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "350px" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations */}
            <section className="section-padding bg-dark">
                <div className="container-custom">
                    <div className="text-center mb-10">
                        <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
                            Coverage Area
                        </p>
                        <h2 className="text-3xl font-black text-white mb-3">
                            Locations We Serve Within the Hour
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Based in Bradford, we can collect and deliver across all of these
                            locations within 60 minutes.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {locations.map((loc) => (
                            <span
                                key={loc}
                                className="flex items-center gap-1.5 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-gray-300 text-sm hover:bg-primary/20 hover:border-primary/40 hover:text-white transition-all duration-200"
                            >
                                <MapPinned size={13} className="text-primary shrink-0" />
                                {loc}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
