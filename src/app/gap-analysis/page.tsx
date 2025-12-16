"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, AlertTriangle, BookOpen } from "lucide-react"

export default function GapAnalysisPage() {
    const [userSkills, setUserSkills] = useState<string[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('userProfile')
        if (stored) {
            const profile = JSON.parse(stored)
            setUserSkills(profile.skills || [])
        }
    }, [])

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center">
            <header className="w-full max-w-5xl mb-8 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Gap Analysis Lab <span className="text-slate-500 font-normal">Vector Space Comparison</span></h1>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-sm text-slate-400">Targeting Role</div>
                        <div className="font-bold text-cyan-400">SDE-II @ Microsoft</div>
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
                            MISSING
                        </div>
                    </div>

                    {/* Mentor Vector */}
                    <div className="z-10 text-center space-y-4">
                        <div className="h-32 w-32 rounded-full border-4 border-cyan-500 bg-cyan-900/20 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            <span className="text-xl font-bold text-cyan-100">ROHAN DAS</span>
                            <span className="text-xs text-cyan-400">Mentor</span>
                        </div>
                        <div className="bg-cyan-950/50 rounded-lg p-3 text-left w-48 text-sm space-y-1 border border-cyan-500/30">
                            <div className="text-cyan-400 text-xs uppercase font-bold tracking-wider mb-1">Target Skills</div>
                            <div>• Python</div>
                            <div className="font-bold text-cyan-300">• DOCKER</div>
                            <div className="font-bold text-cyan-300">• KUBERNETES</div>
                        </div>
                    </div>
                </div>

                {/* Intelligent Recommendation */}
                <div className="col-span-full">
                    <Alert className="border-cyan-500/50 bg-cyan-950/10">
                        <AlertTriangle className="h-4 w-4 text-cyan-400" />
                        <AlertTitle className="text-cyan-400">Gap Detected</AlertTitle>
                        <AlertDescription className="text-slate-300 mt-2">
                            To match this mentor&apos;s trajectory at Year 2, you are missing <strong>Containerization</strong> skills.
                            The vector distance is significant (0.42).
                        </AlertDescription>
                    </Alert>
                </div>

                {/* Action Plan */}
                <Card className="col-span-full md:col-span-2 border-slate-800 bg-slate-900/30">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-green-400" /> Recommended Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Course: Docker for Beginners</span>
                                <span className="text-slate-400">High Priority</span>
                            </div>
                            <Progress value={0} className="h-2 bg-slate-800" />
                            <Button size="sm" className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300">Add to Learning Path</Button>
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}
