"use client"

import { useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

const logs = [
    "> Initializing Spider...",
    "> Scanning GitHub API...",
    "> Found 3 PDF Resumes in: s3.amazon.com",
    "> Parsing Entities...",
    "> [SUCCESS] New lead: 'DevOps Engineer'",
    "> Source: Public Repo",
    "> Verifying SMTP...",
    "> [OK] mail.google.com response",
    "> Calculating Vector Match...",
    "> [UPDATE] Min-Heap rebalanced."
]

export function OsintLogs() {
    const [lines, setLines] = useState<string[]>([])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setLines(prev => [...prev, logs[i % logs.length]])
            i++
        }, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="rounded-lg border border-slate-800 bg-black p-4 font-mono text-xs text-green-500 shadow-inner shadow-green-900/10">
            <div className="mb-2 border-b border-slate-800 pb-2 text-slate-400">
                LIVE OSINT LOGS [PID: 4920]
            </div>
            <ScrollArea className="h-[300px]">
                {lines.map((line, k) => (
                    <div key={k} className="mb-1">{line}</div>
                ))}
                <div className="animate-pulse">_</div>
            </ScrollArea>
        </div>
    )
}
