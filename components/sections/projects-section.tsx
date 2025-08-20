"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  technologies?: string
  link?: string
}

interface ProjectsSectionProps {
  data: Project[]
  onChange: (data: Project[]) => void
}

export function ProjectsSection({ data, onChange }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<Project[]>(data || [])

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      link: "",
    }
    const updatedProjects = [...projects, newProject]
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  const removeProject = (id: string) => {
    const updatedProjects = projects.filter((project) => project.id !== id)
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    const updatedProjects = projects.map((project) => (project.id === id ? { ...project, [field]: value } : project))
    setProjects(updatedProjects)
    onChange(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              No projects added yet. Click "Add Project" to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={project.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base">Project {index + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
                    <Input
                      id={`project-name-${project.id}`}
                      value={project.name}
                      onChange={(e) => updateProject(project.id, "name", e.target.value)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`project-link-${project.id}`}>Project Link (Optional)</Label>
                    <Input
                      id={`project-link-${project.id}`}
                      value={project.link || ""}
                      onChange={(e) => updateProject(project.id, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-description-${project.id}`}>Description</Label>
                  <Textarea
                    id={`project-description-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, "description", e.target.value)}
                    placeholder="Describe your project, what it does, and your role"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`project-technologies-${project.id}`}>Technologies Used (Optional)</Label>
                  <Input
                    id={`project-technologies-${project.id}`}
                    value={project.technologies || ""}
                    onChange={(e) => updateProject(project.id, "technologies", e.target.value)}
                    placeholder="React, Node.js, MongoDB, etc."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
