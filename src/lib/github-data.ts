
import fs from 'fs';
import path from 'path';

export interface GithubUser {
    name: string;
    login: string;
    skills: string[];
    location: string;
    bio: string;
    followers: number;
    contributions: number;
    stars: number;
    repos: number;
    company: string;
    twitter_username: string;
    email: string;
    hireable: boolean;
    avatar_url: string;
}

export function getGithubData(): GithubUser[] {
    try {
        const filePath = path.join(process.cwd(), 'DATA-SETS', 'Cleaned Better Schema Github Indian Users Deep Data.csv');
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const rows: GithubUser[] = [];
        let currentRow = '';
        let insideQuotes = false;

        // Skip header
        const lines = fileContent.split('\n');
        const dataLines = lines.slice(1);

        // Re-join lines to process as a stream of chars to handle quoted newlines
        // Optimization: For 10k rows, full char-by-char might be slow, but it's safe.
        // Let's use the same logic as the route.ts for consistency.

        const fullText = dataLines.join('\n');
        // Logic from route.ts
        const parsedRows: string[][] = [];
        let currentField = '';
        let currentRowFields: string[] = [];

        for (let i = 0; i < fullText.length; i++) {
            const char = fullText[i];

            if (char === '"') {
                insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
                currentRowFields.push(currentField.trim());
                currentField = '';
            } else if ((char === '\n' || char === '\r') && !insideQuotes) {
                if (currentField || currentRowFields.length > 0) {
                    currentRowFields.push(currentField.trim());
                    if (currentRowFields.length > 1) { // Basic valid row check
                        parsedRows.push(currentRowFields);
                    }
                    currentRowFields = [];
                    currentField = '';
                }
            } else {
                currentField += char;
            }
        }

        // Map parsed rows to objects
        // Header indices based on previous implementation:
        // 0: label (ignore)
        // 1: login
        // 2: name
        // 3: email
        // 4: company (works_for)
        // 5: location
        // 6: hireable (ignore)
        // 7: bio (description)
        // 8: public_repositories
        // 9: followers
        // 10: contributions (commits)
        // 11: languages (skills)
        // 12: stars (total_stars)

        return parsedRows.map(cols => {
            // Safe access
            const getCol = (idx: number) => cols[idx] ? cols[idx].replace(/^"|"$/g, '') : '';

            return {
                login: getCol(1),
                name: getCol(2) || getCol(1),
                email: '', // Not present in this CSV schema
                company: getCol(11), // works_for
                location: getCol(13), // location
                bio: getCol(19), // description
                repos: parseInt(getCol(4)) || 0, // repositories
                followers: parseInt(getCol(8)) || 0, // followers
                contributions: parseInt(getCol(5)) || 0, // last_year_contributions
                skills: getCol(14).split(',').map(s => s.trim()).filter(Boolean), // language
                stars: parseInt(getCol(7)) || 0, // stars
                hireable: getCol(12).toLowerCase() === 'open to work', // status heuristic
                twitter_username: '',
                avatar_url: `https://github.com/${getCol(1)}.png`
            };
        });

    } catch (error) {
        console.error("Error reading GitHub data:", error);
        return [];
    }
}

export function getGithubUserByUsername(username: string): GithubUser | undefined {
    const users = getGithubData();
    return users.find(u => u.login.toLowerCase() === username.toLowerCase());
}
