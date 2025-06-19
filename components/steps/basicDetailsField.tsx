"use client"

import { useAtom, useSetAtom } from "jotai"
import { formDataAtom, updateFormDataAtom } from "@/jotai-store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormNavigation } from "@/hooks/useformNavigation"

export function BasicDetailsStep() {
  const [formData] = useAtom(formDataAtom)
  const updateFormData = useSetAtom(updateFormDataAtom)
  const { handleNext } = useFormNavigation()

  const handleInputChange = (field: string, value: string) => {
    updateFormData({ section: "basicDetails", data: { [field]: value } })
  }

  const getFieldError = (field: string) => {
    if (field === "name" && formData.basicDetails.name.trim() === "") {
      return "Name is required."
    }
    if (field === "email") {
      if (formData.basicDetails.email.trim() === "") return "Email is required."
      if (!formData.basicDetails.email.includes("@")) return "Email is invalid."
    }
    if (field === "mobileNumber") {
      const mobile = formData.basicDetails.mobileNumber.trim()
      if (mobile && !/^\d{10}$/.test(mobile)) return "Mobile number must be 10 digits."
    }
    if (field === "dateOfBirth") {
      const dob = formData.basicDetails.dateOfBirth
      if (dob) {
        const birthDate = new Date(dob)
        const today = new Date()
        if (birthDate > today) return "Birth date cannot be in the future."
        const age = today.getFullYear() - birthDate.getFullYear()
        if (age < 18) return "You must be at least 18 years old."
      }
    }
    return ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
        <CardDescription>Please provide your basic information. Fields marked with * are mandatory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.basicDetails.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
            required
          />
          {getFieldError("name") && <div className="text-sm text-red-500">{getFieldError("name")}</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.basicDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            required
          />
          {getFieldError("email") && <div className="text-sm text-red-500">{getFieldError("email")}</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            type="tel"
            value={formData.basicDetails.mobileNumber}
            onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
            placeholder="Enter your mobile number"
          />
          {getFieldError("mobileNumber") && <div className="text-sm text-red-500">{getFieldError("mobileNumber")}</div>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={formData.basicDetails.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
          {getFieldError("dateOfBirth") && <div className="text-sm text-red-500">{getFieldError("dateOfBirth")}</div>}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => handleNext(0)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
