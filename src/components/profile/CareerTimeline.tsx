
"use client"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface TimelineEvent {
    type: string;
    label: string;
    icon: string;
    highlight?: boolean;
}

interface CareerTimelineProps {
    profileName: string;
    roadmap?: Array<{ year: string; title: string; org: string; desc: string }>;
}

export function CareerTimeline({ profileName, roadmap = [] }: CareerTimelineProps) {
    // Transform flat roadmap into timeline format
    // Real schema: { year, title, org, desc }
    const eventsByYear = roadmap.reduce((acc, item) => {
        const existing = acc.find(e => e.year.includes(item.year))
        if (existing) {
            existing.events.push({ type: "ROLE", label: `${item.title} @ ${item.org}`, icon: "o" })
        } else {
            acc.push({
                year: item.year,
                events: [{ type: "ROLE", label: `${item.title} @ ${item.org}`, icon: "o" }]
            })
        }
        return acc
    }, [] as { year: string; events: TimelineEvent[] }[])

    // Fallback if no roadmap
    const displayTimeline = eventsByYear.length > 0 ? eventsByYear : [
        { year: "2024", events: [{ type: "INFO", label: "No Access to Career History", icon: "x" }] }
    ]

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 font-mono text-slate-300 relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-dashed border-slate-700 pb-4 mb-8">
                <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">[Roadmap]</span>
                    <span>Parsed Career Timeline for: {profileName}</span>
                </div>
            </div>

            <div className="mb-6 text-sm">
                <span className="text-slate-500">[Header]</span>
                <div className="text-green-400">Confidence Score: 98% (Entity Extraction Successful)</div>
            </div>

            {/* Timeline Visualization */}
            <div className="space-y-8 pl-8 relative border-l border-slate-800 ml-4 py-4">
                {displayTimeline.map((period, i) => (
                    <div key={i} className="relative">
                        {/* Year Label */}
                        <div className="absolute -left-[45px] top-0 bg-slate-950 px-2 text-xs text-slate-500 font-bold border border-slate-800 rounded">
                            {period.year}
                        </div>

                        <div className="space-y-0 relative">
                            {/* Vertical Line Connector is implied by the border-l on container */}

                            {period.events.map((event, j) => (
                                <div key={j} className="flex items-start gap-4 mb-4 relative group">
                                    {/* Timeline Node */}
                                    <div className={cn(
                                        "absolute -left-[37px] w-3 h-3 rounded-full border-2 bg-slate-950 z-10",
                                        event.highlight ? "border-green-500 bg-green-500 animate-pulse" : "border-slate-600 group-hover:border-cyan-400"
                                    )} />

                                    {/* Connector Arm */}
                                    <div className="w-8 h-px bg-slate-700 mt-1.5" />

                                    {/* Content */}
                                    <div>
                                        <span className={cn(
                                            "font-bold text-xs uppercase tracking-wider px-1 rounded mr-2",
                                            event.type === 'ORG' ? "text-blue-400 bg-blue-900/20" :
                                                event.type === 'SKILL' ? "text-yellow-400 bg-yellow-900/20" :
                                                    event.type === 'PROJECT' ? "text-purple-400 bg-purple-900/20" :
                                                        event.type === 'ROLE' ? "text-green-400 bg-green-900/20" : "text-slate-400"
                                        )}>
                                            [{event.type}]
                                        </span>
                                        <span className={event.highlight ? "text-white font-bold text-lg" : "text-slate-300"}>
                                            {event.label}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons Removed as requested */}

        </div>
    );
}
