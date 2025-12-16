import { NextResponse } from 'next/server'
import { model } from '@/lib/gemini'

export async function POST(request: Request) {
  try {
    const { userProfile, mentorProfile } = await request.json()

    const prompt = `
      Compare these two profiles and calculate a "Referral Probability Score" (0-100).
      
      User (Student): ${JSON.stringify(userProfile)}
      Mentor (Target): ${JSON.stringify(mentorProfile)}
      
      Factors: Shared Skills, Background (Education/Location), and Career Overlap.
      
      Return JSON:
      {
        "score": 85,
        "reason": "Strong match in Python skills and same University.",
        "missing_skills": ["Docker", "Kubernetes"]
      }
      Just JSON.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim()

    return NextResponse.json(JSON.parse(text))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to calculate score' }, { status: 500 })
  }
}
