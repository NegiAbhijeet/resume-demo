"use client"

import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Search } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void
}

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Professional with dark header design",
    image: "/1.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with contact bar",
    image: "/2.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant layout",
    image: "/3.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with personality",
    image: "/4.png",
  },
]

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const [openImage, setOpenImage] = useState<string | null>(null)

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-foreground mb-3">Choose Your Resume Template</h2>
        <p className="text-muted-foreground text-lg">Pick the layout that best fits your style and profession</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="relative overflow-hidden py-0 gap-0 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            {/* Image Section */}
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenImage(template.image)}
            >
              <Image
                src={template.image}
                alt={template.name}
                width={600}
                height={400}
                className="w-full h-64 object-contain transition-transform group-hover:scale-105 duration-300"
              />

              {/* Gradient Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end">
                <h3 className="text-white text-xl font-semibold">{template.name}</h3>
                <p className="text-gray-200 text-sm">{template.description}</p>
              </div>

              {/* Magnifier Icon */}
              <div className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1 transition">
                <Search className="h-5 w-5 text-gray-800" />
              </div>
            </div>

            {/* Select Button */}
            <div className="p-4">
              <Button
                onClick={() => onTemplateSelect(template.id)}
                className="w-full"
                variant="outline"
              >
                <Check className="h-4 w-4 mr-2" />
                Select Template
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog open={!!openImage} onOpenChange={() => setOpenImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {openImage && (
            <Image
              src={openImage}
              alt="Template Full Preview"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
