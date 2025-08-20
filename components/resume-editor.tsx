"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfoSection } from "@/components/sections/basic-info-section"
import { SummarySection } from "@/components/sections/summary-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EducationSkillsSection } from "@/components/sections/education-skills-section"
import { Download, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import dynamic from "next/dynamic"

interface ResumeEditorProps {
  resumeData: any
  onDataChange: (data: any) => void
  template?: string
}
// const Print = dynamic(() => import("@/components/WinPrint"), { ssr: false });

export function ResumeEditor({ resumeData, onDataChange, template = "classic" }: ResumeEditorProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSectionUpdate = (section: string, data: any) => {
    onDataChange({
      ...resumeData,
      [section]: data,
    })
  }

  const handlePersonalChange = (data: any) => {
    handleSectionUpdate("personal", data)
  }

  const handleSocialChange = (data: any) => {
    handleSectionUpdate("social", data)
  }

  const handleEducationChange = (data: any) => {
    handleSectionUpdate("education", data)
  }

  const handleSkillsChange = (data: any) => {
    handleSectionUpdate("skills", data)
  }

  const handleDownload = async () => {
    window.print();
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem("resumeData", JSON.stringify(resumeData))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Resume saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Edit Resume</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save
          </Button>
          {/* <Button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2" />}
            Download PDF
          </Button> */}
          {/* <Print /> */}
        </div>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education & Skills</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="basic">
              <BasicInfoSection
                personalData={resumeData?.personal || {}}
                socialData={resumeData?.social || []}
                onPersonalChange={handlePersonalChange}
                onSocialChange={handleSocialChange}
              />
            </TabsContent>

            <TabsContent value="profile">
              <SummarySection
                data={resumeData?.summary || ""}
                onChange={(data) => handleSectionUpdate("summary", data)}
              />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsSection
                data={resumeData?.projects || []}
                onChange={(data) => handleSectionUpdate("projects", data)}
              />
            </TabsContent>

            <TabsContent value="experience">
              <ExperienceSection
                data={resumeData?.experience || []}
                onChange={(data) => handleSectionUpdate("experience", data)}
              />
            </TabsContent>

            <TabsContent value="education">
              <EducationSkillsSection
                educationData={resumeData?.education || []}
                skillsData={resumeData?.skills || []}
                onEducationChange={handleEducationChange}
                onSkillsChange={handleSkillsChange}
              />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  )
}
