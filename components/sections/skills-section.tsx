"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"

interface SkillsSectionProps {
  data: string[]
  onChange: (data: string[]) => void
}

export function SkillsSection({ data, onChange }: SkillsSectionProps) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Technical Skills</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Add your technical skills, programming languages, tools, and technologies.
        </p>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="newSkill" className="sr-only">
            Add new skill
          </Label>
          <Input
            id="newSkill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>
        <Button onClick={addSkill} disabled={!newSkill.trim()}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {data.length > 0 && (
        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">Your Skills</Label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-destructive transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {data.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Start by adding your first skill above.</p>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Suggestions</h4>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS", "Docker"].map((suggestion) => (
            <Button
              key={suggestion}
              variant="outline"
              size="sm"
              onClick={() => {
                if (!data.includes(suggestion)) {
                  onChange([...data, suggestion])
                }
              }}
              disabled={data.includes(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
