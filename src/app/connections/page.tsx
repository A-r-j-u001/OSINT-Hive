"use client"

import { ConnectionGraph } from "@/components/connection-graph"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, ArrowRight } from "lucide-react"

export default function ConnectionPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center">
            <header className="w-full max-w-4xl mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Network className="h-6 w-6 text-yellow-400" />
                    Connection Graph <span className="text-slate-500 font-normal text-sm ml-2">Breadth-First Search (BFS)</span>
                </h1>
            </header>

            <div className="w-full max-w-4xl grid gap-6">
                <div className="h-[400px]">
                    <ConnectionGraph />
                </div>

                <Card className="border-slate-800 bg-slate-900/30">
                    <CardHeader>
                        <CardTitle className="text-base text-slate-300">Pathfinding Result</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-blue-400">YOU (Student)</div>
                            </div>
                            <ArrowRight className="text-slate-600" />
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-yellow-400">AMAN (Alumni)</div>
                                <div className="text-xs text-slate-500">Degree: 1</div>
                            </div>
                            <ArrowRight className="text-slate-600" />
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-cyan-400">ROHAN (Target)</div>
                                <div className="text-xs text-slate-500">Degree: 2</div>
                            </div>
                        </div>

                        <div className="rounded bg-yellow-500/10 border border-yellow-500/30 p-3 text-sm text-yellow-200">
                            <strong>Strategy:</strong> Request an introduction through Aman. Direct outreach has 12% probability; Intro has 68%.
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">Copy Intro Message</Button>
                            <Button variant="outline" className="border-slate-800 text-slate-400">View Alternative Path</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
