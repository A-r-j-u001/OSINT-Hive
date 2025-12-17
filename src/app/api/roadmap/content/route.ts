
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roadmapId = searchParams.get('roadmapId');
    const nodeId = searchParams.get('nodeId');

    if (!roadmapId || !nodeId) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const contentDir = path.join(process.cwd(), 'src', 'data', 'roadmaps', roadmapId, 'content');

    try {
        if (!fs.existsSync(contentDir)) {
            return NextResponse.json({ error: 'Roadmap content not found' }, { status: 404 });
        }

        const files = fs.readdirSync(contentDir);
        // Find file that ends with @nodeId.md
        const file = files.find(f => f.includes(`@${nodeId}.md`) || f.includes(`@${nodeId}.md` /* case insensitive? */));

        // Fallback: Check if file *is* the nodeId (less likely based on observed pattern)

        if (!file) {
            return NextResponse.json({ error: 'Content not found' }, { status: 404 });
        }

        const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
        return NextResponse.json({ content, title: file.split('@')[0].replace(/-/g, ' ') });
    } catch (error) {
        console.error("Content fetch error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
