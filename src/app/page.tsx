import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BackgroundParticles } from "@/components/ui/background-particles"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white selection:bg-cyan-500/20 relative overflow-hidden">

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-black to-black -z-20" />
      <BackgroundParticles />

      <main className="container flex flex-col items-center gap-6 px-4 py-16 text-center md:py-32">

        {/* Logo */}
        <div className="mb-4">
          <Image
            src="/OSINT_HIVE.svg"
            alt="OSINT-Hive Logo"
            width={280}
            height={224}
            className="drop-shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:drop-shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all"
            priority
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-3 py-1 text-sm text-slate-400 backdrop-blur-xl">
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 mr-2 animate-pulse"></span>
          Version 1.0 - Beta
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Career Blueprint</span>
          <br />
          Using Open Source Intelligence.
        </h1>

        {/* Subtitle */}
        <p className="max-w-[700px] text-lg text-slate-400 md:text-xl">
          Automated OSINT Spider & AI-driven Roadmap Engine. Connect with mentors who actually match your trajectory.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Stats / trust */}
        <div className="mt-12 grid grid-cols-3 gap-8 text-center text-slate-500">
          <div>
            <div className="text-2xl font-bold text-white">1.2M+</div>
            <div className="text-sm">Profiles Indexed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">0.02s</div>
            <div className="text-sm">Search Latency</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">98%</div>
            <div className="text-sm">Match Accuracy</div>
          </div>
        </div>

      </main>
    </div>
  )
}
