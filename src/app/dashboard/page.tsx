"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { OsintLogs } from "@/components/osint-logs"
import { Search, User, Zap, Activity, Globe, Shield, Terminal, Edit, Layers } from "lucide-react"
import { EditProfileDialog } from "@/components/edit-profile-dialog"
import { supabase } from "@/lib/supabase"
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { BackgroundParticles } from "@/components/ui/background-particles"

export default function DashboardPage() {
    const [userProfile, setUserProfile] = useState<any>(null)
    const [recommendations, setRecommendations] = useState<any[]>([])
    // Upload State
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)


    const [stats, setStats] = useState({
        nodesScanned: 1240,
        threatLevel: "LOW",
        matchRate: 92
    })

    const fetchRecommendations = (profile: any) => {
        const query = profile?.role || profile?.skills?.[0] || 'Software'
        fetch(`/ api / search ? q = ${encodeURIComponent(query)} `)
            .then(res => res.json())
            .then(data => {
                setRecommendations(data.results.slice(0, 3))
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        const loadProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single()
                if (data && !error) {
                    const mapped = {
                        name: data.full_name,
                        skills: data.skills || [],
                        role: data.target_role,
                        experience: data.experience,
                        github: data.github_url,
                        linkedin: data.linkedin_url
                    }
                    setUserProfile(mapped)
                    fetchRecommendations(mapped)
                    return
                }
            }

            // Fallback to local storage (Legacy/Demo support)
            const stored = localStorage.getItem('userProfile')
            if (stored) {
                const parsed = JSON.parse(stored)
                setUserProfile(parsed)
                fetchRecommendations(parsed)
            } else {
                // Auto-initialize mock profile for demo
                const mockDefaults = {
                    name: "Candidate",
                    role: "Full Stack Developer",
                    skills: ["React", "Next.js", "TypeScript", "Node.js"],
                    experience: "3 Years",
                    github: "https://github.com/demo",
                    linkedin: "https://linkedin.com/in/demo"
                }
                setUserProfile(mockDefaults)
                fetchRecommendations(mockDefaults)
            }
        }
        loadProfile()
    }, [])

    const userName = userProfile?.name || "Candidate"
    const userRole = userProfile?.role || "Aspiring Engineer"
    const userSkills = userProfile?.skills || ["Python", "React", "Node.js"]

    const calculateMatchScore = (candidateSkills: string[]) => {
        if (!userSkills || userSkills.length === 0) return 10
        const normalizedUser = userSkills.map((s: string) => s.toLowerCase())
        const normalizedCandidate = candidateSkills.map((s: string) => s.toLowerCase())
        const intersection = normalizedCandidate.filter((s: string) => normalizedUser.some((u: string) => u.includes(s) || s.includes(u)))
        const union = new Set([...normalizedUser, ...normalizedCandidate])
        const score = Math.round((intersection.length / union.size) * 100)
        return Math.min(Math.max(score + 20, 10), 98)
    }

    // --- Resume Upload Logic ---
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return
        setUploading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            const mockParsedProfile = {
                full_name: "Agent User",
                skills: ["React", "TypeScript", "OSINT", "Node.js", "Cybersecurity"],
                experience: "3 Years",
                target_role: "Intelligence Engineer",
                updated_at: new Date().toISOString()
            }

            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    full_name: mockParsedProfile.full_name,
                    target_role: mockParsedProfile.target_role,
                    skills: mockParsedProfile.skills,
                    experience: mockParsedProfile.experience,
                    updated_at: new Date().toISOString()
                })
            }
            localStorage.setItem('userProfile', JSON.stringify(mockParsedProfile))

            setUserProfile(mockParsedProfile)
            fetchRecommendations(mockParsedProfile)
        } catch (error: any) {
            alert("Upload failed: " + error.message)
        } finally {
            setUploading(false)
        }
    }

    const isProfileEmpty = !userProfile



    // --- MAIN DASHBOARD ---
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative selection:bg-cyan-500/30">
            <BackgroundParticles />

            {/* Ambient Background */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/80 to-slate-950 pointer-events-none -z-10" />

            {/* Header */}
            <header className="border-b border-white/5 bg-slate-900/30 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/OSINT_HIVE.svg"
                                alt="OSINT-Hive Logo"
                                width={140}
                                height={112}
                                className="h-10 w-auto"
                            />
                            <span className="text-[10px] uppercase font-mono bg-cyan-950/50 text-cyan-400 border border-cyan-800 px-1.5 py-0.5 rounded">Beta</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 mr-6 text-sm font-mono text-slate-400">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                <span>NET: ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4" />
                                <span>LATENCY: 24ms</span>
                            </div>
                        </div>

                        {/* GLOBAL_SEARCH Removed */}

                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-[1px]">
                            <div className="h-full w-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                                <User className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto p-6 space-y-6">

                {/* Hero / Welcome */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-light text-white mb-2">Welcome back, <span className="font-bold text-cyan-400">{userName}</span></h1>
                        <p className="text-slate-400 max-w-2xl font-light text-lg">
                            Your professional trajectory is currently tracking in the <span className="text-green-400">top 8%</span> of similar profiles.
                            New intelligence suggests focus on <span className="text-white font-mono bg-white/5 px-2 py-0.5 rounded">{userSkills[0] || 'Tech'}</span>.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/search?mode=github">
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border border-white/10 shadow-[0_0_15px_rgba(147,51,234,0.5)] font-bold tracking-wide">
                                <Search className="h-4 w-4 mr-2" /> FIND MENTOR
                            </Button>
                        </Link>
                        <EditProfileDialog
                            initialData={{
                                name: userName,
                                role: userRole,
                                skills: userSkills,
                                experience: userProfile?.experience || "0 Years",
                                github: userProfile?.github,
                                linkedin: userProfile?.linkedin
                            }}
                            onSave={async (newData) => {
                                // Logic duped for brevity - should refactor to context in future
                                const updated = { ...userProfile, ...newData }
                                setUserProfile(updated)
                                // DB Update would go here
                                localStorage.setItem('userProfile', JSON.stringify(updated))
                                fetchRecommendations(updated)
                            }}
                        />

                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* COL 1: IDENTITY & STATS (3 Columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Identity Card */}
                        <Card className="bg-slate-900/60 border-white/10 backdrop-blur-md overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />
                            <CardContent className="pt-8 text-center relative z-10">
                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4 relative group">
                                    <User className="h-10 w-10 text-white/80 group-hover:scale-110 transition-transform" />
                                    <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{userName}</h2>
                                <p className="text-sm text-cyan-400 font-mono mb-4">{userRole}</p>

                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {userSkills.slice(0, 4).map((s: string, i: number) => (
                                        <span key={i} className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                    <div>
                                        <div className="text-2xl font-bold text-white">12</div>
                                        <div className="text-[10px] uppercase text-slate-500 tracking-wider">Profile Hits</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-white">98%</div>
                                        <div className="text-[10px] uppercase text-slate-500 tracking-wider">Visibility</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Mini Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors group">
                                <Shield className="h-6 w-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-xs text-slate-500 uppercase">Risk Level</div>
                                <div className="font-bold text-white">{stats.threatLevel}</div>
                            </div>
                            <div className="bg-slate-900/40 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                <Globe className="h-6 w-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                                <div className="text-xs text-slate-500 uppercase">Scan Depth</div>
                                <div className="font-bold text-white">{stats.nodesScanned}</div>
                            </div>
                        </div>
                    </div>

                    {/* COL 2: MAIN FEED (6 Columns) */}
                    <div className="lg:col-span-6 space-y-6">

                        {/* Map / Visualization Placeholder */}
                        <div className="h-48 rounded-2xl bg-slate-900/80 border border-white/5 relative overflow-hidden flex items-center justify-center group">
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
                            <div className="text-center">
                                <Activity className="h-8 w-8 text-cyan-500/50 mx-auto mb-2 group-hover:text-cyan-400 transition-colors" />
                                <p className="text-sm font-mono text-slate-500">NETWORK GRAPH VISUALIZATION ACTIVE</p>
                                <p className="text-xs text-slate-600">324 Nodes Connected</p>
                            </div>
                        </div>

                        {/* Algo Picks */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-cyan-400" />
                                    Live Opportunities
                                </h3>
                                <div className="text-xs font-mono text-cyan-500 animate-pulse">UPDATING...</div>
                            </div>

                            <div className="space-y-3">
                                {recommendations.length > 0 ? (
                                    recommendations.map((rec: any, i: number) => {
                                        const matchScore = calculateMatchScore(rec.metadata?.skills || [])
                                        const href = rec.link || `/ profile / ${rec.metadata?.id || 'unknown'} `

                                        return (
                                            <Link key={i} href={href}>
                                                <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 hover:bg-slate-800/60 hover:border-cyan-500/40 transition-all cursor-pointer group relative overflow-hidden">
                                                    <div className="flex justify-between items-start relative z-10">
                                                        <div className="flex gap-4">
                                                            <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:text-white group-hover:bg-cyan-600 transition-colors">
                                                                {rec.title.substring(0, 1)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{rec.title}</h4>
                                                                <div className="flex gap-2 mt-1">
                                                                    <span className="text-xs font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-400">{(rec.metadata?.company || 'Corporation').toUpperCase()}</span>
                                                                    <span className="text-xs font-mono bg-white/5 px-1.5 py-0.5 rounded text-slate-400">{(rec.metadata?.location || 'Remote').toUpperCase()}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold italic text-white/90 group-hover:text-cyan-400">{matchScore}%</div>
                                                            <div className="text-[10px] text-slate-500 uppercase">Harmony</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                ) : (
                                    <div className="text-center py-10">
                                        <Loader2 className="h-8 w-8 text-cyan-500 animate-spin mx-auto opacity-50" />
                                        <p className="text-slate-500 mt-2 font-mono text-sm">Aggregating signal...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* COL 3: RESUME ANALYZER (3 Columns) */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm h-[500px] flex flex-col">
                            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                                    <FileText className="h-3 w-3" />
                                    RESUME_ANALYZER
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="h-2 w-2 rounded-full bg-green-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-blue-500/20" />
                                    <div className="h-2 w-2 rounded-full bg-purple-500/20" />
                                </div>
                            </div>

                            <div className="p-6 flex flex-col items-center justify-center flex-1 space-y-4 relative group">
                                <input
                                    type="file"
                                    accept=".pdf,.docx"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-50 w-full h-full"
                                    onChange={handleFileChange}
                                />

                                {file ? (
                                    <>
                                        <div className="h-16 w-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                                            <CheckCircle className="h-8 w-8 text-cyan-400 animate-pulse" />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <h3 className="text-white font-bold truncate max-w-[200px]">{file.name}</h3>
                                            <p className="text-xs text-green-400 font-mono">READY FOR ANALYSIS</p>
                                        </div>
                                        <Button
                                            // Prevent default on click to avoid double-triggering input if clicked directly
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleUpload() }}
                                            disabled={uploading}
                                            className="bg-cyan-600 hover:bg-cyan-500 text-white w-full max-w-[200px] font-bold z-50 relative pointer-events-auto"
                                        >
                                            {uploading ? (
                                                <><Loader2 className="h-4 w-4 animate-spin mr-2" /> PROCESSING...</>
                                            ) : (
                                                <><Zap className="h-4 w-4 mr-2" /> INITIATE SCAN</>
                                            )}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="h-16 w-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-dashed border-slate-600 group-hover:border-cyan-500/50 transition-colors">
                                            <Upload className="h-6 w-6 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <h3 className="text-slate-200 font-bold group-hover:text-cyan-400 transition-colors">Upload Resume</h3>
                                            <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
                                                Drag & drop PDF to calibrate search with candidate DNA
                                            </p>
                                        </div>
                                        {/* Set pointer-events-none so click passes through to the input behind it */}
                                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 w-full max-w-[200px] pointer-events-none">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Select File
                                        </Button>
                                    </>
                                )}
                            </div>

                            {/* Decorative Analysis Footer */}
                            <div className="p-3 border-t border-white/5 bg-slate-950/30">
                                <div className="flex justify-between text-[10px] font-mono text-slate-600">
                                    <span>PARSER: IDLE</span>
                                    <span>V.2.0.4</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
