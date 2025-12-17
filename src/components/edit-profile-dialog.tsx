"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Briefcase, Code, Link as LinkIcon, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProfileData {
    name: string
    role: string
    skills: string[]
    experience: string
    github?: string
    linkedin?: string
    bio?: string
}

interface EditProfileDialogProps {
    initialData: ProfileData
    onSave: (data: ProfileData) => void
}

export function EditProfileDialog({ initialData, onSave }: EditProfileDialogProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState<ProfileData>(initialData)
    const [newSkill, setNewSkill] = useState("")

    useEffect(() => {
        setFormData(initialData)
    }, [initialData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const addSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData({ ...formData, skills: [...formData.skills, newSkill] })
            setNewSkill("")
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) })
    }

    const handleSave = () => {
        onSave(formData)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30">
                    <User className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-slate-950 border-slate-800 text-slate-50 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-cyan-400" /> Edit Your Identity
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Update your professional persona. This data drives the OSINT matching engine.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">

                    {/* Personal Info */}
                    <div className="grid gap-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Personal Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" value={formData.name} onChange={handleChange} className="bg-slate-900 border-slate-700" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Current Role</Label>
                                <Input id="role" value={formData.role} onChange={handleChange} className="bg-slate-900 border-slate-700" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" value={formData.experience} onChange={handleChange} className="bg-slate-900 border-slate-700" placeholder="e.g. 2 years, Fresher" />
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <Code className="w-4 h-4" /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-800 min-h-[60px]">
                            {formData.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="bg-cyan-950 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900 pr-1">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-white"><X className="w-3 h-3" /></button>
                                </Badge>
                            ))}
                            {formData.skills.length === 0 && <span className="text-slate-500 text-sm italic">No skills added yet.</span>}
                        </div>
                        <div className="flex gap-2">
                            <Input
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill (e.g. Docker)"
                                className="bg-slate-900 border-slate-700"
                                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                            />
                            <Button onClick={addSkill} size="icon" className="bg-slate-800 hover:bg-slate-700"><Plus className="w-4 h-4" /></Button>
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="grid gap-4">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <LinkIcon className="w-4 h-4" /> Social Footprint
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="github">GitHub URL</Label>
                                <Input id="github" value={formData.github || ''} onChange={handleChange} className="bg-slate-900 border-slate-700" placeholder="https://github.com/..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn URL</Label>
                                <Input id="linkedin" value={formData.linkedin || ''} onChange={handleChange} className="bg-slate-900 border-slate-700" placeholder="https://linkedin.com/in/..." />
                            </div>
                        </div>
                    </div>

                </div>

                <DialogFooter>
                    <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold w-full sm:w-auto">
                        Save Changes & Re-Calibrate
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
