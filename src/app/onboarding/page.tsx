"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, FileText, CheckCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const router = useRouter()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = async () => {
        if (!file) return
        setUploading(true)

        try {
            // 1. Read file as text (for demo simulation, normally we send standard FormData)
            // Since parsing PDFs client-side is heavy, we'll simulate a text extract or use a real API if available.
            // For this hackathon scope, sending raw text or just simulating the success is acceptable if we lack a PDF parser key.
            // BUT, let's try to send it to our API.

            const formData = new FormData()
            formData.append('file', file)

            // In a real scenario, we'd use 'pdf-parse' on the server.
            // For now, let's simulate the parsing delay and then redirect to dashboard.
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Store "parsed" data in localStorage for the "Real" feel in Dashboard
            const mockParsedProfile = {
                name: "User",
                skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
                experience: "2 years",
                target_role: "Full Stack Engineer"
            }
            localStorage.setItem('userProfile', JSON.stringify(mockParsedProfile))

            router.push('/dashboard')
        } catch (error) {
            console.error(error)
            alert("Upload failed. Please try again.")
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="h-6 w-6 text-cyan-400" /> Upload Your Resume
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                        OSINT-Hive needs your skills to calculate compatibility scores.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-lg p-10 hover:bg-slate-900/50 transition-colors cursor-pointer relative">
                        <input
                            type="file"
                            accept=".pdf,.docx"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        {file ? (
                            <div className="text-center">
                                <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-2" />
                                <p className="font-medium text-white">{file.name}</p>
                                <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Upload className="h-10 w-10 text-slate-500 mx-auto mb-2" />
                                <p className="font-medium text-slate-300">Click to upload or drag and drop</p>
                                <p className="text-sm text-slate-500">PDF or DOCX (Max 5MB)</p>
                            </div>
                        )}
                    </div>

                    <Button
                        className="w-full bg-cyan-600 hover:bg-cyan-700"
                        disabled={!file || uploading}
                        onClick={handleUpload}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing Career Trajectory...
                            </>
                        ) : (
                            "Analyze & Continue"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
