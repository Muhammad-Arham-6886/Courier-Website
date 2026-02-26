import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "cms", "content.json");

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface GlobalSettings {
    siteName: string;
    tagline: string;
    logo: string;
    footerTagline: string;
}

export interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    bgColor: string;
    image: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
    address: {
        street: string;
        city: string;
        postcode: string;
        country: string;
    };
    hours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    };
}

export interface WhyChooseItem {
    id: string;
    icon: string;
    title: string;
    desc: string;
}

export interface ClientLogoItem {
    id: string;
    src: string;
    alt: string;
}

export interface HomeContent {
    whyChoose: {
        label: string;
        title: string;
        subtitle: string;
        image: string;
        imageAlt: string;
        badgeValue: string;
        badgeLabel: string;
        items: WhyChooseItem[];
    };
    servicesSection: {
        label: string;
        title: string;
        subtitle: string;
    };
    clientLogos: {
        label: string;
        items: ClientLogoItem[];
    };
    guarantee: {
        label: string;
        title: string;
        body: string;
        tags: string[];
        ctaText: string;
        ctaLink: string;
        image: string;
        imageAlt: string;
    };
    testimonials: {
        label: string;
        title: string;
        subtitle: string;
    };
}

export interface ProcessStep {
    id: string;
    step: string;
    title: string;
    desc: string;
}

export interface ValueItem {
    id: string;
    title: string;
    desc: string;
}

export interface AboutContent {
    hero: {
        breadcrumb: string;
        title: string;
        subtitle: string;
        ctaText: string;
        ctaLink: string;
        secondaryCtaText: string;
        secondaryCtaLink: string;
        image: string;
        imagePosition: string;
    };
    intro: {
        label: string;
        title: string;
        body: string;
    };
    team: {
        image: string;
        imageAlt: string;
    };
    guarantee: {
        label: string;
        title: string;
        body: string;
        image: string;
        imageAlt: string;
    };
    processSteps: ProcessStep[];
    values: ValueItem[];
}

export interface PageHeroData {
    breadcrumb: string;
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
    image: string;
    imagePosition: string;
    introLabel?: string;
    introTitle?: string;
    introBody?: string;
}

export interface PrivacyPageData extends PageHeroData {
    content: string;
}

export interface PagesContent {
    privacy: PrivacyPageData;
    services: PageHeroData;
    contact: PageHeroData;
    faq: PageHeroData;
}

export interface Service {
    id: string;
    title: string;
    icon: string;
    image: string;
    shortDescription: string;
    fullDescription: string;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
}

export interface QuoteSectionContent {
    label: string;
    title: string;
    subtitle: string;
    phoneLabel: string;
    phoneSub: string;
    footerText: string;
}

export interface Stat {
    id: string;
    label: string;
    value: number;
    suffix: string;
}

export interface CMSContent {
    global: GlobalSettings;
    hero: { slides: HeroSlide[] };
    contact: ContactInfo;
    home: HomeContent;
    about: AboutContent;
    pages: PagesContent;
    quoteSection: QuoteSectionContent;
    services: Service[];
    testimonials: Testimonial[];
    faqs: FAQ[];
    stats: Stat[];
    locations: string[];
}

// ─── Functions ────────────────────────────────────────────────────────────────

import dbConnect from "./mongodb";
import SiteContent from "../models/SiteContent";

export async function getCMSContent(): Promise<CMSContent> {
    try {
        await dbConnect();
        const content = await SiteContent.findOne().lean();

        if (content) {
            const { _id, __v, createdAt, updatedAt, ...rest } = content as Record<string, any>;
            return rest as unknown as CMSContent;
        }
    } catch (e) {
        console.error("Error fetching CMS content from MongoDB:", e);
    }

    // Fallback to local file if DB is empty or connection fails
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as CMSContent;
}

export async function saveCMSContent(content: CMSContent): Promise<void> {
    await dbConnect();
    const existing = await SiteContent.findOne();

    if (existing) {
        await SiteContent.updateOne({ _id: existing._id }, { $set: content });
    } else {
        await SiteContent.create(content);
    }
}
