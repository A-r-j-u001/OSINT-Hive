
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { getGithubUserByUsername } from "@/lib/github-data";
import { notFound } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Terminal, MapPin, Laptop, Star, Users, GitCommit, Box, ExternalLink, Mail, Award, Activity, AlertTriangle, CheckCircle, Github, Sliders, User } from "lucide-react";
import { generateGapAnalysis } from '@/lib/gap-analysis-ai';

interface PageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GithubProfilePage({ params, searchParams }: PageProps) {
    const { id } = await params;
    const queryParams = await searchParams;
    const username = decodeURIComponent(id);
    const profile = getGithubUserByUsername(username);

    // Reconstruct query string
    const queryString = new URLSearchParams(queryParams as any).toString();
    const backLink = queryString ? `/search?${queryString}` : '/search?mode=github';

    if (!profile) {
        return notFound();
    }

    // Mock Data for UX (since we don't have these in CSV)
    const joinYear = 2021; // Mock
    const currentYear = new Date().getFullYear();
    const experienceYears = currentYear - joinYear;

    // Dynamic Gap Analysis
    const projectNeeds = ["React", "Node.js", "TypeScript", "SQL", "AWS"];
    const missingSkills = projectNeeds.filter(need =>
        !profile.skills.some(s => s.toLowerCase().includes(need.toLowerCase()))
    );
    const analysis = generateGapAnalysis(missingSkills, "Software Engineer", profile.skills);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-mono p-4 md:p-8 selection:bg-cyan-900 selection:text-white">

            {/* TOP NAVIGATION BAR */}
            <div className="border border-slate-700 border-dashed p-2 flex justify-between items-center bg-slate-900/50 mb-6 text-sm">
                <Link href={backLink} className="hover:text-white transition-colors">
                    [ &lt; Back ]
                </Link>
                <div className="hidden md:block text-slate-500 uppercase tracking-widest text-xs">
                    PROFILE INTELLIGENCE: @{profile.login} (GitHub)
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-green-400">[ SMTP Verified ]</span>
                </div>
            </div>

            {/* HEADER: THE IDENTITY */}
            <div className="mb-6">
                <div className="text-slate-500 text-xs mb-1">[ HEADER: THE IDENTITY ]</div>
                <div className="border border-slate-700 bg-slate-900/30 p-6 relative">
                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-500"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-500"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-500"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-500"></div>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        {/* PHOTO */}
                        <div className="relative group">
                            <div className="w-24 h-24 border-2 border-slate-600 p-1 rounded-full">
                                <img src={profile.avatar_url} alt={profile.login} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 rounded-full" />
                            </div>
                        </div>

