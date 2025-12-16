import { NextResponse } from 'next/server'
import { googleSearch } from '@/lib/osint'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query required' }, { status: 400 })
  }

  // OSINT Strategy: Dorking
  // We execute multiple targeted searches in parallel for maximum coverage.
  const dorks = [
    `${query} site:linkedin.com/in`,         // Target 1: LinkedIn Profiles
    `${query} site:unstop.com`,               // Target 2: Unstop Profiles
    `${query} site:github.com`,               // Target 3: GitHub Profiles
    `${query} filetype:pdf "Resume" OR "CV"`  // Target 4: Direct Documents
  ]

  try {
    const results = await Promise.all(dorks.map(dork => googleSearch(dork)))

    // Flatten and Dedup based on link
    const allResults = results.flat()
    const uniqueResults = Array.from(new Map(allResults.map(item => [item.link, item])).values())

    return NextResponse.json({
      results: uniqueResults,
      meta: {
        total: uniqueResults.length,
        source: 'multi-vector-osint'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
