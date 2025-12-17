import { NextResponse } from 'next/server'
import { googleSearch } from '@/lib/osint'
import { MOCK_DB } from '@/lib/mock-data'
import fs from 'fs'
import path from 'path'
import { searchLinkedInData } from '@/lib/linkedin-search'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const query = searchParams.get('q') || ""
  const mode = searchParams.get('mode') // "internal" | "osint" | "linkedin"

  // If specific ID requested, return that profile directly
  if (id) {
    const profile = MOCK_DB.find(p => p.id === id)
    if (profile) {
      return NextResponse.json({
        results: [{
          title: `${profile.name} - ${profile.role}`,
          link: `/profile/${profile.id}`,
          snippet: `${profile.role} at ${profile.company}`,
          source: 'internal_db',
          metadata: profile
        }]
      })
    }
  }

  // --- LINKEDIN DATASET MODE (INDIVIDUALS) ---
  if (mode === 'linkedin') {
    try {
      const filters = {
        q: query,
        status: searchParams.get('status') || undefined, // Role
        company: searchParams.get('co') || undefined,
        experience: searchParams.get('exp') || undefined,
        skills: searchParams.get('lang') || undefined, // Skills
      }

      const { results: rawResults, total } = await searchLinkedInData(filters)

      const results = rawResults.map(item => ({
        title: item.full_name,
        link: `/profile/linkedin/${item.public_identifier}`,
        snippet: item.headline || item.occupation || item.summary?.slice(0, 100) || "No headline",
        source: 'linkedin',
        metadata: {
          ...item,
          role: item.occupation, // Normalize for UI
          id: item.public_identifier, // Map for UI routing
          company: item.experiences?.[0]?.company || "Unknown",
          location: item.city ? `${item.city}, ${item.country_full_name}` : item.country_full_name
        }
      }))

      return NextResponse.json({
        results,
        meta: {
          total: total,
          page: 1,
          limit: 50
        }
      })
    } catch (error) {
      console.error('LinkedIn Search Error:', error)
      return NextResponse.json({ results: [], error: 'Failed to search LinkedIn data' })
    }
  }

  // --- GITHUB DATASET MODE (CSV) ---
  if (mode === 'github') {
    try {
      const filePath = path.join(process.cwd(), 'src', 'data', 'github-users.csv')
      const fileContents = fs.readFileSync(filePath, 'utf8')

      // Simple CSV Parser handling quoted fields and newlines
      const parseCSV = (text: string) => {
        const rows: string[][] = []
        let currentRow: string[] = []
        let currentField = ''
        let inQuotes = false

        for (let i = 0; i < text.length; i++) {
          const char = text[i]
          const nextChar = text[i + 1]

          if (char === '"') {
            if (inQuotes && nextChar === '"') {
              currentField += '"'
              i++ // Skip escaped quote
            } else {
              inQuotes = !inQuotes
            }
          } else if (char === ',' && !inQuotes) {
            currentRow.push(currentField)
            currentField = ''
          } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++ // Handle CRLF
            currentRow.push(currentField)
            if (currentRow.length > 1) rows.push(currentRow) // Skip empty lines
            currentRow = []
            currentField = ''
          } else {
            currentField += char
          }
        }
        return rows
      }

      const rows = parseCSV(fileContents)
      console.log(`[GitHub Search] Parsed ${rows.length} rows from CSV`)

      const headers = rows[0]
      const dataRows = rows.slice(1)

      const lowerQuery = query.toLowerCase()

      // Column Indices based on: ,username(1),name(2),...,location(13),language(14),...,description(19)
      const IDX_USER = 1
      const IDX_NAME = 2
      const IDX_JOIN_YEAR = 3
      const IDX_REPOS = 4
      const IDX_CONTRIB = 5
      const IDX_STARS = 7
      const IDX_FOLLOWERS = 8
      const IDX_WORKS_FOR = 11
      const IDX_LOC = 13
      const IDX_LANG = 14
      const IDX_DESC = 19

      // Parse Filters
      const fLang = searchParams.get('lang')?.toLowerCase()
      const fStatus = searchParams.get('status')?.toLowerCase() // Corporate, Student, Freelancer
      const fFollowers = parseInt(searchParams.get('followers') || '0')
      const fContrib = parseInt(searchParams.get('contrib') || '0')
      const fRepos = parseInt(searchParams.get('repos') || '0')
      const fStars = parseInt(searchParams.get('stars') || '0')

      const results = dataRows
        .filter(row => {
          if (row.length < 5) return false

          const name = (row[IDX_NAME] || '').toLowerCase()
          const username = (row[IDX_USER] || '').toLowerCase()
          const lang = (row[IDX_LANG] || '').toLowerCase()
          const worksFor = (row[IDX_WORKS_FOR] || '').toLowerCase()
          const followers = parseFloat(row[IDX_FOLLOWERS] || '0')
          const contrib = parseFloat(row[IDX_CONTRIB] || '0')
          const repos = parseFloat(row[IDX_REPOS] || '0')
          const stars = parseFloat(row[IDX_STARS] || '0')

          // 1. Keyword Search (Name or Username)
          if (query && !name.includes(lowerQuery) && !username.includes(lowerQuery)) return false

          // 2. Language Filter
          if (fLang && !lang.includes(fLang)) return false

          // 3. Status/Company Filter
          if (fStatus) {
            if (fStatus === 'student') {
              // Basic heuristic for students
              const studentKeywords = ['student', 'university', 'college', 'iit', 'nit', 'institute', 'school', 'academy', 'learning']
              if (!studentKeywords.some(k => worksFor.includes(k) || row[IDX_DESC]?.toLowerCase().includes(k))) return false
            } else if (fStatus === 'corporate') {
              // Exclude students and known non-corporate keywords
              // If they have a company listed, assume corporate unless it's a university or "freelance"
              const nonCorp = ['student', 'college', 'university', 'freelance', 'open to work', 'focusing', 'self-employed', 'independent']
              if (!worksFor) return false // Must have a company listed
              if (nonCorp.some(k => worksFor.includes(k))) return false
            } else if (fStatus === 'freelancer') {
              // Broaden to include self-employed, independent, or just "open to work" statuses
              // Also include if company is empty (often true for freelancers) AND description hints at it
              const freelanceKeywords = ['freelance', 'self-employed', 'independent', 'consultant', 'founder', 'owner', 'open to work']
              const isFreelanceKeyword = freelanceKeywords.some(k => worksFor.includes(k) || row[IDX_DESC]?.toLowerCase().includes(k));

              // New Heuristic: If they have NO company listed, they might be independent/freelance if not a student
              const noCompanyAndNotStudent = !worksFor && !['student', 'university', 'college'].some(k => row[IDX_DESC]?.toLowerCase().includes(k))

              if (!isFreelanceKeyword && !noCompanyAndNotStudent) return false
            }
          }

          // 4. Numeric Filters
          if (followers < fFollowers) return false
          if (contrib < fContrib) return false
          if (repos < fRepos) return false
          if (stars < fStars) return false

          return true
        })
        .slice(0, 50) // Increased limit for better exploration
        .map((row, index) => {
          const username = row[IDX_USER]
          const name = row[IDX_NAME] || username
          const languages = row[IDX_LANG] ? row[IDX_LANG].split(',').map(s => s.trim()) : ["Code"]
          const description = row[IDX_DESC] ? row[IDX_DESC].replace(/\n/g, ' ').substring(0, 150) : `GitHub Developer from ${row[IDX_LOC] || 'India'}`

          return {
            title: name,
            link: `https://github.com/${username}`,
            snippet: description,
            source: 'github_dataset',
            metadata: {
              id: `gh-${index}`,
              role: row[IDX_WORKS_FOR] || "Developer",
              skills: [...languages, "Git"],
              match_score: 90,
              location: row[IDX_LOC] || "India",
              email: "Hidden (Verified)",
              followers: row[IDX_FOLLOWERS],
              contributions: row[IDX_CONTRIB],
              verified: true,
              username: username // Added for routing
            }
          }
        })

      return NextResponse.json({
        results,
        meta: {
          total: dataRows.length, // Total available rows before filtering
          found: results.length,
          source: 'github_csv'
        }
      })

    } catch (error) {
      console.error("Error reading GitHub CSV:", error)
      return NextResponse.json({ results: [], error: "Failed to load GitHub dataset" })
    }
  }

  // --- EXISTING LOGIC (Internal / Public OSINT) ---
  const experience = searchParams.get('exp') // "0-2", "3-5", "5+"
  const company = searchParams.get('co')
  const isInternalMode = mode === 'internal'

  // Demo Strategy: "Mock First, Live Second"
  const lowerQuery = (query || "").toLowerCase()

  const mockResults = MOCK_DB.filter(p => {
    // 0. Source Filter (Mode)
    const matchesSource = isInternalMode
      ? p.source === 'INTERNAL_DB'
      : p.source !== 'INTERNAL_DB' // OSINT Mode shows everything EXCEPT internal DB

    // 1. Keyword Filter (Strict: Skills OR Role only, NO NAME)
    const matchesKeyword = !lowerQuery ||
      p.skills.some(s => s.toLowerCase().includes(lowerQuery)) ||
      p.role.toLowerCase().includes(lowerQuery)

    // 2. Company Filter
    const matchesCompany = !company || company === 'any' ||
      p.company.toLowerCase().includes(company.toLowerCase())

    // 3. Experience Filter (Calculated from Roadmap)
    let matchesExp = true
    if (experience && experience !== 'any') {
      // Calculate Approx Years from Earliest Roadmap Entry
      const startYear = p.roadmap.length > 0
        ? Math.min(...p.roadmap.map(r => parseInt(r.year)))
        : 2024
      const years = 2025 - startYear

      if (experience === '0-2') matchesExp = years <= 2
      else if (experience === '3-5') matchesExp = years > 2 && years <= 5
      else if (experience === '5+') matchesExp = years > 5
    }

    return matchesSource && matchesKeyword && matchesCompany && matchesExp
  }).map(p => ({
    title: `${p.name} - ${p.role}`,
    link: `/profile/${p.id}`,
    snippet: `${p.role} at ${p.company} | Skills: ${p.skills.slice(0, 3).join(', ')} | Source: ${p.source}`,
    source: p.source.toLowerCase().includes('osint') ? 'public_osint' : 'internal_db',
    metadata: p
  })).sort((a, b) => {
    // Prioritize "verified" (Hero) profiles
    if (a.metadata.verified && !b.metadata.verified) return -1
    if (!a.metadata.verified && b.metadata.verified) return 1
    return b.metadata.match_score - a.metadata.match_score // Then by match score
  })

  // 2. Also perform "Live" OSINT if needed (optional for demo if we have enough mock data)
  // For safety and speed in demo, we can rely heavily on the mock data if it returns hits.
  let finalResults: any[] = mockResults

  if (finalResults.length < 5) {
    // Fallback to Live OSINT if our local DB misses
    const dorks = [
      `${query} site:linkedin.com/in`,
      `${query} site:unstop.com`
    ]
    try {
      const liveResults = await Promise.all(dorks.map(dork => googleSearch(dork)))
      const flatLive = liveResults.flat()
      finalResults = [...finalResults, ...flatLive]
    } catch (e) {
      console.error("Live search failed, using mock only")
    }
  }

  return NextResponse.json({
    results: finalResults,
    meta: {
      total: finalResults.length,
      source: 'hybrid-demo-engine'
    }
  })
}
