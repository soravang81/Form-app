import type { FormData } from "@/types/form"

export function validateStep(step: number, formData: FormData): boolean {
  switch (step) {
    case 0:
      return validateBasicDetails(formData.basicDetails)
    case 1:
      return validateDocuments(formData.documents)
    case 2:
      return validateStatementOfPurpose(formData.statementOfPurpose)
    case 3:
      return validateInterviewAvailability(formData.interviewAvailability)
    default:
      console.log("Invalid step")
      return false
  }
}

export function validateBasicDetails(data: FormData["basicDetails"]): boolean {
  const { name, email } = data
  return name.trim() !== "" && email.trim() !== "" && email.includes("@") && email.includes(".")
}

export function validateDocuments(data: FormData["documents"]): boolean {
  const { class10Marksheet, class12Marksheet, graduationMarksheet, resume } = data
  return class10Marksheet !== "" && class12Marksheet !== "" && graduationMarksheet !== "" && resume !== "" 
}

export function validateStatementOfPurpose(data: FormData["statementOfPurpose"]): boolean {
  const { q1, q2, q3 } = data
  
  return (
    q1.trim() !== "" &&
    q2.trim() !== "" &&
    getWordCount(q1) <= 300 &&
    getWordCount(q2) <= 300 &&
    getWordCount(q3) <= 300
  )
}

export function validateInterviewAvailability(data: FormData["interviewAvailability"]): boolean {
  const { email, location, interviewDate, interviewTime, timeZone, interviewMedium } = data
  return (
    email.trim() !== "" &&
    location.trim() !== "" &&
    interviewDate !== "" &&
    interviewTime !== "" &&
    timeZone !== "" &&
    interviewMedium !== ""
  )
}

export function getWordCount(text: string | undefined | null): number {
  if (!text) return 0
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}
