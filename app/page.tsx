"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/file-upload"
import { ResumeEditor } from "@/components/resume-editor"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"

const defaultResumeData = {
  personal: {
    fullName: "",
    position: "",
    email: "",
    phone: "",
    address: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  social: [],
}

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"template" | "upload" | "edit">("template")
  const [resumeData, setResumeData] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic")

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData")
    const savedTemplate = localStorage.getItem("selectedTemplate")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setResumeData(parsedData)
        setSelectedTemplate(savedTemplate || "classic")
        setCurrentStep("edit")
      } catch (error) {
        console.error("Failed to load saved resume data:", error)
      }
    }
  }, [])

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    localStorage.setItem("selectedTemplate", templateId)
    setCurrentStep("upload")
  }

  const handleFileUpload = (extractedData: any) => {
    if (extractedData === null) {
      // Start from scratch
      setResumeData(defaultResumeData)
    } else {
      // Use extracted data from uploaded file
      setResumeData(extractedData)
    }
    setCurrentStep("edit")
  }

  const handleStartOver = () => {
    setCurrentStep("template")
    setResumeData(null)
    setSelectedTemplate("classic")
    localStorage.removeItem("resumeData")
    localStorage.removeItem("selectedTemplate")
  }

  useEffect(() => {
    if (resumeData && currentStep === "edit") {
      const timeoutId = setTimeout(() => {
        localStorage.setItem("resumeData", JSON.stringify(resumeData))
      }, 1000) // Auto-save after 1 second of inactivity

      return () => clearTimeout(timeoutId)
    }
  }, [resumeData, currentStep])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">Resume Builder</h1>
            </div>
            {(currentStep === "upload" || currentStep === "edit") && (
              <button
                onClick={handleStartOver}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentStep === "template" ? (
          <TemplateSelector onTemplateSelect={handleTemplateSelect} />
        ) : currentStep === "upload" ? (
          <FileUpload onUpload={handleFileUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <ResumeEditor resumeData={resumeData} onDataChange={setResumeData} template={selectedTemplate} />
            <ResumePreview resumeData={resumeData} template={selectedTemplate} />
          </div>
        )}
      </main>
    </div>
  )
}
