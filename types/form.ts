export interface BasicDetails {
  name: string
  email: string
  mobileNumber: string
  dateOfBirth: string
}

export interface DocumentUrls {
  class10Marksheet: string
  class12Marksheet: string
  graduationMarksheet: string
  postGraduationMarksheet?: string
  resume: string
  recommendationLetter?: string
  salarySlips?: string
  others?: string
}

export interface DocumentField {
  key: string
  label: string
  required: boolean
}

export interface StatementOfPurpose {
  q1: string
  q2: string
  q3: string[]
}

export interface InterviewAvailability {
  email: string
  location: string
  interviewDate: string
  interviewTime: string
  timeZone: string
  interviewMedium: string
}

export interface FormData {
  basicDetails: BasicDetails
  documents: DocumentUrls
  statementOfPurpose: StatementOfPurpose
  interviewAvailability: InterviewAvailability
  submittedAt: string
}

export interface FormContextType {
  formData: FormData
  updateFormData: (section: keyof FormData, data: any) => void
  currentStep: number
  setCurrentStep: (step: number) => void
  isStepValid: (step: number) => boolean
}
