"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
}

interface EducationSectionProps {
  data: Education[]
  onChange: (data: Education[]) => void
}

export function EducationSection({ data, onChange }: EducationSectionProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updated = data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    onChange(updated)
  }

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
          <p className="text-sm text-muted-foreground">Add your educational background and qualifications.</p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((education) => (
          <Card key={education.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-medium text-foreground">Education Entry</h4>
              <Button variant="ghost" size="sm" onClick={() => removeEducation(education.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University of Technology"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${education.id}`}
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                <Input
                  id={`endDate-${education.id}`}
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No education added yet.</p>
            <Button onClick={addEducation} variant="outline" className="mt-2 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Education
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
