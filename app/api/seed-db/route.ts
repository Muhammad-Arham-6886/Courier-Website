import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { CMSContent } from "@/lib/cms-data";

export async function GET() {
    try {
        await dbConnect();

        const DATA_FILE = path.join(process.cwd(), "data", "cms", "content.json");
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const content = JSON.parse(raw) as CMSContent;

        const existing = await SiteContent.findOne();
        if (existing) {
            await SiteContent.updateOne({ _id: existing._id }, { $set: content });
        } else {
            await SiteContent.create(content);
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully with local content.json data" });
    } catch (e: any) {
        console.error("Seed Error:", e);
        return NextResponse.json({ error: "Failed to seed database", details: e.message }, { status: 500 });
    }
}
