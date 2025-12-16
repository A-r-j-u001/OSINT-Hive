"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, Database, ShieldCheck, Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SearchPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [query, setQuery] = useState("")

  const handleSearch = async () => {
    setLoading(true)
    try {
      // Direct call to our Next.js API
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.results || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Globe className="h-6 w-6 text-cyan-400" />
          Intel Search <span className="text-slate-500 font-normal text-sm ml-2">Open World Reconnaissance</span>
        </h1>
        <Button variant="outline" className="border-slate-800 text-slate-400">Back to Dashboard</Button>
      </header>

      <div className="mx-auto max-w-5xl space-y-6">
        {/* Search Interface */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder='Search target (e.g. "Senior Java Developer" or specific company)...'
              className="bg-slate-950 border-slate-800 h-12 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="lg" className="h-12 bg-cyan-600 hover:bg-cyan-700" onClick={handleSearch} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Search />}
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Tabs defaultValue="public" className="w-[400px]">
              <TabsList className="bg-slate-950 border border-slate-800">
                <TabsTrigger value="internal" className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-400">
                  <Database className="w-4 h-4 mr-2" /> Internal DB (O(1))
                </TabsTrigger>
                <TabsTrigger value="public" className="data-[state=active]:bg-cyan-900/20 data-[state=active]:text-cyan-400">
                  <Globe className="w-4 h-4 mr-2" /> Public OSINT (Deep)
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" /> SMTP Verification Active
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item, i) => (
            <Card key={i} className="border-slate-800 bg-slate-900/30 hover:border-cyan-500/50 transition-all">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base text-cyan-100 truncate pr-4" dangerouslySetInnerHTML={{ __html: item.title }} />
                  <Badge variant="secondary" className="bg-slate-800 text-slate-400">PDF</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400 line-clamp-3 mb-4" dangerouslySetInnerHTML={{ __html: item.snippet }} />
                <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                  <span className="text-xs text-green-500 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> EMAIL EXTRACTED
                  </span>
                  <Button size="sm" variant="ghost" className="h-7 text-cyan-400 hover:bg-cyan-950">
                    Parse Roadmap &rarr;
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
