"use client"

import type React from "react"

import { useState } from "react"
import { useAtom, useSetAtom } from "jotai"
import { formDataAtom, updateFormDataAtom } from "@/jotai-store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useFormNavigation } from "@/hooks/useformNavigation"
import { DOCUMENT_FIELDS } from "@/lib/constants"
import { uploadDocument } from "@/lib/api"
import { DocumentField, DocumentUrls } from "@/types/form"

export function DocumentCollectionStep() {
  const [formData] = useAtom(formDataAtom)
  const updateFormData = useSetAtom(updateFormDataAtom)
  const [uploading, setUploading] = useState<string | null>(null)
  const { handleNext, handlePrevious } = useFormNavigation()

  const handleFileUpload = async (file: File, fieldKey: string) => {
    setUploading(fieldKey)
    try {
      const fileUrl = await uploadDocument(file)
      // const fileUrl = "https://assessments-xhy0.onrender.com/uploads/uploads/172920251040-172920251040.pdf"
      updateFormData({ section: "documents", data: { [fieldKey]: fileUrl } })
      toast.success("Document uploaded successfully")
    } catch (error: unknown) {
      toast.error("Failed to upload document. Please try again." + error)
    } finally {
      setUploading(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldKey: string) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file, fieldKey)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Collection</CardTitle>
        <CardDescription>Please upload the required documents. Fields marked with * are mandatory.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {DOCUMENT_FIELDS.map((field: DocumentField) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>
              {field.label} {field.required && "*"}
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id={field.key}
                type="file"
                onChange={(e) => handleFileChange(e, field.key)}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                disabled={uploading === field.key}
                className="flex-1"
              />
              {uploading === field.key && <Loader2 className="h-4 w-4 animate-spin" />}
              {formData.documents[field.key as keyof DocumentUrls] && (
                <div className="flex items-center text-green-600">
                  <FileText className="h-4 w-4 mr-1" />
                  <span className="text-sm">Uploaded</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => handlePrevious(1)}>
            Previous
          </Button>
          <Button onClick={() => handleNext(1)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
