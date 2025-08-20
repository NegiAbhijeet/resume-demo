"use client"

import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"

interface ResumePreviewProps {
  resumeData: any
  template?: string
}

export function ResumePreview({ resumeData, template = "classic" }: ResumePreviewProps) {
  if (!resumeData) {
    return (
      <div className="sticky top-8">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Resume preview will appear here</p>
        </Card>
      </div>
    )
  }

  const { personal, projects, experience, education, skills, social } = resumeData

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          card: "bg-white border-gray-200",
          header: "text-center border-b border-gray-300 pb-4",
          name: "text-gray-900",
          position: "text-gray-700",
          contactBar: "bg-blue-600 text-white p-3 rounded flex justify-center gap-6 text-sm",
          sectionTitle: "text-gray-900 border-b border-gray-400 uppercase tracking-wide text-sm font-bold",
          accent: "text-gray-600",
          skillTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
          interestTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
        }
      case "minimal":
        return {
          card: "bg-white border-gray-200",
          header: "flex justify-between items-start border-b border-gray-300 pb-6",
          name: "text-gray-900",
          position: "text-teal-600",
          sectionTitle: "text-gray-900 border-l-4 border-teal-500 pl-3 uppercase tracking-wide text-sm font-bold",
          accent: "text-gray-600",
          skillTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
          interestTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
        }
      case "creative":
        return {
          card: "bg-white border-gray-200",
          header: "flex justify-between items-start border-b border-gray-300 pb-4",
          name: "text-gray-900",
          position: "text-gray-700",
          sectionTitle: "text-gray-900 border-b border-gray-400 uppercase tracking-wide text-sm font-bold",
          accent: "text-gray-600",
          skillTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
          interestTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
        }
      default: // classic - Updated to match dark header design from screenshot
        return {
          card: "bg-white shadow-lg",
          header: "bg-slate-700 text-white p-6 w-full mb-6",
          name: "text-white",
          position: "text-gray-200",
          sectionTitle: "text-gray-900 border-b border-gray-300 uppercase tracking-wide text-sm font-bold",
          accent: "text-blue-600",
          skillTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
          interestTag: "px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs",
        }
    }
  }

  const styles = getTemplateStyles()

  if (template === "classic") {
    return (
      <div className="sticky top-8" id="printable-area">
        <Card className={`overflow-hidden ${styles.card}`}>
          {/* Dark Header Section */}
          <div className={styles.header}>
            <h1 className={`text-3xl font-bold mb-2 ${styles.name}`}>{personal?.fullName || "Dheeraj Singh"}</h1>
            <p className={`text-lg mb-3 ${styles.position}`}>{personal?.position || "Professional Title"}</p>
            <p className="text-gray-300 leading-relaxed">Short and engaging pitch about yourself.</p>
          </div>

          <div className="p-8 pt-0">
            {/* Contact Info and Main Content Layout */}
            <div className="grid grid-cols-4 gap-6">
              {/* Left Sidebar - Contact, Skills, Languages, Interests */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{personal?.email || "dheerajkapkoti28@gmail.com"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{personal?.phone || "Phone Number"}</span>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>SKILLS</h2>
                  {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {skills.map((skill: string, index: number) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.skillTag}>Skill</span>
                  )}
                </div>

                {/* Languages */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>LANGUAGES</h2>
                  <div>
                    <p className="text-gray-700 text-sm">Language</p>
                    <p className="text-gray-600 text-xs italic">Full Professional Proficiency</p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>INTERESTS</h2>
                  <span className={styles.interestTag}>Interest</span>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-span-3 space-y-6">
                {/* Education */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>EDUCATION</h2>
                  {education && education.length > 0 ? (
                    <div className="space-y-3">
                      {education.map((edu: any) => (
                        <div key={edu.id}>
                          <p className="font-semibold text-gray-900">{edu.degree || "Study Program"}</p>
                          <p className="text-gray-700">{edu.institution || "Institution/Place of Education"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Study Program</p>
                      <p className="text-gray-700">Institution/Place of Education</p>
                    </div>
                  )}
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>WORK EXPERIENCE</h2>
                  {experience && experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp: any) => (
                        <div key={exp.id}>
                          <p className="font-semibold text-gray-900">{exp.position || "Title/Position"}</p>
                          <p className="text-gray-700">{exp.company || "Workplace/Company"}</p>
                          {exp.description && <p className="text-gray-700 text-sm mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Title/Position</p>
                      <p className="text-gray-700">Workplace/Company</p>
                    </div>
                  )}
                </div>

                {/* Organizations */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>ORGANIZATIONS</h2>
                  <p className="text-gray-700">Organization Name</p>
                </div>

                {/* Certificates */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>CERTIFICATES</h2>
                  <p className="text-gray-700">Certificate Name</p>
                </div>

                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>PERSONAL PROJECTS</h2>
                  {projects && projects.length > 0 ? (
                    <div className="space-y-4">
                      {projects.map((project: any) => (
                        <div key={project.id}>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                          {project.technologies && (
                            <p className="text-gray-600 text-xs mt-1">Technologies: {project.technologies}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">Project Name</p>
                  )}
                </div>

                {/* Achievements */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>ACHIEVEMENTS</h2>
                  <p className="text-gray-700">Achievement Name</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (template === "modern") {
    return (
      <div className="sticky top-8">
        <Card className={`overflow-hidden ${styles.card}`}>
          <div className="p-8">
            {/* Header - Name and Title */}
            <div className={styles.header}>
              <h1 className={`text-3xl font-bold mb-2 ${styles.name}`}>{personal?.fullName || "Dheeraj Singh"}</h1>
              <p className={`text-lg mb-3 ${styles.position}`}>{personal?.position || "Professional Title"}</p>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Short and engaging pitch about yourself.
              </p>
            </div>

            {/* Contact Bar */}
            <div className={styles.contactBar}>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personal?.email || "dheerajkapkoti28@gmail.com"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{personal?.phone || "Phone Number"}</span>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8 mt-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Education */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>EDUCATION</h2>
                  {education && education.length > 0 ? (
                    <div className="space-y-3">
                      {education.map((edu: any) => (
                        <div key={edu.id}>
                          <p className="font-semibold text-gray-900">{edu.degree || "Study Program"}</p>
                          <p className="text-gray-700">{edu.institution || "Institution/Place of Education"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Study Program</p>
                      <p className="text-gray-700">Institution/Place of Education</p>
                    </div>
                  )}
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>WORK EXPERIENCE</h2>
                  {experience && experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp: any) => (
                        <div key={exp.id}>
                          <p className="font-semibold text-gray-900">{exp.position || "Title/Position"}</p>
                          <p className="text-gray-700">{exp.company || "Workplace/Company"}</p>
                          {exp.description && <p className="text-gray-700 text-sm mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Title/Position</p>
                      <p className="text-gray-700">Workplace/Company</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>SKILLS</h2>
                  {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, index: number) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.skillTag}>Skill</span>
                  )}
                </div>

                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>PERSONAL PROJECTS</h2>
                  {projects && projects.length > 0 ? (
                    <div className="space-y-3">
                      {projects.map((project: any) => (
                        <div key={project.id}>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                          {project.technologies && (
                            <p className="text-gray-600 text-xs mt-1">Tech: {project.technologies}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">Project Name</p>
                  )}
                </div>

                {/* Organizations */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>ORGANIZATIONS</h2>
                  <p className="text-gray-700">Organization Name</p>
                </div>

                {/* Certificates */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>CERTIFICATES</h2>
                  <p className="text-gray-700">Certificate Name</p>
                </div>

                {/* Languages */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>LANGUAGES</h2>
                  <div>
                    <p className="text-gray-700">Language</p>
                    <p className="text-gray-600 text-sm italic">Full Professional Proficiency</p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>INTERESTS</h2>
                  <span className={styles.interestTag}>Interest</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (template === "creative") {
    return (
      <div className="sticky top-8">
        <Card className={`p-8 ${styles.card}`}>
          <div className="space-y-6">
            {/* Header - Name on left, contact on right */}
            <div className={styles.header}>
              <div className="space-y-2">
                <h1 className={`text-3xl font-bold ${styles.name}`}>{personal?.fullName || "Dheeraj Singh"}</h1>
                <p className={`text-lg ${styles.position}`}>{personal?.position || "Professional Title"}</p>
                <p className="text-gray-700 leading-relaxed max-w-md">Short and engaging pitch about yourself.</p>
              </div>
              <div className="text-right space-y-1 text-sm">
                <div className="flex items-center justify-end gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{personal?.email || "dheerajkapkoti28@gmail.com"}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personal?.phone || "Phone Number"}</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Education */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>EDUCATION</h2>
                  {education && education.length > 0 ? (
                    <div className="space-y-3">
                      {education.map((edu: any) => (
                        <div key={edu.id}>
                          <p className="font-semibold text-gray-900">{edu.degree || "Study Program"}</p>
                          <p className="text-gray-700">{edu.institution || "Institution/Place of Education"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Study Program</p>
                      <p className="text-gray-700">Institution/Place of Education</p>
                    </div>
                  )}
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>WORK EXPERIENCE</h2>
                  {experience && experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp: any) => (
                        <div key={exp.id}>
                          <p className="font-semibold text-gray-900">{exp.position || "Title/Position"}</p>
                          <p className="text-gray-700">{exp.company || "Workplace/Company"}</p>
                          {exp.description && <p className="text-gray-700 text-sm mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Title/Position</p>
                      <p className="text-gray-700">Workplace/Company</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>SKILLS</h2>
                  {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, index: number) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.skillTag}>Skill</span>
                  )}
                </div>

                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>PERSONAL PROJECTS</h2>
                  {projects && projects.length > 0 ? (
                    <div className="space-y-3">
                      {projects.map((project: any) => (
                        <div key={project.id}>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                          {project.technologies && (
                            <p className="text-gray-600 text-xs mt-1">Tech: {project.technologies}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">Project Name</p>
                  )}
                </div>

                {/* Organizations */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>ORGANIZATIONS</h2>
                  <p className="text-gray-700">Organization Name</p>
                </div>

                {/* Certificates */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>CERTIFICATES</h2>
                  <p className="text-gray-700">Certificate Name</p>
                </div>

                {/* Languages */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>LANGUAGES</h2>
                  <div>
                    <p className="text-gray-700">Language</p>
                    <p className="text-gray-600 text-sm italic">Full Professional Proficiency</p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>INTERESTS</h2>
                  <span className={styles.interestTag}>Interest</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (template === "minimal") {
    return (
      <div className="sticky top-8">
        <Card className={`p-8 ${styles.card}`}>
          <div className="space-y-6">
            {/* Header - Name and Title */}
            <div className="flex justify-between items-start border-b border-gray-300 pb-6">
              <div className="space-y-2">
                <h1 className={`text-3xl font-bold ${styles.name}`}>{personal?.fullName || "Dheeraj Singh"}</h1>
                <p className={`text-lg ${styles.position}`}>{personal?.position || "Professional Title"}</p>
                <p className="text-gray-700 leading-relaxed max-w-md">Short and engaging pitch about yourself.</p>
              </div>
              <div className="text-right space-y-1 text-sm">
                <div className="flex items-center justify-end gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{personal?.email || "dheerajkapkoti28@gmail.com"}</span>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{personal?.phone || "Phone Number"}</span>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Education */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>EDUCATION</h2>
                  {education && education.length > 0 ? (
                    <div className="space-y-3">
                      {education.map((edu: any) => (
                        <div key={edu.id}>
                          <p className="font-semibold text-gray-900">{edu.degree || "Study Program"}</p>
                          <p className="text-gray-700">{edu.institution || "Institution/Place of Education"}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Study Program</p>
                      <p className="text-gray-700">Institution/Place of Education</p>
                    </div>
                  )}
                </div>

                {/* Work Experience */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>WORK EXPERIENCE</h2>
                  {experience && experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp: any) => (
                        <div key={exp.id}>
                          <p className="font-semibold text-gray-900">{exp.position || "Title/Position"}</p>
                          <p className="text-gray-700">{exp.company || "Workplace/Company"}</p>
                          {exp.description && <p className="text-gray-700 text-sm mt-1">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="font-semibold text-gray-900">Title/Position</p>
                      <p className="text-gray-700">Workplace/Company</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>SKILLS</h2>
                  {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill: string, index: number) => (
                        <span key={index} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className={styles.skillTag}>Skill</span>
                  )}
                </div>

                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>PERSONAL PROJECTS</h2>
                  {projects && projects.length > 0 ? (
                    <div className="space-y-3">
                      {projects.map((project: any) => (
                        <div key={project.id}>
                          <p className="font-semibold text-gray-900">{project.name}</p>
                          {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                          {project.technologies && (
                            <p className="text-gray-600 text-xs mt-1">Tech: {project.technologies}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">Project Name</p>
                  )}
                </div>

                {/* Organizations */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>ORGANIZATIONS</h2>
                  <p className="text-gray-700">Organization Name</p>
                </div>

                {/* Certificates */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>CERTIFICATES</h2>
                  <p className="text-gray-700">Certificate Name</p>
                </div>

                {/* Languages */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>LANGUAGES</h2>
                  <div>
                    <p className="text-gray-700">Language</p>
                    <p className="text-gray-600 text-sm italic">Full Professional Proficiency</p>
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h2 className={`mb-3 pb-1 ${styles.sectionTitle}`}>INTERESTS</h2>
                  <span className={styles.interestTag}>Interest</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="sticky top-8">
      <Card className={`p-8 ${styles.card}`}>
        <div className="space-y-6">
          {/* Header */}
          <div className={`text-center ${styles.header}`}>
            <h1 className={`text-3xl font-bold mb-2 ${styles.name}`}>{personal?.fullName || "Your Name"}</h1>
            <p className={`text-xl mb-4 ${styles.position}`}>{personal?.position || "Your Position"}</p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {personal?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {personal.email}
                </div>
              )}
              {personal?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {personal.phone}
                </div>
              )}
              {personal?.address && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {personal.address}
                </div>
              )}
            </div>

            {social && social.length > 0 && (
              <div className="flex justify-center gap-4 mt-3">
                {social.map((item: any, index: number) => (
                  <div key={index} className={`flex items-center gap-1 text-sm ${styles.accent}`}>
                    {getSocialIcon(item.platform)}
                    <span>{item.url}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {projects && projects.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold mb-3 pb-1 ${styles.sectionTitle}`}>Projects</h2>
              <div className="space-y-4">
                {projects.map((project: any) => (
                  <div key={project.id}>
                    <h3 className="font-semibold text-gray-900">{project.name}</h3>
                    {project.description && <p className="text-gray-700 text-sm mt-1">{project.description}</p>}
                    {project.technologies && (
                      <p className="text-gray-600 text-xs mt-1">Technologies: {project.technologies}</p>
                    )}
                    {project.link && <p className="text-blue-600 text-xs mt-1">{project.link}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold mb-3 pb-1 ${styles.sectionTitle}`}>Work Experience</h2>
              <div className="space-y-4">
                {experience.map((exp: any) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.company}</h3>
                        <p className="text-gray-700">{exp.position}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    {exp.description && <p className="text-gray-700 text-sm mt-2">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold mb-3 pb-1 ${styles.sectionTitle}`}>Education</h2>
              <div className="space-y-3">
                {education.map((edu: any) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-gray-700">{edu.institution}</p>
                      </div>
                      <span className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className={`text-lg font-bold mb-3 pb-1 ${styles.sectionTitle}`}>Technical Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
