
"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, MoveDown } from "lucide-react";

interface ConnectionGraphProps {
  targetName?: string;
  targetRole?: string;
}

export function ConnectionGraph({ targetName = "Target Mentor", targetRole = "Mentor" }: ConnectionGraphProps) {
  const firstName = targetName.split(' ')[0].toUpperCase();

  return (
    <div className="font-mono text-slate-300">
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-2 border-b border-dashed border-slate-700 pb-4 mb-6">
          <span className="text-cyan-400 font-bold">[Connection Path]</span>
          <span>Goal: Connect with {targetName} ({targetRole})</span>
        </div>

        <div className="text-xs text-slate-500 mb-8 text-center">[ GRAPH VISUALIZATION (D3.js) ]</div>

        {/* Graph Visualization */}
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="flex items-center justify-between w-full px-4 md:px-12">
            {/* NODE: YOU */}
            <div className="flex flex-col items-center gap-2 text-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center font-bold text-green-400 text-xs">
                YOU
              </div>
              <div className="text-xs text-slate-500">[Student]</div>
            </div>

            {/* ARROW */}
            <div className="flex-1 border-t border-dashed border-slate-600 relative mx-4">
              <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-slate-600" />
            </div>

            {/* NODE: AMAN */}
            <div className="flex flex-col items-center gap-2 text-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center font-bold text-cyan-400 text-xs">
                AMAN
              </div>
              <div className="text-xs text-slate-500">[Alumni '23]</div>
            </div>

            {/* ARROW */}
            <div className="flex-1 border-t border-dashed border-slate-600 relative mx-4">
              <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-slate-600" />
            </div>

            {/* NODE: ROHAN (Target) */}
            <div className="flex flex-col items-center gap-2 text-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-purple-500 bg-purple-500/10 flex items-center justify-center font-bold text-purple-400 text-xs">
                {firstName}
              </div>
              <div className="text-xs text-slate-500">[Target]</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 -mt-2">
            <MoveDown className="h-4 w-4 text-slate-600" />
            <span className="text-xs text-slate-600">(Common Node)</span>
          </div>
        </div>

        {/* Pathfinding Result */}
        <div className="border border-slate-700 bg-slate-950 p-4 rounded-lg space-y-2 text-sm">
          <div className="text-slate-500 text-xs font-bold mb-2">[ PATHFINDING RESULT (BFS Algo) ]</div>
          <div>&gt; Degrees of Separation: <span className="text-white font-bold">2</span></div>
          <div>&gt; Direct connection unavailable.</div>
          <div className="text-green-400">&gt; OPTIMAL PATH: Ask Aman (your senior) to introduce you to {targetName.split(' ')[0]}.</div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 font-mono">
          [ Copy Intro Message for Aman ]
        </Button>
        <Button variant="outline" className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800 font-mono">
          [ Find Alternative Path ]
        </Button>
      </div>
    </div>
  );
}

// Re-export as StartConnection specifically if other components expect it, or update usages.
// The user asked for StartConnection to be reused or wrapped. I'll export it for now as an alias if needed.
export const StartConnection = ConnectionGraph; 
