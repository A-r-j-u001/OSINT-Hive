
"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Database, Github, User, Upload } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<'internal' | 'osint' | 'linkedin' | 'github'>((searchParams.get('mode') as any) || 'osint');
  const [keywords, setKeywords] = useState(searchParams.get('q') || "");
  const [experience, setExperience] = useState(searchParams.get('exp') || "any");
  const [company, setCompany] = useState(searchParams.get('co') || "any");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // GitHub Specific Filters
  const [filters, setFilters] = useState({
    lang: searchParams.get('lang') || '',
    status: searchParams.get('status') || '',
    followers: searchParams.get('followers') || '',
    contrib: searchParams.get('contrib') || '',
    repos: searchParams.get('repos') || '',
    stars: searchParams.get('stars') || ''
  });

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  // Initial Sync Removed (Handled by useState default)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (keywords) params.append('q', keywords)
    if (experience !== 'any') params.append('exp', experience)
    if (company !== 'any') params.append('co', company)
    params.append('mode', mode) // Send mode to API

    // Append GitHub / LinkedIn Filters
    if (mode === 'github' || mode === 'linkedin') {
      if (filters.lang) params.append('lang', filters.lang)
      if (filters.status) params.append('status', filters.status)
      if (filters.followers) params.append('followers', filters.followers)
      if (filters.contrib) params.append('contrib', filters.contrib)
      if (filters.repos) params.append('repos', filters.repos)
      if (filters.stars) params.append('stars', filters.stars)
    }

    // Update Browser URL seamlessly
    router.replace(`/search?${params.toString()}`, { scroll: false })

    fetch(`/api/search?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.results || [])
        setTotalCount(data.meta?.total || 0)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [keywords, experience, company, mode, router, filters]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 p-4 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
              &lt; Back to Dashboard
            </Button>
          </Link>
          <Link href="/" className="flex items-center">
            <Image
              src="/OSINT_HIVE.svg"
              alt="OSINT-Hive Logo"
              width={100}
              height={80}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <Badge variant="outline" className="text-purple-400 border-purple-400">Mode: ADVANCED</Badge>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <aside className="w-96 border-r border-slate-800 p-6 space-y-8 hidden md:block overflow-y-auto h-[calc(100vh-80px)] no-scrollbar">

          {/* COMMON FILTERS (Internal / OSINT) - Hide in GitHub & LinkedIn Mode */}
          {mode !== 'github' && mode !== 'linkedin' && (
            <>
              <div>
                <h3 className="text-slate-500 text-xs font-bold mb-4 tracking-wider">FILTERS</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400">TECH STACK (Skills/Role)</label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        className="w-full bg-slate-900 border border-slate-700 rounded py-2 pl-8 pr-2 text-sm text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-600"
                        placeholder="e.g. React, DevOps..."
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="h-px bg-slate-800 my-2" />
                  <div className="flex items-center gap-2">
                    <Checkbox id="github" defaultChecked className="border-slate-600 data-[state=checked]:bg-cyan-500" />
                    <label htmlFor="github" className="text-sm">GitHub</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="pdfs" defaultChecked className="border-slate-600 data-[state=checked]:bg-cyan-500" />
                    <label htmlFor="pdfs" className="text-sm">PDFs</label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-slate-500 text-xs font-bold mb-4 tracking-wider">EXPERIENCE</h3>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="any">[ Any ]</option>
                  <option value="0-2">Entry Level (0-2 Yrs)</option>
                  <option value="3-5">Mid Senior (3-5 Yrs)</option>
                  <option value="5+">Senior (5+ Yrs)</option>
                </select>
              </div>

              <div>
                <h3 className="text-slate-500 text-xs font-bold mb-4 tracking-wider">COMPANY</h3>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-500"
                >
                  <option value="any">[ Any ]</option>
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Swiggy">Swiggy</option>
                  <option value="Zomato">Zomato</option>
                  <option value="Cred">Cred</option>
                  <option value="Razorpay">Razorpay</option>
                  <option value="Startup">Startup / Other</option>
                </select>
              </div>
            </>
          )}

          {/* LINKEDIN SPECIFIC FILTERS */}
          {mode === 'linkedin' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">

              {/* 1. Role / Occupation */}
              <div className="space-y-2">
                <label className="text-xs text-blue-400 font-bold tracking-wider">ROLE / OCCUPATION</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => updateFilter('status', e.target.value)}
                  value={filters.status || ""}
                >
                  <option value="">[ Any Role ]</option>
                  <option value="Student">Student</option>
                  <option value="Intern">Intern</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Senior Software Engineer">Senior Software Engineer</option>
                  <option value="Software Developer">Software Developer</option>
                  <option value="System Engineer">System Engineer</option>
                  <option value="Technical Lead">Technical Lead</option>
                  <option value="Architect">Architect</option>
                  <option value="Product Manager">Product Manager</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Business Analyst">Business Analyst</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Associate">Associate</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Manager">Manager</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Director">Director</option>
                  <option value="Founder">Founder</option>
                  <option value="Co-Founder">Co-Founder</option>
                  <option value="CEO">CEO</option>
                  <option value="CTO">CTO</option>
                </select>
              </div>

              {/* 2. Company */}
              <div className="space-y-2">
                <label className="text-xs text-blue-400 font-bold tracking-wider">COMPANY</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setCompany(e.target.value)}
                  value={company}
                >
                  <option value="any">[ Any Company ]</option>
                  <option value="Accenture">Accenture</option>
                  <option value="Tata Consultancy Services">TCS</option>
                  <option value="EY">EY (Ernst & Young)</option>
                  <option value="Capgemini">Capgemini</option>
                  <option value="Cognizant">Cognizant</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Deloitte">Deloitte</option>
                  <option value="HCL Technologies">HCL</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Google">Google</option>
                  <option value="IBM">IBM</option>
                </select>
              </div>

              {/* 3. Experience */}
              <div className="space-y-2">
                <label className="text-xs text-blue-400 font-bold tracking-wider">EXPERIENCE</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                >
                  <option value="any">[ Any Experience ]</option>
                  <option value="0-2">Entry Level (0-2 Years)</option>
                  <option value="3-5">Mid-Level (3-5 Years)</option>
                  <option value="5-10">Senior (5-10 Years)</option>
                  <option value="10+">Lead / Exec (10+ Years)</option>
                </select>
              </div>

              {/* 4. Skills / Tech Stack */}
              <div className="space-y-2">
                <label className="text-xs text-blue-400 font-bold tracking-wider">TOP SKILLS</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                  onChange={(e) => updateFilter('lang', e.target.value)}
                  value={filters.lang || ""}
                >
                  <option value="">[ All Skills ]</option>
                  <option value="C">C / C++</option>
                  <option value="Java">Java / Core Java</option>
                  <option value="SQL">SQL / MySQL</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML / CSS</option>
                  <option value="Management">Management</option>
                  <option value="Microsoft Office">Microsoft Office</option>
                  <option value="Communication">Communication</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>
            </div>
          )}

          {/* GITHUB SPECIFIC FILTERS */}
          {mode === 'github' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
              {/* 0. Search Name/User - REMOVED AS PER REQUEST */}
              {/* <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">SEARCH USER</label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                  <input
                    className="w-full bg-slate-900 border border-slate-700 rounded py-2 pl-8 pr-2 text-sm text-white focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                    placeholder="Name or Username..."
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>
              </div> */}

              {/* 1. Primary Skills */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">PRIMARY SKILLS</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('lang', e.target.value)}
                  value={filters.lang || ""}
                >
                  <option value="">[ All Languages ]</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="C++">C++</option>
                  <option value="Go">Go</option>
                </select>
              </div>

              {/* 2. Professional Status */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">PROFESSIONAL STATUS</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('status', e.target.value)}
                  value={filters.status || ""}
                >
                  <option value="">[ Any Status ]</option>
                  <option value="Corporate">Corporate (TCS, Infosys, etc.)</option>
                  <option value="Freelancer">Independent / Freelancer</option>
                  <option value="Student">Student / Academic</option>
                </select>
              </div>

              {/* 3. Community Influence */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">FOLLOWERS (INFLUENCE)</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('followers', e.target.value)}
                  value={filters.followers || ""}
                >
                  <option value="">[ Any Reach ]</option>
                  <option value="10">Emerging (10+)</option>
                  <option value="100">Influencer (100+)</option>
                  <option value="1000">Elite (1000+)</option>
                </select>
              </div>

              {/* 4. Activity Level (Contributions) */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">ACTIVITY (CONTRIBUTIONS)</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('contrib', e.target.value)}
                  value={filters.contrib || ""}
                >
                  <option value="">[ Any Activity ]</option>
                  <option value="100">Consistent (100+)</option>
                  <option value="500">Highly Active (500+)</option>
                </select>
              </div>

              {/* 5. Repo Count */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">PROJECT VOLUME (REPOS)</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('repos', e.target.value)}
                  value={filters.repos || ""}
                >
                  <option value="">[ Any Volume ]</option>
                  <option value="10">10+ Repositories</option>
                  <option value="50">50+ Repositories</option>
                  <option value="100">100+ Repositories</option>
                  <option value="250">250+ Repositories</option>
                </select>
              </div>

              {/* 6. Project Popularity (Stars) */}
              <div className="space-y-2">
                <label className="text-xs text-emerald-400 font-bold tracking-wider">POPULARITY (STARS)</label>
                <select
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500"
                  onChange={(e) => updateFilter('stars', e.target.value)}
                  value={filters.stars || ""}
                >
                  <option value="">[ Any Popularity ]</option>
                  <option value="10">Recognized (10+)</option>
                  <option value="100">Star (100+)</option>
                  <option value="1000">Superstar (1000+)</option>
                </select>
              </div>
            </div>
          )}

        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 h-[calc(100vh-80px)] overflow-y-auto no-scrollbar">
          {/* Data Source Toggle */}
          <div className="mb-8 border-b border-dashed border-slate-700 pb-8">
            <div className="text-slate-500 text-xs font-bold mb-2 tracking-wider">DATA SOURCE TOGGLE:</div>
            <div className="flex items-center gap-6">
              <div
                onClick={() => setMode('internal')}
                className={`cursor-pointer flex items-center gap-2 p-3 rounded border transition-all ${mode === 'internal' ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${mode === 'internal' ? 'border-cyan-500 bg-cyan-500' : 'border-slate-600'}`} />
                <span>Internal DB (Fast O(1))</span>
              </div>

              <div
                onClick={() => setMode('osint')}
                className={`cursor-pointer flex items-center gap-2 p-3 rounded border transition-all ${mode === 'osint' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${mode === 'osint' ? 'border-purple-500 bg-purple-500' : 'border-slate-600'}`} />
                <span>Public OSINT (Deep)</span>
              </div>

              <div
                onClick={() => setMode('linkedin')}
                className={`cursor-pointer flex items-center gap-2 p-3 rounded border transition-all ${mode === 'linkedin' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${mode === 'linkedin' ? 'border-blue-500 bg-blue-500' : 'border-slate-600'}`} />
                <span>LinkedIn Dataset (Local)</span>
              </div>

              <div
                onClick={() => setMode('github')}
                className={`cursor-pointer flex items-center gap-2 p-3 rounded border transition-all ${mode === 'github' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${mode === 'github' ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'}`} />
                <span>GitHub Dataset (Local)</span>
              </div>
            </div>

            {/* AI Resume Analyzer Removed as per request */}
          </div>

          {/* Results Grid */}
          <div>
            <h2 className="text-slate-400 text-sm mb-4">[ RESULTS GRID: {results.length} RESULTS FOUND OUT OF {totalCount || '...'} ]</h2>

            {loading ? (
              <div className="text-slate-500 animate-pulse">Scanning Global Neural Network...</div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {results.map((result: any, i: number) => {
                  const isInternal = result.source === 'internal_db'
                  const borderColor = isInternal ? "border-cyan-500/50" : "border-amber-500/50"
                  const textColor = isInternal ? "text-cyan-400" : "text-amber-400"

                  return (
                    <div key={i} className={`bg-slate-900/50 border border-l-4 rounded w-full ${borderColor} p-6 relative group hover:bg-slate-900 transition-all`}>

                      {/* Header Row */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${textColor}`}>
                            [{isInternal ? "INTERNAL ALUMNI" : "OSINT DISCOVERY"}]
                          </div>
                          <h3 className="text-2xl font-bold text-white">{result.title.split(' - ')[0]}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          {isInternal ? <Database className="h-4 w-4" /> : <Github className="h-4 w-4" />}
                          [Source: {result.source}]
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-slate-800 border-t border-dashed border-slate-600 my-4" />

                      {/* Details */}
                      <div className="space-y-2 font-mono text-sm text-slate-300">
                        <div>
                          <span className="text-slate-500">DETECTED ROLE:</span> {result.metadata.role}
                        </div>
                        {result.metadata.match_score && (
                          <div>
                            <span className="text-slate-500">MATCH SCORE:</span> <span className="text-green-400">{result.metadata.match_score}% (Cosine Similarity)</span>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-500">EMAILS:</span> {result.metadata.email}
                          <span className="ml-2 text-green-500 bg-green-500/10 px-1 rounded text-xs">[SMTP: VERIFIED]</span>
                        </div>
                        <div>
                          <span className="text-slate-500">TECH STACK:</span> "{result.metadata.skills.slice(0, 5).join('", "')}"
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex gap-4">
                        <Link
                          className={cn(buttonVariants({ variant: "outline" }), "border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors duration-300")}
                          href={
                            (mode === 'github' && result.metadata?.username
                              ? `/profile/github/${result.metadata.username}`
                              : mode === 'linkedin'
                                ? `/profile/linkedin/${result.metadata.id}`
                                : mode === 'osint'
                                  ? `/profile/osint/${result.metadata.id}`
                                  : `/profile/internal/${result.metadata.id}`) + (window.location.search || "")
                          }>
                          [ Profile Analysis View / Compare ]
                        </Link>
                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
