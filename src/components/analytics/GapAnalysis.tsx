
"use client"

import { Card } from "@/components/ui/card";
import { ArrowLeftRight, AlertTriangle, Lightbulb } from "lucide-react";

interface GapAnalysisProps {
    targetName?: string;
    targetRole?: string;
    targetSkills?: string[];
}

export function GapAnalysis({ targetName = "Unknown Mentor", targetRole = "Mentor", targetSkills = [] }: GapAnalysisProps) {
    return (
        <div className="font-mono text-slate-300">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
                <div className="flex items-center gap-2 border-b border-dashed border-slate-700 pb-4 mb-6">
                    <span className="text-cyan-400 font-bold">[Gap Analysis]</span>
                    <span>Comparing: YOU vs. {targetName.toUpperCase()} (Target Mentor)</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">

                    {/* Column 1: YOU */}
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-slate-500 mb-2">YOUR VECTOR (Current)</div>
                        <div className="border border-slate-700 bg-slate-950 p-4 rounded text-left space-y-2 h-full">
                            <div className="text-xs text-slate-500 mb-2">Skills:</div>
                            <div className="text-sm">- Python</div>
                            <div className="text-sm">- React.js</div>
                            <div className="text-sm">- HTML/CSS</div>
                        </div>
                    </div>

                    {/* Column 2: GAP */}
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-xs text-slate-500">THE GAP ZONE</div>
                        <div className="flex items-center gap-2 w-full justify-center">
                            <div className="h-px bg-slate-700 flex-1" />
                            <ArrowLeftRight className="h-4 w-4 text-slate-500" />
                            <div className="h-px bg-slate-700 flex-1" />
                        </div>

                        <div className="border border-red-500/30 bg-red-900/10 text-red-400 px-4 py-6 rounded font-bold text-center w-full">
                            MISS<br />ING<br />
                            <span className="text-2xl mt-2 block">[!!]</span>
                        </div>

                        <div className="flex items-center gap-2 w-full justify-center">
                            <div className="h-px bg-slate-700 flex-1" />
                            <ArrowLeftRight className="h-4 w-4 text-slate-500" />
                            <div className="h-px bg-slate-700 flex-1" />
                        </div>
                    </div>

                    {/* Column 3: MENTOR */}
                    <div className="flex flex-col gap-2">
                        <div className="text-sm text-slate-500 mb-2">MENTOR'S VECTOR (At Your Age)</div>
                        <div className="border border-slate-700 bg-slate-950 p-4 rounded text-left space-y-2 h-full">
                            <div className="text-xs text-slate-500 mb-2">Skills:</div>
                            {/* Render up to 4 skills dynamically */}
                            {targetSkills.slice(0, 4).map((skill, i) => (
                                <div key={i} className="font-bold text-green-400 animate-pulse">- {skill.toUpperCase()}</div>
                            ))}
                            {targetSkills.length === 0 && <div className="text-slate-500 italic">No skills listed</div>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendation Box */}
            <div className="border border-slate-700 bg-emerald-900/10 rounded-lg p-6">
                <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3">
                    <Lightbulb className="h-4 w-4" />
                    [ INTELLIGENT RECOMMENDATION ]
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>ALERT: To match this mentor's trajectory, you need <span className="font-bold text-white">'Docker'</span>.</span>
                    </div>
                    <div className="flex gap-2 text-slate-300">
                        <span>&gt;</span>
                        <span>ACTION: Added "Docker for Beginners" to your learning path.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
