
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Shield, Zap, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock Data for "Min-Heap" Sort
const TOP_MATCHES = [
    { id: 1, name: "Rahul V.", role: "Internal Lead", match: 98, source: "Internal", skills: ["Python", "AWS"], type: "Alumni" },
    { id: 2, name: "Sarah J.", role: "DevOps Eng", match: 92, source: "Internal", skills: ["Docker", "K8s"], type: "Peer" },
    { id: 3, name: "Amit K.", role: "Backend Dev", match: 89, source: "Internal", skills: ["Java", "Spring"], type: "Alumni" },
];

// Mock Logs for OSINT Spider
const MOCK_LOGS = [
    "> Initializing Spider...",
    "> Scanning GitHub API...",
    "> Found 3 PDF Resumes in: s3.amazon.com",
    "> Parsing Entities...",
    "> [SUCCESS] New lead: 'DevOps Engineer'",
    "> (Source: Public Repo)",
    "> Verifying SMTP for candidate...",
    "> [WARN] Rate limit approaching...",
    "> Switching proxy...",
    "> [SUCCESS] Email verified: r****@gmail.com"
];

export function CommandCenter() {
    const [logs, setLogs] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Simulate live logs
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < MOCK_LOGS.length) {
                setLogs(prev => [...prev, MOCK_LOGS[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen bg-slate-950 text-slate-50 font-mono">
            {/* Top Bar */}
            <header className="flex items-center justify-between border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-cyan-400" />
                    <h1 className="text-xl font-bold tracking-wider text-cyan-400">[=] CareerOSINT</h1>
                </div>

                <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-md px-4 py-2 w-1/3">
                    <Search className="h-4 w-4 text-slate-500" />
                    <input
                        className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-300 placeholder:text-slate-600"
                        placeholder="Search 'Data Scientist'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <User className="h-4 w-4" />
                    <span>User: You</span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Zap className="h-32 w-32" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Welcome back, User.</h2>
                <div className="flex items-center gap-4">
                    <p className="text-slate-400">Current Vector Match:</p>
                    <Badge variant="outline" className="text-green-400 border-green-400 text-lg px-3 py-1">78% (vs Market Standard)</Badge>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

                {/* COL 1: Algorithm Picks */}
                <Card className="bg-slate-900 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-cyan-300">
                            <Zap className="h-5 w-5" />
                            ALGORITHM PICKS (Min-Heap Sort)
                        </CardTitle>
                        <CardDescription>Top internal candidates matching your vector.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {TOP_MATCHES.map((match, idx) => (
                            <Link href="/profile/rohan-das" key={match.id}> {/* Hardcoded link for demo */}
                                <div className="group flex items-center justify-between p-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-lg text-slate-200">{idx + 1}. {match.name}</span>
                                            <Badge className="bg-slate-700 text-slate-300">{match.role}</Badge>
                                        </div>
                                        <div className="text-xs text-slate-400 flex gap-2">
                                            <span>[TF-IDF: High]</span>
                                            <span>[Skills: {match.skills.join(', ')}]</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-green-400">{match.match}%</div>
                                        <div className="text-xs text-slate-500">Match</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>

                {/* COL 2: Live OSINT Log */}
                <Card className="bg-black border-slate-800 font-mono text-xs">
                    <CardHeader className="border-b border-slate-900 py-3">
                        <CardTitle className="text-emerald-500 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Terminal className="h-4 w-4" />
                            LIVE OSINT LOG
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[300px] w-full p-4">
                            <div className="space-y-1">
                                {logs.map((log, i) => (
                                    <div key={i} className="text-slate-300 animate-in fade-in slide-in-from-left-2 duration-300">
                                        <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                        {log.includes("[SUCCESS]") ? (
                                            <span className="text-green-400">{log}</span>
                                        ) : log.includes("[WARN]") ? (
                                            <span className="text-yellow-400">{log}</span>
                                        ) : (
                                            <span>{log}</span>
                                        )}
                                    </div>
                                ))}
                                <div className="animate-pulse text-emerald-500/50">_</div>
                            </div>
                        </ScrollArea>
                        <div className="p-2 border-t border-slate-900 bg-slate-900/20 text-center">
                            <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-cyan-400">
                                View Full Logs
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <Link href="/search" className="contents">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-slate-700 hover:border-cyan-500 hover:bg-slate-800">
                        <Search className="h-6 w-6 text-cyan-400" />
                        <span className="font-bold">Intel Search</span>
                        <span className="text-xs text-slate-500">Deep Web Spider</span>
                    </Button>
                </Link>
                {/* Repurposed 2nd button to point to a specific high-match profile for demo flow */}
                <Link href="/profile/rohan-das" className="contents">
                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 border-slate-700 hover:border-purple-500 hover:bg-slate-800">
                        <Zap className="h-6 w-6 text-purple-400" />
                        <span className="font-bold">Latest Match</span>
                        <span className="text-xs text-slate-500">Rohan Das (94%)</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
}
