"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, Linkedin, Github, Globe, Twitter } from "lucide-react"

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface SocialSectionProps {
  data: SocialLink[]
  onChange: (data: SocialLink[]) => void
}

const platforms = [
  { value: "LinkedIn", label: "LinkedIn", icon: Linkedin },
  { value: "GitHub", label: "GitHub", icon: Github },
  { value: "Twitter", label: "Twitter", icon: Twitter },
  { value: "Website", label: "Personal Website", icon: Globe },
  { value: "Portfolio", label: "Portfolio", icon: Globe },
]

export function SocialSection({ data, onChange }: SocialSectionProps) {
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: "",
      url: "",
    }
    onChange([...data, newLink])
  }

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    const updated = data.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    onChange(updated)
  }

  const removeSocialLink = (id: string) => {
    onChange(data.filter((link) => link.id !== id))
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find((p) => p.value === platform)
    if (platformData) {
      const Icon = platformData.icon
      return <Icon className="h-4 w-4" />
    }
    return <Globe className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Social Media & Links</h3>
          <p className="text-sm text-muted-foreground">
            Add your professional social media profiles and portfolio links.
          </p>
        </div>
        <Button onClick={addSocialLink} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((link) => (
          <Card key={link.id} className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getPlatformIcon(link.platform)}
                <h4 className="font-medium text-foreground">Social Link</h4>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeSocialLink(link.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`platform-${link.id}`}>Platform</Label>
                <Select value={link.platform} onValueChange={(value) => updateSocialLink(link.id, "platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        <div className="flex items-center gap-2">
                          <platform.icon className="h-4 w-4" />
                          {platform.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`url-${link.id}`}>URL</Label>
                <Input
                  id={`url-${link.id}`}
                  type="url"
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </Card>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No social links added yet.</p>
            <Button onClick={addSocialLink} variant="outline" className="mt-2 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Link
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
