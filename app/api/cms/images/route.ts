import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

export async function GET() {
    try {
        const publicDir = path.join(process.cwd(), "public");
        const files = fs.readdirSync(publicDir);
        const images = files.filter((f) => {
            const ext = path.extname(f).toLowerCase();
            return IMAGE_EXTENSIONS.includes(ext);
        });
        return NextResponse.json({ images });
    } catch {
        return NextResponse.json({ images: [] });
    }
}
