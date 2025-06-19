"use client"

import { useAtomValue, useSetAtom } from "jotai"
import { currentStepAtom, isStepValidAtom } from "@/jotai-store/store"

export function useFormNavigation() {
  const setCurrentStep = useSetAtom(currentStepAtom)
  const isStepValid = useAtomValue(isStepValidAtom)

  const handleNext = (currentStep: number) => {
    if (isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = (currentStep: number) => {
    setCurrentStep(currentStep - 1)
  }

  return { handleNext, handlePrevious }
}
