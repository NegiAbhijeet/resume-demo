"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  onTemplateSelect: (templateId: string) => void
}

const templates = [
  {
    id: "classic",
    name: "Classic",
    description: "Professional with dark header design",
    preview: "bg-white border-2 border-gray-200",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with contact bar",
    preview: "bg-white border-2 border-blue-200",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant layout",
    preview: "bg-gray-50 border-2 border-gray-300",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with personality",
    preview: "bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-200",
  },
]

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Resume Template</h2>
        <p className="text-muted-foreground text-lg">Select a template that best represents your professional style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="space-y-4">
              {/* Template Preview */}
              <div className={`h-48 rounded-lg ${template.preview} p-4 flex flex-col justify-between`}>
                {template.id === "classic" ? (
                  <div className="space-y-2">
                    {/* Dark header section */}
                    <div className="bg-slate-700 text-white p-2 rounded space-y-1">
                      <div className="h-3 bg-white rounded w-3/4"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-1 bg-gray-400 rounded w-full"></div>
                    </div>
                    {/* Two column layout */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-600 rounded w-full"></div>
                        <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                        <div className="flex gap-1 mt-1">
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                        </div>
                      </div>
                      <div className="col-span-2 space-y-1">
                        <div className="h-2 bg-gray-600 rounded w-full"></div>
                        <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                        <div className="h-1 bg-gray-400 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ) : template.id === "modern" ? (
                  <div className="space-y-2">
                    {/* White header section */}
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-gray-400 rounded w-full mt-2"></div>
                    </div>
                    {/* Blue contact bar */}
                    <div className="bg-blue-600 p-1 rounded flex justify-center gap-2">
                      <div className="h-1 bg-white rounded w-8"></div>
                      <div className="h-1 bg-white rounded w-8"></div>
                    </div>
                    {/* Two column layout */}
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-600 rounded w-full"></div>
                        <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                        <div className="h-1 bg-gray-400 rounded w-3/4"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-600 rounded w-full"></div>
                        <div className="flex gap-1">
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : template.id === "minimal" ? (
                  <div className="space-y-2">
                    {/* Text center space y 1 */}
                    <div className="text-center space-y-1">
                      <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto"></div>
                      <div className="h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-gray-400 rounded w-full mt-2"></div>
                      <div className="flex justify-center gap-2 text-xs">
                        <div className="h-1 bg-teal-500 rounded w-12"></div>
                        <div className="h-1 bg-teal-500 rounded w-12"></div>
                      </div>
                    </div>
                    {/* Two column layout with teal accent bars */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-2 bg-teal-500 rounded"></div>
                          <div className="h-2 bg-gray-700 rounded w-full"></div>
                        </div>
                        <div className="h-1 bg-gray-400 rounded w-4/5 ml-2"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-2 bg-teal-500 rounded"></div>
                          <div className="h-2 bg-gray-700 rounded w-full"></div>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                          <div className="h-1 bg-gray-400 rounded w-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : template.id === "creative" ? (
                  <div className="space-y-2">
                    {/* Flex justify between items start */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-800 rounded w-20"></div>
                        <div className="h-3 bg-gray-600 rounded w-16"></div>
                        <div className="h-2 bg-gray-400 rounded w-24 mt-2"></div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="h-2 bg-gray-500 rounded w-16"></div>
                        <div className="h-2 bg-gray-500 rounded w-12"></div>
                      </div>
                    </div>
                    {/* Grid grid cols 2 gap 2 mt 4 */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="space-y-1">
                        <div className="h-2 bg-purple-600 rounded w-full border-b"></div>
                        <div className="h-1 bg-gray-400 rounded w-4/5"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 bg-purple-600 rounded w-full border-b"></div>
                        <div className="flex gap-1">
                          <div className="h-1 bg-gray-400 rounded w-6"></div>
                          <div className="h-1 bg-gray-400 rounded w-6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-400 rounded w-full mt-4"></div>
                    <div className="h-2 bg-gray-400 rounded w-5/6"></div>
                    <div className="space-y-1 mt-4">
                      <div className="h-2 bg-gray-500 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-500 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-500 rounded w-2/3"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">{template.name}</h3>
                <p className="text-muted-foreground">{template.description}</p>
              </div>

              {/* Select Button */}
              <Button
                onClick={() => onTemplateSelect(template.id)}
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                variant="outline"
              >
                <Check className="h-4 w-4 mr-2" />
                Select Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
