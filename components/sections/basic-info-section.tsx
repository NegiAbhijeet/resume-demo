"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"

interface BasicInfoSectionProps {
  personalData: any
  socialData: any[]
  profileData: any
  onPersonalChange: (data: any) => void
  onSocialChange: (data: any[]) => void
  onProfileChange: (data: any) => void
}

export function BasicInfoSection({
  personalData,
  socialData,
  profileData,
  onPersonalChange,
  onSocialChange,
  onProfileChange,
}: BasicInfoSectionProps) {
  const handlePersonalChange = (field: string, value: string) => {
    onPersonalChange({
      ...personalData,
      [field]: value,
    })
  }

  const handleProfileChange = (field: string, value: string) => {
    onProfileChange({
      ...profileData,
      [field]: value,
    })
  }

  const handleSocialAdd = () => {
    onSocialChange([...socialData, { platform: "", url: "" }])
  }

  const handleSocialUpdate = (index: number, field: string, value: string) => {
    const updated = socialData.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    onSocialChange(updated)
  }

  const handleSocialRemove = (index: number) => {
    onSocialChange(socialData.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={personalData?.fullName || ""}
                onChange={(e) => handlePersonalChange("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={personalData?.title || ""}
                onChange={(e) => handlePersonalChange("title", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={personalData?.email || ""}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={personalData?.phone || ""}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={personalData?.address || ""}
              onChange={(e) => handlePersonalChange("address", e.target.value)}
              placeholder="City, State, Country"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={profileData?.summary || ""}
              onChange={(e) => handleProfileChange("summary", e.target.value)}
              placeholder="Write a compelling professional summary that highlights your key skills, experience, and career objectives..."
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Tip: Keep it concise (2-3 sentences) and focus on your unique value proposition.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Social Links</CardTitle>
          <Button onClick={handleSocialAdd} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialData.map((social, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Platform</Label>
                <Select value={social.platform} onValueChange={(value) => handleSocialUpdate(index, "platform", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="GitHub">GitHub</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Portfolio">Portfolio</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-2">
                <Label>URL</Label>
                <Input
                  value={social.url}
                  onChange={(e) => handleSocialUpdate(index, "url", e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
              <Button variant="outline" size="sm" onClick={() => handleSocialRemove(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {socialData.length === 0 && <p className="text-muted-foreground text-sm">No social links added yet.</p>}
        </CardContent>
      </Card>
    </div>
  )
}
