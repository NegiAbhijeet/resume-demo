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
      const file = acceptedFiles[0];
      if (!file) return;

      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        // toast.error("Please upload a PDF or DOCX file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        // toast.error("Please upload a file smaller than 5MB.");
        return;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("uid", "hirMjzjfRiW0DGzPal4lzOCN2wg2");

        const response = await fetch(`https://python.aiinterviewagents.com/upload-resume/`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload resume.");

        const data = await response.json();
        const resumeFields = data?.fields;

        // Populate onUpload with API response
        onUpload({
          personal: {
            fullName: resumeFields?.full_name,
            position: resumeFields?.current_role,
            email: resumeFields?.email,
            phone: resumeFields?.phone,
            address: resumeFields?.location,
          },
          summary: resumeFields?.summary,
          experience: resumeFields?.work_experience?.length
            ? resumeFields.work_experience.map((job) => ({
              id: job?.id,
              company: job?.company_name,
              position: job?.job_title,
              startDate: job?.start_date,
              endDate: job?.end_date,
              description: job?.description,
            }))
            : [],
          education: resumeFields?.education?.length
            ? resumeFields.education.map((edu) => ({
              id: edu?.id,
              institution: edu?.["university/institute name"],
              degree: edu?.degree,
              startDate: edu?.start_date,
              endDate: edu?.end_date,
            }))
            : [],
          skills: resumeFields?.skills || [],
          social: resumeFields?.social || [],
        });

      } catch (error) {
        console.error(error);
        setUploadError("Failed to process resume. Please try again.");
        // toast.error("There was an error uploading your resume. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );


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
