import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.yascocouriers.co.uk";
    const now = new Date();

    return [
        { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
        { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${baseUrl}/privacy-terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];
}
