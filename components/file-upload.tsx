"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onUpload: (data: any) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setIsUploading(true)
      setUploadError(null)

      try {
        // Simulate file processing and data extraction
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Mock extracted resume data
        const mockData = {
          personal: {
            fullName: "John Doe",
            position: "Software Engineer",
            email: "john.doe@email.com",
            phone: "+1 (555) 123-4567",
            address: "San Francisco, CA",
          },
          summary: "Experienced software engineer with 5+ years of experience in full-stack development.",
          experience: [
            {
              id: "1",
              company: "Tech Corp",
              position: "Senior Software Engineer",
              startDate: "2021-01",
              endDate: "Present",
              description: "Led development of web applications using React and Node.js.",
            },
          ],
          education: [
            {
              id: "1",
              institution: "University of Technology",
              degree: "Bachelor of Computer Science",
              startDate: "2016-09",
              endDate: "2020-05",
            },
          ],
          skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
          social: [
            { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
            { platform: "GitHub", url: "https://github.com/johndoe" },
          ],
        }

        onUpload(mockData)
      } catch (error) {
        setUploadError("Failed to process resume. Please try again.")
      } finally {
        setIsUploading(false)
      }
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">Build Your Perfect Resume</h1>
        <p className="text-lg text-muted-foreground">
          Upload your existing resume and we'll help you make it even better
        </p>
      </div>

      <Card className="p-8">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
            isDragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50 hover:bg-accent/5",
            isUploading && "pointer-events-none opacity-50",
          )}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-4">
            {isUploading ? (
              <Loader2 className="h-12 w-12 text-accent animate-spin" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-accent" />
              </div>
            )}

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isUploading ? "Processing your resume..." : "Upload your resume"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isUploading
                  ? "Extracting information from your document"
                  : "Drag and drop your file here, or click to browse"}
              </p>
              <p className="text-sm text-muted-foreground">Supports PDF, DOC, and DOCX files up to 5MB</p>
            </div>

            {!isUploading && (
              <Button size="lg" className="mt-4">
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{uploadError}</p>
          </div>
        )}
      </Card>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have a resume yet?{" "}
          <button onClick={() => onUpload(null)} className="text-accent hover:underline font-medium">
            Start from scratch
          </button>
        </p>
      </div>
    </div>
  )
}
