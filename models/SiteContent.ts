import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema(
    {
        global: { type: mongoose.Schema.Types.Mixed },
        hero: { type: mongoose.Schema.Types.Mixed },
        contact: { type: mongoose.Schema.Types.Mixed },
        home: { type: mongoose.Schema.Types.Mixed },
        about: { type: mongoose.Schema.Types.Mixed },
        pages: { type: mongoose.Schema.Types.Mixed },
        quoteSection: { type: mongoose.Schema.Types.Mixed },
        services: { type: mongoose.Schema.Types.Mixed },
        testimonials: { type: mongoose.Schema.Types.Mixed },
        faqs: { type: mongoose.Schema.Types.Mixed },
        stats: { type: mongoose.Schema.Types.Mixed },
        locations: { type: mongoose.Schema.Types.Mixed },
    },
    {
        timestamps: true,
        strict: false,
    }
);

// If the model already exists (e.g., in hot reload), use it; Otherwise create it.
const SiteContent =
    mongoose.models.SiteContent ||
    mongoose.model('SiteContent', SiteContentSchema);

export default SiteContent;
