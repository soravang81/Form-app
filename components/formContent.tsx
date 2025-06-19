"use client"

import { useAtomValue } from "jotai"
import { currentStepAtom, isStepValidAtom } from "@/jotai-store/store"
import { FormStepper } from "@/components/formStepper"
import { FormStep } from "@/components/formStep"

const steps = ["Basic Details", "Document Collection", "Statement of Purpose", "Interview Availability"]

export function FormContent() {
  const currentStep = useAtomValue(currentStepAtom)
  const isStepValid = useAtomValue(isStepValidAtom)

  return (
    <>
      <FormStepper currentStep={currentStep} steps={steps} isStepValid={isStepValid} />
      <div className="mt-8">
        <FormStep step={currentStep} />
      </div>
    </>
  )
}
