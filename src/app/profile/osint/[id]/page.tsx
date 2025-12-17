
import React from 'react';
import Link from 'next/link';
import { MOCK_DB } from '@/lib/mock-data'; // Changed source
import { notFound } from 'next/navigation';
import { generateGapAnalysis } from '@/lib/gap-analysis-ai';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function OSINTProfilePage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const _searchParams = await searchParams; // Await to satisfy Next.js 16
    const decodedId = decodeURIComponent(id);

    // Fetch from MOCK_DB (OSINT profiles are also here for now)
    const mockProfile = MOCK_DB.find(p => p.id === decodedId);

    if (!mockProfile) {
        return notFound();
    }

    // Adapt Mock Profile to UI Schema
    const profile = {
        full_name: mockProfile.name,
        first_name: mockProfile.name.split(' ')[0],
        last_name: mockProfile.name.split(' ').slice(1).join(' '),
        public_identifier: mockProfile.id,
        city: "OSINT Discovered",
        country: "Global Web",
        skills: mockProfile.skills,
        experiences: mockProfile.roadmap.map(r => ({
            title: r.title,
            company: r.org,
            starts_at: { year: parseInt(r.year) },
            ends_at: r.year === '2025' ? null : { year: parseInt(r.year) + 1 }, // Simple heuristic
            description: r.desc
        })).reverse(), // Show newest first
        education: [{
            school: mockProfile.college,
            degree_name: mockProfile.batch ? `Batch of ${mockProfile.batch}` : "Degree",
            field_of_study: "Unknown Field", // Default
            starts_at: { year: 2020 }
        }]
    };

    // Helper to calculate total experience
    const calculateExp = (exps: any[]) => {
        if (!exps || exps.length === 0) return "0 Years";
        return `${exps.length * 1.5} Years`; // Approximate for mock data
    };

    const totalExp = calculateExp(profile.experiences);
    const currentRole = profile.experiences?.[0] || { title: mockProfile.role, company: mockProfile.company };


    // Helper to extract known skills from text
    const extractSkillsFromText = (profile: any) => {
        const textToScan = [
            profile.headline,
            profile.summary,
            profile.experiences?.map((e: any) => `${e.title} ${e.description}`).join(" "),
            profile.education?.map((e: any) => `${e.field_of_study} ${e.degree_name}`).join(" ")
        ].join(" ").toLowerCase();

        const commonTech = [
            "java", "python", "javascript", "typescript", "react", "angular", "vue", "node.js", "next.js",
            "aws", "azure", "gcp", "docker", "kubernetes", "sql", "mysql", "postgresql", "mongodb",
            "c++", "c#", ".net", "spring boot", "django", "flask", "machine learning", "ai", "data science",
            "linux", "git", "jenkins", "terraform", "ansible", "blockchain", "solidity", "rust", "go", "php",
            "ruby", "swift", "kotlin", "scala", "r", "matlab", "html", "css", "sass", "less", "graphql",
            "rest api", "system design", "microservices", "agile", "scrum", "devops", "ci/cd"
        ];

        const found = commonTech.filter(tech => textToScan.includes(tech.toLowerCase()));
        return [...new Set(found)].map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')); // Capitalize
    };

    const rawSkills = profile.skills || [];
    const skills = rawSkills.length > 0 ? rawSkills : extractSkillsFromText(profile);
    const topSkills = skills.slice(0, 3);
    const otherSkills = skills.slice(3);

    // Dynamic Gap Analysis Logic (Component Level)
    const projectNeeds = ["React", "Node.js", "TypeScript", "SQL", "AWS"];
    const missingSkills = projectNeeds.filter(need =>
        !skills.some(s => s.toLowerCase().includes(need.toLowerCase()))
    );

    const analysis = generateGapAnalysis(missingSkills, profile.experiences[0]?.title || "Developer", skills);

    return (
        <div className="min-h-screen bg-slate-950 text-cyan-500 font-mono p-6">
            {/* HEADER NAV */}
            <div className="flex justify-between items-center mb-8 border-b border-cyan-900/50 pb-4">
                <Link href="/search?mode=osint" className="text-sm hover:text-cyan-300 transition-colors">
                    [ &lt; BACK ]
                </Link>
                <div className="text-xs tracking-widest text-cyan-700">
                    SYSTEM STATUS: ONLINE // TARGET_ID: #{id.slice(0, 6)}
                </div>
                <div className="text-sm">
                    [ EXP: OSINT ]
                </div>
            </div>

            {/* SECTION 1: THE IDENTITY */}
            <div className="border border-cyan-500/30 bg-slate-900/50 p-6 mb-6 relative group overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-10 transition-opacity" />

                <div className="flex justify-between items-start gap-6">
                    {/* PROFILE BADGE (ALPHABETIC) */}
                    <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-950 flex items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-900/20">
                        <span className="text-4xl font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            {profile.first_name?.[0]?.toUpperCase()}{profile.last_name?.[0]?.toUpperCase()}
                        </span>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">
                                    {profile.full_name}
                                </h1>
                                <div className="text-xl text-cyan-300 mb-4 flex items-center gap-2">
                                    <span className="text-cyan-600">&gt;</span>
                                    {currentRole.title} <span className="text-cyan-600">@</span> {currentRole.company}
                                </div>
                            </div>

                            {/* ACTION BUTTON */}
                            <a
                                href={`https://www.linkedin.com/in/${profile.public_identifier}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cyan-900/30 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 border border-cyan-500/50 px-4 py-2 rounded text-xs font-bold transition-all flex items-center gap-2 group/btn"
                            >
                                <span>VIEW EXTERNAL PROFILE</span>
                                <span className="group-hover/btn:translate-x-1 transition-transform">-&gt;</span>
                            </a>
                        </div>


                        <div className="flex gap-6 text-sm text-cyan-400/80">
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-700">[LOC]:</span>
                                {profile.city}, {profile.country}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-cyan-700">[EXP]:</span>
                                {totalExp}
                            </div>
                        </div>
                    </div>

                    {/* MATCH GRADE BOX */}
                    <div className="border border-cyan-500/50 p-4 min-w-[120px] text-center bg-slate-950/80 backdrop-blur shrink-0">
                        <div className="text-xs text-cyan-600 border-b border-cyan-800 pb-1 mb-2">MATCH GRADE</div>
                        <div className="text-4xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">A</div>
                        <div className="text-sm text-cyan-400">92% FIT</div>
                    </div>
                </div>

                {/* Decorative markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
            </div>

            {/* SECTION 2: THE MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                {/* COLUMN A: THE ARSENAL (SKILLS) */}
                <div className="border border-cyan-500/30 bg-slate-900/30 p-6 relative">
                    <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-sm text-cyan-600">
                        [ COLUMN A: THE ARSENAL (Skills) ]
                    </div>

                    <div className="mb-6">
                        <div className="text-xs text-cyan-700 mb-3 flex items-center gap-2">
                            [ TOP RATED ]
                            <div className="h-[1px] flex-1 bg-cyan-900/50"></div>
                        </div>
                        <div className="space-y-2">
                            {topSkills.length > 0 ? (
                                topSkills.map((skill, i) => (
                                    <div key={i} className="flex justify-between items-center group">
                                        <div className="flex items-center gap-2">
                                            <span className="text-cyan-600 opacity-50 text-xs">*</span>
                                            <span className="text-cyan-100 group-hover:text-cyan-300 transition-colors">{skill}</span>
                                        </div>
                                        <span className="text-xs text-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                            [{i === 0 ? "High Relevance" : "Verified"}]
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-cyan-800 italic p-2 border border-dashed border-cyan-900/30">
                                    No top skills identified in dataset.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="text-xs text-cyan-700 mb-3 flex items-center gap-2">
                            [ SECONDARY ]
                            <div className="h-[1px] flex-1 bg-cyan-900/50"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {otherSkills.length > 0 ? (
                                otherSkills.map(s => (
                                    <span key={s} className="px-2 py-1 bg-cyan-900/20 border border-cyan-800/50 text-xs text-cyan-400 hover:bg-cyan-900/40 cursor-default">
                                        {s}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-cyan-800 italic">No additional skills listed</span>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-dashed border-cyan-900/50 flex justify-between text-xs text-cyan-600">
                        <span>[ TOTAL SKILLS: {skills.length} ]</span>
                        <span>[ VERIFIED: {skills.length} ]</span>
                    </div>

                </div>

                {/* COLUMN B: THE TIMELINE */}
                <div className="border border-cyan-500/30 bg-slate-900/30 p-6 relative">
                    <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-sm text-cyan-600">
                        [ COLUMN B: THE TIMELINE ]
                    </div>

                    <div className="space-y-6 relative ml-2">
                        {/* Timeline Line */}
                        <div className="absolute left-[3.5px] top-2 bottom-2 w-[1px] bg-cyan-900/50"></div>

                        {profile.experiences && profile.experiences.length > 0 ? (
                            profile.experiences?.slice(0, 4).map((exp, i) => {
                                const startYear = exp.starts_at?.year || "Unknown";
                                const isCurrent = !exp.ends_at;

                                return (
                                    <div key={i} className="relative z-10 pl-6">
                                        <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full border border-slate-950 ${isCurrent ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-slate-800 border-cyan-900'}`}></div>

                                        <div className="text-xs text-cyan-500 mb-1 font-bold">
                                            ({startYear}) {isCurrent ? "CURRENT" : exp.ends_at?.year || ""}
                                        </div>
                                        <div>
                                            <span className="text-cyan-700 mr-2">o--</span>
                                            <span className="text-cyan-100 font-semibold">{exp.company}</span>
                                        </div>
                                        <div className="text-sm text-cyan-400 pl-8 border-l border-dashed border-cyan-900/30 ml-1 mt-1">
                                            {exp.title}
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="relative z-10 pl-6 text-xs text-cyan-800 italic">
                                No experience timeline data available.
                            </div>
                        )}

                        {/* Education Origin */}
                        {profile.education?.[0] && (
                            <div className="relative z-10 pl-6 mt-8 opacity-70">
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-900 border border-slate-800"></div>
                                <div className="text-xs text-cyan-700 mb-1">({profile.education[0].starts_at?.year || "Origin"}) ORIGIN</div>
                                <div>
                                    <span className="text-cyan-700 mr-2">o--</span>
                                    <span className="text-cyan-300/80">{profile.education[0].school}</span>
                                </div>
                                <div className="text-xs text-cyan-600 pl-8">
                                    | {profile.education[0].degree_name}
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>

            {/* SECTION 3: INTELLIGENCE LAB */}
            <div className="border border-cyan-500/30 bg-slate-900/50 p-6 mb-6 relative">
                <div className="absolute -top-3 left-4 bg-slate-950 px-2 text-sm text-cyan-600">
                    [ SECTION 3: INTELLIGENCE LAB (GAP ANALYSIS) ]
                </div>

                <div className="border border-dashed border-cyan-500/30 p-4 bg-slate-950/50">


                    {/* Dynamic Gap Analysis */}
                    <div className="mb-4">
                        <div className={`font-bold text-sm mb-1 flex items-center gap-2 ${missingSkills.length > 0 ? 'text-yellow-500' : 'text-emerald-500'}`}>
                            <span>({missingSkills.length > 0 ? '!' : '✓'})</span>
                            {missingSkills.length > 0 ? 'ALERT: GAP DETECTED' : 'SYSTEM: HIGH MATCH'}
                        </div>
                        <div className="text-cyan-400/80 text-sm ml-6 mb-2">
                            Target has <span className="text-white">[{topSkills[0] || 'GenSkills'}]</span>;
                            Your project needs <span className="text-white">[{missingSkills.length > 0 ? missingSkills.slice(0, 2).join('/') : 'Matching Set'}]</span>.
                        </div>

                        {/* AI RECOVERY PLAN */}
                        {analysis.learningPath.length > 0 && (
                            <div className="ml-6 mt-3 bg-slate-900/80 border border-t-0 p-3 rounded-md border-cyan-500/20">
                                <div className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-2">
                                    <span className="animate-pulse">●</span> AI RECOVERY PLAN:
                                </div>
                                <div className="space-y-3">
                                    {analysis.learningPath.map((step, idx) => (
                                        <div key={idx} className="relative pl-4 border-l border-cyan-800">
                                            <div className="text-xs text-white font-bold">STEP {step.step}: {step.title}</div>
                                            <div className="text-[10px] text-cyan-500 mb-1">{step.description}</div>
                                            <div className="flex flex-wrap gap-2">
                                                {step.resources.map((res, rIdx) => (
                                                    <a key={rIdx} href={res.link} className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/50 px-1 rounded hover:bg-cyan-900 transition-colors">
                                                        [{res.type.toUpperCase()}] {res.title}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="text-cyan-600/60 text-xs ml-6 mt-2">
                            &gt; SUGGESTION: {analysis.suggestion}
                        </div>
                    </div>

                    <div>
                        <div className="text-green-500 font-bold text-sm mb-1 flex items-center gap-2">
                            <span>(+)</span> STRENGTH:
                        </div>
                        <div className="text-cyan-400/80 text-sm ml-6">
                            Target has <span className="text-white">[{totalExp}]</span> experience. (Seniority verified)
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTION MENU */}
            <div className="border-t border-cyan-900/50 pt-6 mt-8">
                <div className="text-xs text-cyan-700 mb-2">[ ACTION MENU ]</div>
                <div className="flex flex-wrap gap-4">
                    <button className="px-4 py-2 border border-cyan-500 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 transition-all text-sm uppercase font-bold tracking-wider">
                        &gt; [ GENERATE COLD EMAIL ]
                    </button>
                    <button className="px-4 py-2 border border-cyan-800 bg-slate-900 text-cyan-600 hover:border-cyan-500 hover:text-cyan-400 transition-all text-sm uppercase">
                        &gt; [ SAVE TO &quot;SHORTLIST_A&quot; ]
                    </button>
                    <button className="px-4 py-2 border border-red-900/50 text-red-700 hover:text-red-500 hover:border-red-500 transition-all text-sm uppercase ml-auto opacity-60 hover:opacity-100">
                        &gt; [ IGNORE ]
                    </button>
                </div>
            </div>

        </div>
    );
}