                        {/* INFO */}
                        <div className="flex-1 space-y-3">
                            <div>
                                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                                    {profile.name}
                                    <span className="text-xs font-normal text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded bg-amber-500/10">
                                        (Top 10% Contributor)
                                    </span>
                                </h1>
                                <div className="text-slate-400 flex items-center gap-2 mt-1">
                                    <Terminal className="w-4 h-4" />
                                    <span>Software Engineer @ [{profile.company || "Unknown/Freelance"}]</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm">
                                <div className="flex items-center gap-2 text-pink-400">
                                    <MapPin className="w-4 h-4" />
                                    {profile.location || "Earth"}
                                </div>
                                <div className="hidden md:block w-px h-4 bg-slate-700"></div>
                                <div className="flex items-center gap-2 text-cyan-400">
                                    <Laptop className="w-4 h-4" />
                                    Core: {profile.skills.slice(0, 3).join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* METRICS STRIP */}
                    <div className="mt-6 pt-6 border-t border-dashed border-slate-700 flex flex-wrap gap-4 md:gap-12 text-xs md:text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">[MATCH GRADE:</span>
                            <span className="text-green-400 font-bold">A+</span>
                            <span className="text-slate-500">]</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">[COMPATIBILITY:</span>
                            <span className="text-cyan-400 font-bold">92%</span>
                            <span className="text-slate-500">]</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">[STATUS:</span>
                            <span className="text-amber-400 font-bold">{profile.hireable ? "Open to Work" : "Active Coder"}</span>
                            <span className="text-slate-500">]</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN GRID */}
            <div className="mb-2 text-slate-500 text-xs">[ MAIN GRID ]</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                {/* COLUMN 1: THE METRICS */}
                <div className="border border-slate-700 bg-slate-900/20 p-6 flex flex-col h-full">
                    <div className="mb-4 border-b border-slate-800 pb-2 text-sm font-bold tracking-wider text-slate-400">
                        COLUMN 1: THE METRICS (Key Statistics)
                    </div>

                    <div className="space-y-8 flex-1">
                        {/* INFLUENCE */}
                        <div>
                            <div className="text-xs text-slate-500 mb-3 uppercase tracking-wider">INFLUENCE & REACH</div>
                            <div className="space-y-3 pl-2 border-l border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-bold text-white">{profile.stars}</span>
                                    <span className="text-slate-500">Stars (High Authority)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-purple-500" />
                                    <span className="font-bold text-white">{profile.followers}</span>
                                    <span className="text-slate-500">Followers</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Box className="w-4 h-4 text-orange-500" />
                                    <span className="font-bold text-white">{profile.repos}</span>
                                    <span className="text-slate-500">Repositories</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTIVITY */}
                        <div>
                            <div className="text-xs text-slate-500 mb-3 uppercase tracking-wider">ACTIVITY LEVEL</div>
                            <div className="space-y-2 pl-2 border-l border-slate-800">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-4 h-4 text-red-500" />
                                    <span className="font-bold text-white">{profile.contributions}</span>
                                    <span className="text-slate-500">Contribs (Last Year)</span>
                                </div>
                                <div className="text-xs text-green-400 italic pl-7">
                                    "Consistently Active"
                                </div>
                            </div>
                        </div>

                        {/* ACTION */}
                        <div className="mt-8">
                            <a href={`https://github.com/${profile.login}`} target="_blank" rel="noopener noreferrer" className="block w-full">
                                <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600">
                                    <Github className="w-4 h-4 mr-2" />
                                    View on GitHub
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: THE ROADMAP */}
                <div className="border border-slate-700 bg-slate-900/20 p-6 flex flex-col h-full">
                    <div className="mb-4 border-b border-slate-800 pb-2 text-sm font-bold tracking-wider text-slate-400">
                        COLUMN 2: THE ROADMAP (The Story)
                    </div>

                    <div className="relative pl-4 border-l border-dashed border-slate-700 space-y-8 py-2">
                        {/* Entry 1 */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-800 border border-slate-500 rounded-full"></div>
                            <div className="text-sm font-bold text-white mb-1">
                                {joinYear}: THE START <span className="text-slate-500 font-normal">(Joining Year)</span>
                            </div>
                            <div className="pl-6 border-l border-slate-800 ml-1 space-y-2 text-sm text-slate-400">
                                <div>o-- Account Created</div>
                                <div>|   (Metric: 0 -&gt; 1 Repo)</div>
                            </div>
                        </div>

                        {/* Entry 2 */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-800 border border-slate-500 rounded-full"></div>
                            <div className="text-sm font-bold text-white mb-1">
                                {joinYear + 1}: THE GRIND <span className="text-slate-500 font-normal">(High Contribs)</span>
                            </div>
                            <div className="pl-6 border-l border-slate-800 ml-1 space-y-2 text-sm text-slate-400">
                                <div>o-- Explored 'Web3' Repos</div>
                                <div>|   (Metric: 600+ Commits)</div>
                            </div>
                        </div>

                        {/* Entry 3 */}
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 bg-green-500/20 border border-green-500 rounded-full animate-pulse"></div>
                            <div className="text-sm font-bold text-white mb-1">
                                {currentYear}: CURRENT STATUS
                            </div>
                            <div className="pl-6 border-l border-slate-800 ml-1 space-y-2 text-sm text-slate-400">
                                <div>o-- Established '{profile.skills[0] || "Code"}' Developer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM PANEL: THE ACTION */}
            <div className="mb-1 text-slate-500 text-xs">[ BOTTOM PANEL: THE ACTION (My Intelligence) ]</div>
            <div className="border border-slate-700 bg-slate-900/30 p-6">
                <div className="mb-4 text-sm font-bold text-slate-300">
                    GAP ANALYSIS LAB (You vs {profile.name.split(' ')[0]})
                </div>

                <div className="space-y-3 font-mono text-sm mb-6">
                    {/* Basic Match/Gap Checks */}
                    <div className="flex items-start gap-3">
                        <div className="bg-green-500/10 text-green-400 p-0.5 rounded">
                            <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="text-slate-300">
                            <span className="font-bold text-green-400">MATCH:</span> You both know [{profile.skills[0] || "Code"}].
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className={`p-0.5 rounded ${missingSkills.length > 0 ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'}`}>
                            {missingSkills.length > 0 ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </div>
                        <div className="text-slate-300">
                            <span className={`font-bold ${missingSkills.length > 0 ? 'text-amber-400' : 'text-green-400'}`}>
                                {missingSkills.length > 0 ? 'GAP DETECTED:' : 'ALL CLEAR:'}
                            </span>
                            {missingSkills.length > 0
                                ? ` Missing core stack: [${missingSkills.slice(0, 3).join(', ')}].`
                                : " Your stack matches the project needs."}
                        </div>
                    </div>

                    {/* AI RECOVERY PLAN */}
                    {analysis.learningPath.length > 0 && (
                        <div className="ml-8 mt-3 bg-slate-950 border border-slate-800 p-3 rounded-md">
                            <div className="text-xs font-bold text-cyan-400 mb-2 flex items-center gap-2">
                                <span className="animate-pulse">●</span> AI RECOVERY PLAN:
                            </div>
                            <div className="space-y-3">
                                {analysis.learningPath.map((step, idx) => (
                                    <div key={idx} className="relative pl-4 border-l border-slate-700">
                                        <div className="text-xs text-white font-bold">STEP {step.step}: {step.title}</div>
                                        <div className="text-[10px] text-slate-400 mb-1">{step.description}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {step.resources.map((res, rIdx) => (
                                                <a key={rIdx} href={res.link} className="text-[10px] bg-slate-800 text-cyan-400 border border-slate-700 px-1 rounded hover:bg-slate-700 transition-colors">
                                                    [{res.type.toUpperCase()}] {res.title}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 border-t border-dashed border-slate-700 pt-4">
                    <Button className="bg-slate-100 text-black hover:bg-white font-bold w-full md:w-auto">
                        [ GENERATE COLD EMAIL ]
                    </Button>
                    <span className="text-xs text-slate-500 hidden md:inline">
                        &lt;-- (Uses Bio: "{profile.bio?.substring(0, 30)}...")
                    </span>
                </div>
            </div>

        </div>
    );
}
