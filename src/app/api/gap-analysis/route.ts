import { NextResponse } from 'next/server'
import { model } from '@/lib/gemini'

export async function POST(request: Request) {
    try {
        const { userSkills, targetRole, targetSkills } = await request.json()

        if (!targetRole) {
            return NextResponse.json({ error: 'Target role required' }, { status: 400 })
        }

        // AI Prompt for Gap Analysis
        const prompt = `
        Act as a Senior Career Coach. 
        User wants to be a "${targetRole}".
        
        User Skills: ${JSON.stringify(userSkills)}
        Target/Required Skills for this concrete profile: ${JSON.stringify(targetSkills)}

        1. Identify the 3 most critical missing skills/gaps.
        2. For each missing skill, provide a specific, actionable recommendation.
           - PRIORITIZE FREE RESOURCES:
             - YouTube Tutorials (Crash Course)
             - FreeCodeCamp Articles/Courses
             - Credly/Google Skill Badge links if applicable
        3. Explain *why* these missing skills are crucial for this specific role.

        Return JSON format:
        {
            "analysis": "Brief 2-sentence summary...",
            "missing_skills": ["Skill 1", "Skill 2"],
            "recommendations": [
                { 
                    "skill": "Skill 1", 
                    "action": "Actionable advice...", 
                    "link": "https://www.freecodecamp.org/...",
                    "platform": "FreeCodeCamp/Credly/YouTube"
                }
            ]
        }
        `

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        // Clean markdown code blocks if present
        const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim()

        const aiResponse = JSON.parse(cleanedText)

        return NextResponse.json(aiResponse)

    } catch (e) {
        console.error("Gap Analysis Error", e)
        return NextResponse.json({
            analysis: "Could not generate AI analysis. Falling back to basic comparison.",
            missing_skills: [],
            recommendations: []
        }, { status: 500 })
    }
}
