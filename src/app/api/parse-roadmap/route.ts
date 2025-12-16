import { NextResponse } from 'next/server'
import { model } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text content required' }, { status: 400 })
    }

    const prompt = `
      You are an expert career analyst. Analyze the following resume/bio text and extract a chronological career roadmap.
      
      Text:
      ${text}
      
      Return a JSON object with this structure:
      {
        "timeline": [
          { "year": "YYYY", "title": "Role Title", "company": "Company Name", "description": "Key achievements", "type": "experience" | "education" | "project" }
        ],
        "skills": ["Skill1", "Skill2"],
        "summary": "Brief professional summary"
      }
      Do not include markdown formatting, just raw JSON.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const textOutput = response.text()

    // Cleanup markdown code blocks if present
    const cleanJson = textOutput.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim()

    return NextResponse.json(JSON.parse(cleanJson))
  } catch (error) {
    console.error("Gemini Error:", error)
    return NextResponse.json({ error: 'Failed to parse roadmap' }, { status: 500 })
  }
}
