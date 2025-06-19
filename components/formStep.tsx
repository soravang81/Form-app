"use client"

import { BasicDetailsStep } from "@/components/steps/basicDetailsField"
import { DocumentCollectionStep } from "@/components/steps/documentCollectionField"
import { StatementOfPurposeStep } from "@/components/steps/purposeField"
import { InterviewAvailabilityStep } from "@/components/steps/interviewAvailabilityField"

interface FormStepProps {
  step: number
}

export function FormStep({ step }: FormStepProps) {
  switch (step) {
    case 0:
      return <BasicDetailsStep />
    case 1:
      return <DocumentCollectionStep />
    case 2:
      return <StatementOfPurposeStep />
    case 3:
      return <InterviewAvailabilityStep />
    default:
      return <BasicDetailsStep />
  }
}
