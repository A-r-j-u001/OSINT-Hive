"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, AlertTriangle, BookOpen, ExternalLink } from "lucide-react"
import { COURSE_DATABASE } from "@/lib/course-data"

export default function GapAnalysisPage() {
    const [userSkills, setUserSkills] = useState<string[]>([])
    const [targetMentor, setTargetMentor] = useState<any>(null)
    const [aiAnalysis, setAiAnalysis] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 1. Get User
        const stored = localStorage.getItem('userProfile')
        if (stored) {
            const profile = JSON.parse(stored)
            setUserSkills(profile.skills || [])
        }

        // 2. Get Target ID from URL
        const params = new URLSearchParams(window.location.search)
        const targetId = params.get('targetId')

        if (targetId) {
            fetch(`/api/search?id=${targetId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        setTargetMentor(data.results[0].metadata)
                    }
                    setLoading(false)
                })
        } else {
            // Fallback: Fetch any random verified mentor for demo
            fetch('/api/search?q=Rohan') // Keep default demo if no ID
                .then(res => res.json())
                .then(data => {
                    if (data.results && data.results.length > 0) {
                        setTargetMentor(data.results[0].metadata)
                    }
                    setLoading(false)
                })
        }
    }, [])

    // 3. Trigger AI Analysis when both profiles are ready
    useEffect(() => {
        if (targetMentor && userSkills.length > 0 && !aiAnalysis) {
            fetch('/api/gap-analysis', {
                method: 'POST',
                body: JSON.stringify({
                    userSkills: userSkills,
                    targetRole: targetMentor.role,
                    targetSkills: targetMentor.skills
                })
            })
                .then(res => res.json())
                .then(data => setAiAnalysis(data))
                .catch(err => console.error("AI Failed", err))
        }
    }, [targetMentor, userSkills])


    if (loading) return <div className="p-10 text-center text-slate-500 animate-pulse">Loading Vector Space...</div>
    if (!targetMentor) return <div className="p-10 text-center text-slate-500">Mentor not found. Please select one from Search.</div>

    // Fallback calculation for immediate render while AI loads
    const missingSkills = targetMentor.skills.filter((s: string) => !userSkills.includes(s))

    const getRecommendedResources = (skillName: string) => {
        // ... (Keep existing fallback resource logic) ...
        const normalizedSkill = skillName.toLowerCase()
        const courseKey = Object.keys(COURSE_DATABASE).find(k => k.toLowerCase() === normalizedSkill)
        if (courseKey) return COURSE_DATABASE[courseKey].resources

        return [
            {
                title: `${skillName} Full Course`,
                platform: 'FreeCodeCamp',
                link: `https://www.freecodecamp.org/news/search/?query=${skillName}`,
                type: 'course'
            },
            {
                title: `${skillName} Crash Course`,
                platform: 'YouTube',
                link: `https://www.youtube.com/results?search_query=${skillName}+crash+course`,
                type: 'video'
            },
            {
                title: `Verify ${skillName} Skill`,
                platform: 'Credly',
                link: `https://www.credly.com/org/google/badge/${skillName}`,
                type: 'certificate'
            }
        ]
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center font-mono">
            <header className="w-full max-w-5xl mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Gap Analysis Lab <span className="text-slate-500 font-normal">Vector Space Comparison</span></h1>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Targeting Role</div>
                        <div className="font-bold text-cyan-400">{targetMentor.role} @ {targetMentor.company}</div>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Visual Comparison Area */}
                <div className="col-span-full bg-slate-900/50 rounded-xl border border-slate-800 p-8 flex items-center justify-center gap-12 relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/20 to-transparent pointer-events-none" />

                    {/* Student Vector */}
                    <div className="z-10 text-center space-y-4">
                        <div className="h-32 w-32 rounded-full border-4 border-slate-700 bg-slate-800 flex flex-col items-center justify-center shadow-xl">
                            <span className="text-4xl font-bold text-slate-300">YOU</span>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3 text-left w-48 text-sm space-y-1 border border-slate-700">
                            <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Current Skills</div>
                            {userSkills.length > 0 ? (
                                userSkills.slice(0, 4).map((skill, i) => (
                                    <div key={i}>• {skill}</div>
                                ))
                            ) : (
                                <div className="text-slate-500 italic">No skills found context</div>
                            )}
                        </div>
                    </div>

                    {/* The GAP */}
                    <div className="z-10 flex flex-col items-center gap-2">
                        <ArrowRight className="h-10 w-10 text-red-500 animate-pulse" />
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-3 py-1 rounded text-xs font-bold">
                            MISSING {missingSkills.length} SKILLS
                        </div>
                    </div>

                    {/* Mentor Vector */}
                    <div className="z-10 text-center space-y-4">
                        <div className="h-32 w-32 rounded-full border-4 border-cyan-500 bg-cyan-900/20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            <span className="text-xl font-bold text-cyan-100">{targetMentor.name.split(' ')[0].toUpperCase()}</span>
                            <span className="text-xs text-cyan-400">Mentor</span>
                        </div>
                        <div className="bg-cyan-950/50 rounded-lg p-3 text-left w-48 text-sm space-y-1 border border-cyan-500/30">
                            <div className="text-cyan-400 text-xs uppercase font-bold tracking-wider mb-1">Target Skills</div>
                            {targetMentor.skills.slice(0, 4).map((skill: string, i: number) => (
                                <div key={i} className={!userSkills.includes(skill) ? "font-bold text-cyan-300" : ""}>• {skill.toUpperCase()}</div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Intelligent Recommendation */}
                <div className="col-span-full">
                    <Alert className="border-cyan-500/50 bg-cyan-950/10">
                        <AlertTriangle className="h-4 w-4 text-cyan-400" />
                        <AlertTitle className="text-cyan-400 flex items-center gap-2">
                            AI Gap Analysis {aiAnalysis ? '(Powered by Gemini)' : '(Loading AI...)'}
                        </AlertTitle>
                        <AlertDescription className="text-slate-300 mt-2">
                            {aiAnalysis ? aiAnalysis.analysis : "Analyzing career trajectory vectors..."}
                        </AlertDescription>
                    </Alert>
                </div>

                {/* Action Plan */}
                <Card className="col-span-full md:col-span-2 border-slate-800 bg-slate-900/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-green-400" /> Recommended Actions ({aiAnalysis ? 'Personalized' : 'Standard'})
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {missingSkills.slice(0, 3).map((skill: string, i: number) => {
                            const resources = getRecommendedResources(skill)
                            return (
                                <div key={i} className="space-y-3 p-4 rounded-lg bg-black/20 border border-slate-800 hover:border-slate-700 transition-colors">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-cyan-100">{skill}</span>
                                            <Badge className="bg-red-950/30 text-red-400 border-red-900/50 hover:bg-red-900/40">Critical Gap</Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        {resources.map((res: any, idx: number) => (
                                            <a key={idx} href={res.link} target="_blank" rel="noopener noreferrer"
                                                className="block group p-2 rounded bg-slate-800/50 hover:bg-slate-800 border border-transparent hover:border-cyan-500/30 transition-all">
                                                <div className="flex justify-between items-start">
                                                    <div className="max-w-[90%]">
                                                        <div className="text-sm font-medium text-slate-300 group-hover:text-cyan-300 truncate">{res.title}</div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                                            <span className="bg-slate-900 px-1 rounded text-slate-400">{res.platform}</span>
                                                            <span className="capitalize">{res.type}</span>
                                                        </div>
                                                    </div>
                                                    <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-cyan-400" />
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}
