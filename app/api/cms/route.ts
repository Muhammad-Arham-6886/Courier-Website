import { NextRequest, NextResponse } from "next/server";
import { getCMSContent, saveCMSContent, CMSContent } from "@/lib/cms-data";

export async function GET() {
    try {
        const content = getCMSContent();
        return NextResponse.json(content);
    } catch {
        return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as CMSContent;
        saveCMSContent(body);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
    }
}
