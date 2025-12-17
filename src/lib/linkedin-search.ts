import fs from 'fs';
import readline from 'readline';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'DATA-SETS', '10k_data_li_india.txt');

export interface LinkedInProfile {
    public_identifier: string;
    first_name: string;
    last_name: string;
    full_name: string;
    occupation: string;
    headline: string;
    summary: string | null;
    country: string;
    country_full_name: string | null;
    city: string;
    state: string;
    experiences: Experience[];
    education: Education[];
    skills: string[];
    languages: string[];
    connections: number | null;
    profile_pic_url: string | null;
}

interface Experience {
    company: string;
    title: string;
    starts_at: DateObj | null;
    ends_at: DateObj | null;
    location: string | null;
    description: string | null;
}

interface Education {
    school: string;
    degree_name: string;
    field_of_study: string | null;
    starts_at: DateObj | null;
    ends_at: DateObj | null;
}

interface DateObj {
    day: number;
    month: number;
    year: number;
}

interface SearchFilters {
    q?: string;
    status?: string; // Role
    company?: string;
    experience?: string; // "0-2", "3-5", "5-10", "10+"
    skills?: string;
}

function calculateTotalExperience(experiences: Experience[]): number {
    let totalMonths = 0;
    if (!experiences || !Array.isArray(experiences)) return 0;

    experiences.forEach(exp => {
        if (exp.starts_at && exp.starts_at.year) {
            const start = new Date(exp.starts_at.year, (exp.starts_at.month || 1) - 1);
            let end = new Date(); // Default to now

            if (exp.ends_at && exp.ends_at.year) {
                end = new Date(exp.ends_at.year, (exp.ends_at.month || 1) - 1);
            }

            const diff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
            if (diff > 0) totalMonths += diff;
        }
    });

    return totalMonths / 12;
}

export async function searchLinkedInData(filters: SearchFilters) {
    const results: LinkedInProfile[] = [];
    const MAX_RESULTS = 50; // Simple pagination limit

    if (!fs.existsSync(DATA_FILE_PATH)) {
        console.error("Data file not found:", DATA_FILE_PATH);
        return { results: [], total: 0 };
    }

    const fileStream = fs.createReadStream(DATA_FILE_PATH);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let matchCount = 0;

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const profile = JSON.parse(line) as LinkedInProfile;

            // 1. Keyword Search (Name, Headline, Summary)
            if (filters.q) {
                const q = filters.q.toLowerCase();
                const textToSearch = `${profile.full_name} ${profile.headline} ${profile.summary || ''} ${profile.occupation}`.toLowerCase();
                if (!textToSearch.includes(q)) continue;
            }

            // 2. Role / Occupation Filter (mapped to 'status' param)
            if (filters.status) {
                const role = filters.status.toLowerCase();
                const occupation = (profile.occupation || "").toLowerCase();
                // Also check current job title
                const currentTitle = (profile.experiences && profile.experiences[0]) ? profile.experiences[0].title.toLowerCase() : "";

                if (!occupation.includes(role) && !currentTitle.includes(role)) continue;
            }

            // 3. Company Filter
            if (filters.company && filters.company !== 'any') {
                const targetCo = filters.company.toLowerCase();
                const currentCo = (profile.experiences && profile.experiences[0]) ? profile.experiences[0].company.toLowerCase() : "";
                if (!currentCo.includes(targetCo)) continue;
            }

            // 4. Skills Filter
            if (filters.skills) {
                const targetSkill = filters.skills.toLowerCase();
                const hasSkill = profile.skills && profile.skills.some(s => s.toLowerCase().includes(targetSkill));
                if (!hasSkill) continue;
            }

            // 5. Experience Filter
            if (filters.experience && filters.experience !== 'any') {
                const years = calculateTotalExperience(profile.experiences);
                let match = false;
                if (filters.experience === '0-2' && years <= 2) match = true;
                else if (filters.experience === '3-5' && years > 2 && years <= 5) match = true;
                else if (filters.experience === '5-10' && years > 5 && years <= 10) match = true;
                else if (filters.experience === '10+' && years > 10) match = true;

                if (!match) continue;
            }

            // Add to results
            matchCount++;
            if (results.length < MAX_RESULTS) {
                results.push(profile);
            }

            // Optimization: if we just want a paginated slice, we could stop early, 
            // but to get accurate "Total" count we need to scan all.
            // For performance on 10k items, scanning all is fast (~100ms in Node).

        } catch (e) {
            // ignore parse error
        }
    }

    return {
        results,
        total: matchCount
    };
}

export async function getLinkedInProfile(publicIdentifier: string): Promise<LinkedInProfile | null> {
    const rs = fs.createReadStream(DATA_FILE_PATH);
    const rl = readline.createInterface({ input: rs, crlfDelay: Infinity });

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const p = JSON.parse(line) as LinkedInProfile;
            if (p.public_identifier === publicIdentifier) {
                rs.destroy();
                return p;
            }
        } catch { }
    }
    return null;
}
