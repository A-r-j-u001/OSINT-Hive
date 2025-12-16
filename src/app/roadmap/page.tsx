"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Briefcase, Calendar, Award } from "lucide-react"
import { InteractiveRoadmap } from "@/components/interactive-roadmap"

// Mock Data matching the wireframe
const roadmapData = [
    { year: "2021", type: "experience", title: "Interned at 'TechStart'", description: "Learned Node.js and basic API design.", icon: Briefcase },
    { year: "2022", type: "project", title: "Open Source Contributor", description: "Contributed to 3 repos. 500+ commits. (GitHub Link)", icon: Award },
    { year: "2023", type: "cert", title: "AWS Cloud Practitioner", description: "Validated cloud skills.", icon: CheckCircle },
    { year: "2025", type: "current", title: "SDE-II @ Microsoft", description: "Current Role. Focusing on Scalability.", icon: Briefcase },
]

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 p-6 flex flex-col items-center">
            <header className="w-full max-w-3xl mb-12">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="h-6 w-6 text-cyan-400" />
                    Parsed Career Timeline <span className="text-slate-500 font-normal ml-2">Rohan Das</span>
                </h1>
                <div className="mt-2 text-green-400 text-sm font-mono flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" /> Confidence Score: 98% (Entity Extraction Successful)
                </div>
            </header>

            <div className="w-full max-w-3xl relative border-l border-slate-800 ml-4 md:ml-0 pl-8 md:pl-0">
                {/* Vertical Line for Desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

                <div className="space-y-12">
                    {/* Interactive Roadmap V2 */}
                    <div className="w-full">
                        <h2 className="text-xl font-bold text-white mb-6">Career Mastery Path</h2>
                        <Card className="border-slate-800 bg-slate-900/30">
                            <CardContent className="p-0 overflow-hidden">
                                <InteractiveRoadmap />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Original Timeline (Hidden/Condensed or kept as history) */}
                    <div className="opacity-50 hover:opacity-100 transition-opacity">
                        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">Historical Timeline</h3>
                        {roadmapData.map((item, i) => {
                            const isEven = i % 2 === 0
                            return (
                                <div key={i} className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""} gap-8`}>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-[-37px] md:left-1/2 md:-translate-x-1/2 h-4 w-4 rounded-full bg-slate-950 border-2 border-cyan-500 z-10" />

                                    {/* Check if desktop, half width */}
                                    <div className="w-full md:w-1/2">
                                        <Card className={`border-slate-800 bg-slate-900/30 hover:border-cyan-500/30 transition-all ${item.type === 'current' ? 'border-cyan-500/50 bg-cyan-950/10' : ''}`}>
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="outline" className="border-slate-700 text-slate-400 mb-2">{item.year}</Badge>
                                                    <item.icon className="h-5 w-5 text-cyan-500" />
                                                </div>
                                                <CardTitle className="text-base text-white">{item.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-slate-400">{item.description}</p>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Spacer for the other side */}
                                    <div className="hidden md:block w-1/2" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex gap-4">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Save to Favorites</Button>
                <Button variant="outline" className="border-slate-800 text-slate-400">Compare with My Timeline</Button>
            </div>
        </div>
    )
}
