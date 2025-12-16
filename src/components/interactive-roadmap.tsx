"use client"

import { useState } from "react"
import { COURSE_DATABASE, Topic } from "@/lib/course-data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, CheckCircle } from "lucide-react"

export function InteractiveRoadmap() {
    const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

    // Custom Flowchart Layout using CSS Grid/Flex for simplicity
    // We mimic the "Full Stack" path from the screenshot:
    // HTML -> CSS -> JS ---> React
    //                   |-> Node.js

    const handleTopicClick = (id: string) => {
        const topic = COURSE_DATABASE[id]
        if (topic) setSelectedTopic(topic)
    }

    return (
        <div className="w-full relative py-10 overflow-x-auto">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative min-w-[800px] flex flex-col items-center gap-12">

                {/* Level 1: Fundamentals */}
                <div className="flex gap-8 items-center">
                    <RoadmapNode id="html" onClick={handleTopicClick} />
                    <ConnectorLine />
                    <RoadmapNode id="css" onClick={handleTopicClick} />
                    <ConnectorLine />
                    <RoadmapNode id="js" onClick={handleTopicClick} />
                </div>

                {/* Connector Down */}
                <div className="w-px h-12 bg-cyan-500/50" />

                {/* Level 2: Specialization */}
                <div className="flex gap-16 items-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-sm font-bold text-cyan-400">FRONTEND</div>
                        <RoadmapNode id="react" onClick={handleTopicClick} />
                    </div>

                    <div className="w-px h-12 bg-slate-700" /> {/* Separator */}

                    <div className="flex flex-col items-center gap-4">
                        <div className="text-sm font-bold text-yellow-400">BACKEND</div>
                        {/* Mock Node for Node.js (assuming we add nodejs to DB or reuse Docker for demo) */}
                        <RoadmapNode id="docker" label="Docker (DevOps)" onClick={handleTopicClick} />
                    </div>
                </div>

                {/* Connector Down */}
                <div className="w-px h-12 bg-purple-500/50" />

                {/* Level 3: Advanced */}
                <div className="flex gap-8 items-center">
                    <RoadmapNode id="kubernetes" onClick={handleTopicClick} />
                </div>

            </div>

            {/* Resource Sidebar (Sheet) */}
            <Sheet open={!!selectedTopic} onOpenChange={() => setSelectedTopic(null)}>
                <SheetContent className="bg-slate-950 border-l border-slate-800 text-slate-50 w-[400px]">
                    {selectedTopic && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="text-2xl text-white font-bold flex items-center gap-2">
                                    {selectedTopic.label}
                                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/30">Essential</Badge>
                                </SheetTitle>
                                <SheetDescription className="text-slate-400">
                                    {selectedTopic.description}
                                </SheetDescription>
                            </SheetHeader>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Curated Resources</h3>
                                    <div className="space-y-3">
                                        {selectedTopic.resources.map((res, i) => (
                                            <div key={i} className="group flex items-start justify-between p-3 rounded-lg border border-slate-800 bg-slate-900/50 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer">
                                                <div>
                                                    <div className="font-bold text-cyan-200 group-hover:text-cyan-400">{res.title}</div>
                                                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                        <span className="bg-slate-950 px-1 rounded">{res.platform}</span>
                                                        <span>{res.type}</span>
                                                    </div>
                                                </div>
                                                <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-cyan-400" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-800">
                                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
                                        <CheckCircle className="mr-2 h-4 w-4" /> Mark as Complete
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

function RoadmapNode({ id, label, onClick }: { id: string, label?: string, onClick: (id: string) => void }) {
    const displayLabel = label || COURSE_DATABASE[id]?.label || id
    return (
        <button
            onClick={() => onClick(id)}
            className="relative px-6 py-3 rounded-lg bg-slate-900 border-2 border-slate-700 hover:border-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] hover:-translate-y-1 transition-all z-10"
        >
            <span className="font-bold text-slate-200">{displayLabel}</span>
            {/* Connector Dot */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-500" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-500" />
        </button>
    )
}

function ConnectorLine() {
    return <div className="w-16 h-0.5 bg-slate-700" />
}
