"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, X } from "lucide-react"

interface EducationSkillsSectionProps {
  educationData: any[]
  skillsData: string[]
  onEducationChange: (data: any[]) => void
  onSkillsChange: (data: string[]) => void
}

export function EducationSkillsSection({
  educationData,
  skillsData,
  onEducationChange,
  onSkillsChange,
}: EducationSkillsSectionProps) {
  const handleEducationAdd = () => {
    onEducationChange([
      ...educationData,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const handleEducationUpdate = (index: number, field: string, value: string) => {
    const updated = educationData.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    onEducationChange(updated)
  }

  const handleEducationRemove = (index: number) => {
    onEducationChange(educationData.filter((_, i) => i !== index))
  }

  const handleSkillAdd = (skill: string) => {
    if (skill.trim() && !skillsData.includes(skill.trim())) {
      onSkillsChange([...skillsData, skill.trim()])
    }
  }

  const handleSkillRemove = (skillToRemove: string) => {
    onSkillsChange(skillsData.filter((skill) => skill !== skillToRemove))
  }

  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const input = e.target as HTMLInputElement
      handleSkillAdd(input.value)
      input.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Education</CardTitle>
          <Button onClick={handleEducationAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {educationData.map((education, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button variant="outline" size="sm" onClick={() => handleEducationRemove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => handleEducationUpdate(index, "degree", e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => handleEducationUpdate(index, "institution", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={education.location}
                    onChange={(e) => handleEducationUpdate(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    value={education.startDate}
                    onChange={(e) => handleEducationUpdate(index, "startDate", e.target.value)}
                    placeholder="Sep 2018"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    value={education.endDate}
                    onChange={(e) => handleEducationUpdate(index, "endDate", e.target.value)}
                    placeholder="May 2022"
                  />
                </div>
              </div>

              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  value={education.description}
                  onChange={(e) => handleEducationUpdate(index, "description", e.target.value)}
                  placeholder="Relevant coursework, achievements, GPA..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          {educationData.length === 0 && (
            <p className="text-muted-foreground text-sm">No education entries added yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Add Skill</Label>
            <Input placeholder="Type a skill and press Enter" onKeyPress={handleSkillKeyPress} />
            <p className="text-sm text-muted-foreground mt-1">Press Enter to add each skill</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {skillsData.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
                <button onClick={() => handleSkillRemove(skill)} className="ml-2 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {skillsData.length === 0 && <p className="text-muted-foreground text-sm">No skills added yet.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
