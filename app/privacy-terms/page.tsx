import type { Metadata } from 'next';
import { getCMSContent } from '@/lib/cms-data';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
    title: 'Privacy & Terms | Yasco Couriers',
    description: 'Privacy Policy and Terms of Service for Yasco Couriers.',
};

export default async function PrivacyTermsPage() {
    const content = await getCMSContent();
    const pg = content.pages.privacy;

    return (
        <>
            <PageHero
                breadcrumb={pg.breadcrumb}
                title={pg.title}
                subtitle={pg.subtitle}
                backgroundImage={pg.image}
                imagePosition={pg.imagePosition}
            />

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div
                        className="prose prose-lg prose-green max-w-none text-gray-700
                        prose-headings:font-bold prose-headings:text-gray-900 
                        prose-a:text-green-600 hover:prose-a:text-green-700
                        prose-strong:text-gray-900"
                        dangerouslySetInnerHTML={{ __html: pg.content }}
                    />
                </div>
            </section>
        </>
    );
}
