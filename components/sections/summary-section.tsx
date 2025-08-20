"use client"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface SummarySectionProps {
  data: string
  onChange: (data: string) => void
}

export function SummarySection({ data, onChange }: SummarySectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Professional Summary</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Write a brief overview of your professional background, key skills, and career objectives.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Summary</Label>
        <Textarea
          id="summary"
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Experienced software engineer with 5+ years of experience in full-stack development. Passionate about creating efficient, scalable solutions and leading cross-functional teams to deliver high-quality products."
          rows={6}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Tip: Keep it concise (2-3 sentences) and highlight your most relevant achievements.
        </p>
      </div>
    </div>
  )
}
