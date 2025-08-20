import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function POST(request: NextRequest) {
  try {
    const { template, ...resumeData } = await request.json()

    // Create new PDF document
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = margin

    const templateStyles = {
      classic: {
        headerBg: [71, 85, 105], // slate-600
        headerText: [255, 255, 255], // white
        accentColor: [71, 85, 105], // slate-600
        sectionColor: [71, 85, 105], // slate-600
        textColor: [0, 0, 0], // black
      },
      modern: {
        headerBg: [255, 255, 255], // white
        headerText: [0, 0, 0], // black
        accentColor: [59, 130, 246], // blue-500
        sectionColor: [59, 130, 246], // blue-500
        textColor: [0, 0, 0], // black
        contactBarBg: [59, 130, 246], // blue-500
      },
      minimal: {
        headerBg: [255, 255, 255], // white
        headerText: [0, 0, 0], // black
        accentColor: [20, 184, 166], // teal-500
        sectionColor: [20, 184, 166], // teal-500
        textColor: [0, 0, 0], // black
      },
      creative: {
        headerBg: [255, 255, 255], // white
        headerText: [0, 0, 0], // black
        accentColor: [139, 69, 19], // brown
        sectionColor: [139, 69, 19], // brown
        textColor: [0, 0, 0], // black
      },
    }

    const currentStyle = templateStyles[template as keyof typeof templateStyles] || templateStyles.classic

    // Helper function to add text with word wrapping and color support
    const addText = (text: string, x: number, y: number, options: any = {}) => {
      const fontSize = options.fontSize || 10
      const maxWidth = options.maxWidth || pageWidth - 2 * margin
      const lineHeight = options.lineHeight || fontSize * 1.2
      const color = options.color || currentStyle.textColor

      doc.setFontSize(fontSize)
      doc.setTextColor(color[0], color[1], color[2])
      if (options.bold) doc.setFont("helvetica", "bold")
      else doc.setFont("helvetica", "normal")

      const lines = doc.splitTextToSize(text, maxWidth)
      lines.forEach((line: string, index: number) => {
        doc.text(line, x, y + index * lineHeight)
      })

      return y + lines.length * lineHeight
    }

    if (template === "classic") {
      // Classic template with dark header
      if (resumeData.personal) {
        const { fullName, position, summary, email, phone } = resumeData.personal

        // Dark header background
        doc.setFillColor(currentStyle.headerBg[0], currentStyle.headerBg[1], currentStyle.headerBg[2])
        doc.rect(0, 0, pageWidth, 50, "F")

        if (fullName) {
          yPosition =
            addText(fullName, margin, yPosition + 5, {
              fontSize: 20,
              bold: true,
              color: currentStyle.headerText,
            }) + 2
        }

        if (position) {
          yPosition =
            addText(position, margin, yPosition, {
              fontSize: 12,
              color: currentStyle.headerText,
            }) + 2
        }

        if (summary || resumeData.summary) {
          yPosition =
            addText(summary || resumeData.summary, margin, yPosition, {
              fontSize: 10,
              color: currentStyle.headerText,
            }) + 10
        }

        yPosition = 60 // Reset position after header
      }
    } else if (template === "modern") {
      // Modern template with contact bar
      if (resumeData.personal) {
        const { fullName, position, summary, email, phone } = resumeData.personal

        if (fullName) {
          yPosition =
            addText(fullName, pageWidth / 2, yPosition, {
              fontSize: 20,
              bold: true,
            }) + 2
        }

        if (position) {
          yPosition =
            addText(position, pageWidth / 2, yPosition, {
              fontSize: 12,
              color: currentStyle.accentColor,
            }) + 2
        }

        if (summary || resumeData.summary) {
          yPosition =
            addText(summary || resumeData.summary, pageWidth / 2, yPosition, {
              fontSize: 10,
            }) + 5
        }

        // Contact bar
        if (email || phone) {
          doc.setFillColor(currentStyle.contactBarBg[0], currentStyle.contactBarBg[1], currentStyle.contactBarBg[2])
          doc.rect(0, yPosition, pageWidth, 15, "F")

          const contactInfo = []
          if (email) contactInfo.push(email)
          if (phone) contactInfo.push(phone)

          yPosition =
            addText(contactInfo.join(" | "), margin, yPosition + 10, {
              fontSize: 10,
              color: [255, 255, 255],
            }) + 10
        }
      }
    } else {
      // Default header for minimal and creative templates
      if (resumeData.personal) {
        const { fullName, position, summary, email, phone } = resumeData.personal

        if (fullName) {
          yPosition = addText(fullName, margin, yPosition, { fontSize: 20, bold: true }) + 2
        }

        if (position) {
          yPosition =
            addText(position, margin, yPosition, {
              fontSize: 12,
              color: currentStyle.accentColor,
            }) + 2
        }

        if (summary || resumeData.summary) {
          yPosition = addText(summary || resumeData.summary, margin, yPosition, { fontSize: 10 }) + 5
        }

        // Contact info on the right
        if (email || phone) {
          const contactInfo = []
          if (email) contactInfo.push(email)
          if (phone) contactInfo.push(phone)

          yPosition = addText(contactInfo.join(" | "), margin, yPosition, { fontSize: 10 }) + 15
        }
      }
    }

    const addSectionHeader = (title: string, y: number) => {
      if (template === "minimal") {
        // Add teal accent bar for minimal template
        doc.setFillColor(currentStyle.accentColor[0], currentStyle.accentColor[1], currentStyle.accentColor[2])
        doc.rect(margin - 5, y - 5, 3, 12, "F")
      }

      return (
        addText(title, margin, y, {
          fontSize: 12,
          bold: true,
          color: currentStyle.sectionColor,
        }) + 5
      )
    }

    // Add line separator
    doc.setDrawColor(0, 0, 0)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Summary Section
    if (resumeData.summary && template !== "classic" && template !== "modern") {
      yPosition = addSectionHeader("SUMMARY", yPosition)
      yPosition = addText(resumeData.summary, margin, yPosition, { fontSize: 10 }) + 15
    }

    // Experience Section
    if (resumeData.experience && resumeData.experience.length > 0) {
      yPosition = addSectionHeader("WORK EXPERIENCE", yPosition)

      resumeData.experience.forEach((exp: any) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage()
          yPosition = margin
        }

        yPosition = addText(exp.company, margin, yPosition, { fontSize: 11, bold: true }) + 2
        yPosition = addText(exp.position, margin, yPosition, { fontSize: 10 }) + 2

        const dateRange = `${exp.startDate} - ${exp.endDate || "Present"}`
        yPosition = addText(dateRange, margin, yPosition, { fontSize: 9 }) + 5

        if (exp.description) {
          yPosition = addText(exp.description, margin, yPosition, { fontSize: 10 }) + 10
        }
      })
    }

    // Education Section
    if (resumeData.education && resumeData.education.length > 0) {
      yPosition = addSectionHeader("EDUCATION", yPosition)

      resumeData.education.forEach((edu: any) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = margin
        }

        yPosition = addText(edu.degree, margin, yPosition, { fontSize: 11, bold: true }) + 2
        yPosition = addText(edu.institution, margin, yPosition, { fontSize: 10 }) + 2

        const dateRange = `${edu.startDate} - ${edu.endDate}`
        yPosition = addText(dateRange, margin, yPosition, { fontSize: 9 }) + 10
      })
    }

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      yPosition = addSectionHeader("SKILLS", yPosition)
      const skillsText = resumeData.skills.join(", ")
      yPosition = addText(skillsText, margin, yPosition, { fontSize: 10 }) + 10
    }

    // Personal Projects Section
    if (resumeData.projects && resumeData.projects.length > 0) {
      yPosition = addSectionHeader("PERSONAL PROJECTS", yPosition)
      resumeData.projects.forEach((project: any) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = margin
        }
        yPosition = addText(project.name || project.title, margin, yPosition, { fontSize: 11, bold: true }) + 2
        if (project.description) {
          yPosition = addText(project.description, margin, yPosition, { fontSize: 10 }) + 8
        }
      })
    }

    // Organizations Section
    if (resumeData.organizations && resumeData.organizations.length > 0) {
      yPosition = addSectionHeader("ORGANIZATIONS", yPosition)
      resumeData.organizations.forEach((org: any) => {
        yPosition = addText(org.name, margin, yPosition, { fontSize: 10 }) + 5
      })
    }

    // Certificates Section
    if (resumeData.certificates && resumeData.certificates.length > 0) {
      yPosition = addSectionHeader("CERTIFICATES", yPosition)
      resumeData.certificates.forEach((cert: any) => {
        yPosition = addText(cert.name, margin, yPosition, { fontSize: 10 }) + 5
      })
    }

    // Languages Section
    if (resumeData.languages && resumeData.languages.length > 0) {
      yPosition = addSectionHeader("LANGUAGES", yPosition)
      resumeData.languages.forEach((lang: any) => {
        const langText = `${lang.name} - ${lang.proficiency}`
        yPosition = addText(langText, margin, yPosition, { fontSize: 10 }) + 5
      })
    }

    // Interests Section
    if (resumeData.interests && resumeData.interests.length > 0) {
      yPosition = addSectionHeader("INTERESTS", yPosition)
      const interestsText = resumeData.interests.join(", ")
      yPosition = addText(interestsText, margin, yPosition, { fontSize: 10 }) + 10
    }

    // Generate PDF buffer
    const pdfBuffer = doc.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=resume.pdf",
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
