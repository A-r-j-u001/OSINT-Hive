const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('DATA-SETS/10k_data_li_india.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const skills = {};
    let count = 0;
    let hasSkillsCount = 0;

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const profile = JSON.parse(line);

            if (profile.skills && Array.isArray(profile.skills)) {
                profile.skills.forEach(skill => {
                    if (skill) {
                        const normalizedSkill = skill.toLowerCase().trim();
                        skills[normalizedSkill] = (skills[normalizedSkill] || 0) + 1;
                    }
                });
                if (profile.skills.length > 0) hasSkillsCount++;
            }
            count++;
        } catch (e) {
            // ignore
        }
    }

    // Sort by frequency
    const sortedSkills = Object.entries(skills)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 50); // Top 50

    console.log(`Analyzed ${count} profiles.`);
    console.log(`${hasSkillsCount} profiles had skills listed.`);
    console.log("Top 50 Skills:");
    sortedSkills.forEach(([skill, freq]) => {
        console.log(`${freq}: ${skill}`);
    });
}

processLineByLine();
