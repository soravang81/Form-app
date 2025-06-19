"use client"

import { atom } from "jotai"
import type { FormData } from "@/types/form"
import { validateStep } from "@/lib/validation"

const initialFormData: FormData = {
  basicDetails: {
    name: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
  },
  documents: {
    class10Marksheet: "",
    class12Marksheet: "",
    graduationMarksheet: "",
    postGraduationMarksheet: "",
    resume: "",
    recommendationLetter: "",
    salarySlips: "",
    others: "",
  },
  statementOfPurpose: {
    q1: "",
    q2: "",
    q3: [""],
  },
  interviewAvailability: {
    email: "",
    location: "",
    interviewDate: "",
    interviewTime: "",
    timeZone: "",
    interviewMedium: "",
  },
  submittedAt: "",
}

export const formDataAtom = atom<FormData>(initialFormData)
export const currentStepAtom = atom<number>(0)

export const updateFormDataAtom = atom(null, (get, set, update: { section: keyof FormData; data: Record<string, unknown> }) => {
  const currentData = get(formDataAtom)
  set(formDataAtom, {
    ...currentData,
    [update.section]: { ...(currentData[update.section] as unknown as Record<string, unknown>), ...update.data },
  })
})

export const isStepValidAtom = atom((get) => (step: number): boolean => {
  const formData = get(formDataAtom)
  console.log(formData)
  console.log(step)
  console.log(validateStep(step, formData))
  return validateStep(step, formData)
})
