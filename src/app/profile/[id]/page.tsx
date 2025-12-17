import { MOCK_DB } from "@/lib/mock-data";
import { CareerTimeline } from "@/components/profile/CareerTimeline";
import { GapAnalysis } from "@/components/analytics/GapAnalysis";
import { StartConnection } from "@/components/connection-graph";
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: PageProps) {
    const { id } = await params;

    // FETCH REAL PROFILE DATA
    const profile = MOCK_DB.find(p => p.id === id);

    // Fallback if not found (though usually we'd 404)
    const name = profile ? profile.name : id.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    const role = profile?.role || "Unknown Role";
    const skills = profile?.skills || [];
    const roadmap = profile?.roadmap || [];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 font-mono p-6">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
                    <p className="text-slate-400">Target Mentor Profile</p>
                </div>
                <Link href="/dashboard">
                    <Button variant="outline" className="border-slate-700 text-slate-400 hover:bg-slate-800">
                        &lt; Back to Dashboard
                    </Button>
                </Link>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CareerTimeline profileName={name} roadmap={roadmap} />

                <div className="space-y-8">
                    <GapAnalysis
                        targetName={name}
                        targetRole={role}
                        targetSkills={skills}
                    />

                    {/* Connection Graph */}
                    <StartConnection
                        targetName={name}
                        targetRole={role}
                    />
                </div>
            </div>
        </div>
    );
}
