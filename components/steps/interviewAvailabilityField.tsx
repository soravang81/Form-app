"use client"

import { useState } from "react"
import { useAtom, useSetAtom } from "jotai"
import { formDataAtom, updateFormDataAtom } from "@/jotai-store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useFormNavigation } from "@/hooks/useformNavigation"
import { TIME_ZONES, INTERVIEW_MEDIUMS } from "@/lib/constants"
import { submitForm } from "@/lib/api"

export function InterviewAvailabilityStep() {
  const [formData] = useAtom(formDataAtom)
  const updateFormData = useSetAtom(updateFormDataAtom)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handlePrevious } = useFormNavigation()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ section: "interviewAvailability", data: { [field]: value } })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await submitForm(formData)
      toast.success("Your application has been submitted successfully.")
    } catch (error: unknown) {
      toast.error("Failed to submit application. Please try again." + error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Availability</CardTitle>
        <CardDescription>Please provide your interview availability details. All fields are mandatory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="interview-email">Email *</Label>
          <Input
            id="interview-email"
            type="email"
            value={formData.interviewAvailability.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email for interview coordination"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.interviewAvailability.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="Enter your preferred location"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="interview-date">Interview Date *</Label>
            <Input
              id="interview-date"
              type="date"
              value={formData.interviewAvailability.interviewDate}
              onChange={(e) => handleInputChange("interviewDate", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interview-time">Interview Time *</Label>
            <Input
              id="interview-time"
              type="time"
              value={formData.interviewAvailability.interviewTime}
              onChange={(e) => handleInputChange("interviewTime", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timezone">Time Zone *</Label>
          <Select
            value={formData.interviewAvailability.timeZone}
            onValueChange={(value) => handleInputChange("timeZone", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your time zone" />
            </SelectTrigger>
            <SelectContent>
              {TIME_ZONES.map((tz: string) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interview-medium">Interview Medium *</Label>
          <Select
            value={formData.interviewAvailability.interviewMedium}
            onValueChange={(value) => handleInputChange("interviewMedium", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select interview medium" />
            </SelectTrigger>
            <SelectContent>
              {INTERVIEW_MEDIUMS.map((medium: string) => (
                <SelectItem key={medium} value={medium}>
                  {medium}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => handlePrevious(3)}>
            Previous
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
