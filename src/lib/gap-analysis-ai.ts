
import { COURSE_DATABASE, Topic } from './course-data';

export type LearningStep = {
    step: number;
    title: string;
    description: string;
    resources: Array<{ title: string; link: string; type: string }>;
};

export type GapAnalysisResult = {
    suggestion: string;
    learningPath: LearningStep[];
};

export function generateGapAnalysis(missingSkills: string[], candidateRole: string = "Developer", existingSkills: string[] = []): GapAnalysisResult {
    try {
        const path: LearningStep[] = [];

        // HEURISTIC ENGINE: Infer Persona from Skills & Role
        const roleLower = (candidateRole || "").toLowerCase();
        const skillsLower = (existingSkills || []).map(s => (s || "").toLowerCase());

        const hasBackend = skillsLower.some(s => ['java', 'python', 'go', 'golang', 'c#', '.net', 'django', 'spring'].some(k => s.includes(k)));
        const hasFrontend = skillsLower.some(s => ['html', 'css', 'javascript', 'vue', 'angular', 'svelte'].some(k => s.includes(k)));
        const hasSystems = skillsLower.some(s => ['c', 'c++', 'rust', 'assembly', 'embedded'].some(k => s === k || s.includes(k + ' ')));
        const hasData = skillsLower.some(s => ['sql', 'pandas', 'numpy', 'r', 'tableau', 'power bi'].some(k => s.includes(k)));

        const isBackend = roleLower.includes('backend') || (hasBackend && !hasFrontend);
        const isFrontend = roleLower.includes('frontend') || (hasFrontend && !hasBackend);
        const isSystems = isSystemsRole(roleLower) || hasSystems;
        const isStudent = roleLower.includes('student') || roleLower.includes('intern') || roleLower.includes('fresher');

        let stepCount = 1;

        missingSkills.forEach(skill => {
            if (!skill) return;
            const lowerSkill = skill.toLowerCase();
            let matchedTopic: Topic | null = null;
            let aiReasoning = "";

            // Try to match with keys in COURSE_DATABASE
            for (const key in COURSE_DATABASE) {
                if (lowerSkill.includes(key) || key.includes(lowerSkill)) {
                    matchedTopic = COURSE_DATABASE[key];
                    break;
                }
            }

            // INTELLIGENT REASONING GENERATOR
            if (matchedTopic) {
                // Case 1: Missing Node.js
                if (lowerSkill.includes('node')) {
                    if (isSystems) aiReasoning = "Shift from low-level systems to high-concurrency web servers using Node.js.";
                    else if (isFrontend) aiReasoning = "Leverage your JavaScript knowledge to build the backend (Full Stack transition).";
                    else if (isBackend) aiReasoning = "Adopt Event-Driven Architecture; faster than extensive threading models.";
                    else aiReasoning = "Essential runtime for modern web infrastructure.";
                }
                // Case 2: Missing React
                else if (lowerSkill.includes('react')) {
                    if (isSystems) aiReasoning = "Move from CLI/Desktop apps to modern Web GUIs using a component-based model.";
                    else if (isBackend) aiReasoning = "Stop relying on templates. Build dynamic, state-driven UIs to complete your stack.";
                    else if (hasFrontend) aiReasoning = "Upgrade from Vanilla JS/JQuery to the industry-standard Virtual DOM framework.";
                    else aiReasoning = "The most employable frontend skill in 2025.";
                }
                // Case 3: Missing AWS/Cloud
                else if (lowerSkill.includes('aws')) {
                    aiReasoning = isStudent
                        ? "Resume Alpha: 80% of grads lack cloud skills. Get Certified (CCP) to stand out."
                        : "Decouple your architecture. Move from on-prem thinking to Serverless/EC2.";
                }
                // Case 4: Missing SQL
                else if (lowerSkill.includes('sql')) {
                    aiReasoning = hasData
                        ? "Deepen your data stack. You have the analysis skills, now control the database."
                        : "The non-negotiable skill. Even NoSQL stacks require understanding relational data modeling.";
                }
                // Case 5: Missing TypeScript
                else if (lowerSkill.includes('typescript')) {
                    aiReasoning = (isBackend || isSystems)
                        ? "Bring the type safety you love (from C#/Java/C++) into the chaotic JavaScript world."
                        : "Scale your code. Prevents 15% of production bugs by catching errors at compile time.";
                }
                // Fallback for others
                else {
                    aiReasoning = matchedTopic.description || `Master ${matchedTopic.label} to increase match score.`;
                }
            }

            if (matchedTopic) {
                path.push({
                    step: stepCount++,
                    title: matchedTopic.label,
                    description: aiReasoning,
                    resources: matchedTopic.resources.map(r => ({
                        title: r.title,
                        link: r.link,
                        type: r.type
                    }))
                });
            }
        });
        // Generate Verification or General Step if user is perfect
        if (path.length === 0 && missingSkills.length > 0) {
            // Fallback for skills we don't have docs for
            path.push({
                step: 1,
                title: "Advanced System Design",
                description: "Since specific resources aren't in our DB, focus on high-level architecture.",
                resources: []
            });
        }

        return {
            suggestion: generateOverallSuggestion(isStudent, isSystems, isBackend, isFrontend, missingSkills.length),
            learningPath: path
        };
    } catch (error) {
        console.error("Critical Error in generateGapAnalysis:", error);
        return {
            suggestion: "System Error: Unable to generate AI analysis at this time.",
            learningPath: []
        };
    }
}

function isSystemsRole(role: string) {
    return role.includes('embedded') || role.includes('systems') || role.includes('firmware') || role.includes('driver');
}

function generateOverallSuggestion(isStudent: boolean, isSystems: boolean, isBackend: boolean, isFrontend: boolean, gapCount: number): string {
    if (gapCount === 0) return "PERFECT MATCH: Profile helps project goals immediately.";
    if (isStudent) return "Action: Focus on building 1 Full Stack project using these technologies.";
    if (isSystems) return "Observation: extremely strong technical foundation. Rapidly upskill in Web layers.";
    if (isBackend) return "Suggestion: add Frontend capabilities to become an autonomous Full Stack contributor.";
    if (isFrontend) return "Suggestion: learn Backend/Cloud to own the entire feature lifecycle.";
    return `Suggestion: Follow the AI recovery plan to close these ${gapCount} critical gaps.`;
}
