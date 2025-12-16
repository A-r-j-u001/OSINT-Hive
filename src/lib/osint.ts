export type SearchResult = {
  title: string
  link: string
  snippet: string
  source: 'google' | 'github' | 'linkedin' | 'unstop'
}

export async function googleSearch(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY
  const cx = process.env.GOOGLE_SEARCH_CX

  if (!apiKey || !cx) {
    console.error("Missing Google Search keys")
    return []
  }

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (!data.items) return []

    return data.items.map((item: any) => {
      let source: SearchResult['source'] = 'google'
      if (item.link.includes('linkedin.com')) source = 'linkedin'
      if (item.link.includes('unstop.com')) source = 'unstop'
      if (item.link.includes('github.com')) source = 'github'

      return {
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        source: source
      }
    })
  } catch (error) {
    console.error("Google Search Error:", error)
    return []
  }
}

export function extractEmail(text: string): string | null {
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/
  const match = text.match(emailRegex)
  return match ? match[0] : null
}
