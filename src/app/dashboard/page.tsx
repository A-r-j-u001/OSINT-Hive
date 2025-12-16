"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OsintLogs } from "@/components/osint-logs"
import { Search, User, Zap } from "lucide-react"

export default function DashboardPage() {
    // State for real user data
    const [userProfile, setUserProfile] = useState<any>(null)

    useEffect(() => {
        // Simulate fetching from Supabase/LocalStorage after onboarding
        const stored = localStorage.getItem('userProfile')
        if (stored) {
            setUserProfile(JSON.parse(stored))
        }
    }, [])

    const userName = userProfile?.name || "Candidate"
    const userSkills = userProfile?.skills || ["Python", "React", "Node.js"] // Fallback

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Top Bar */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl tracking-tighter flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        OSINT-HIVE <span className="text-xs text-slate-500 font-normal border border-slate-800 px-2 py-0.5 rounded">V1.0</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-slate-400 hover:text-white"><Search className="w-4 h-4 mr-2" /> Search</Button>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center border border-slate-700">
                            <User className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Welcome Section */}
                <div className="col-span-full mb-4">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back, <span className="text-cyan-400">{userName}</span></h1>
                    <p className="text-slate-400">System Status: <span className="text-green-400 font-mono">ONLINE</span> | OSINT Spider: <span className="text-green-400 font-mono">ACTIVE</span></p>
                    <div className="mt-4 flex gap-2">
                        {userSkills.map((skill: string, i: number) => (
                            <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Algorithm Picks */}
                <div className="col-span-2 space-y-6">
                    <Card className="border-slate-800 bg-slate-900/40">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-500" /> Algorithm Picks (Min-Heap)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold">UD</div>
                                            <div>
                                                <div className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">User Defined Mentor {i + 1}</div>
                                                <div className="text-xs text-slate-500">SDE-II @ TechCorp</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400 font-bold">{98 - (i * 5)}%</div>
                                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Match</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Live Logs */}
                <div className="col-span-1">
                    <OsintLogs />
                </div>

            </main>
        </div>
    )
}
