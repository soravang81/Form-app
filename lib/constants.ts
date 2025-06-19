import type { FormData } from "@/types/form"

export const DOCUMENT_FIELDS: Array<{
  key: keyof FormData["documents"]
  label: string
  required: boolean
}> = [
  { key: "class10Marksheet", label: "Class 10 Marksheet", required: true },
  { key: "class12Marksheet", label: "Class 12 Marksheet", required: true },
  { key: "graduationMarksheet", label: "Graduation Marksheet", required: true },
  { key: "postGraduationMarksheet", label: "Post Graduation Marksheet", required: false },
  { key: "resume", label: "Resume/CV", required: true },
  { key: "recommendationLetter", label: "Recommendation Letter", required: false },
  { key: "salarySlips", label: "Salary Slips", required: false },
  { key: "others", label: "Others", required: false },
]

export const STATEMENT_QUESTIONS = [
  {
    key: "question1" as const,
    text: "Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?",
  },
  {
    key: "question2" as const,
    text: "Tell me about the last time something significant didn't go according to plan at work. What was your role? What was the outcome?",
  },
  {
    key: "question3" as const,
    text: "What are the three things that are most important to you in a job?",
  },
]

export const TIME_ZONES = [
  "UTC-12:00",
  "UTC-11:00",
  "UTC-10:00",
  "UTC-09:00",
  "UTC-08:00",
  "UTC-07:00",
  "UTC-06:00",
  "UTC-05:00",
  "UTC-04:00",
  "UTC-03:00",
  "UTC-02:00",
  "UTC-01:00",
  "UTC+00:00",
  "UTC+01:00",
  "UTC+02:00",
  "UTC+03:00",
  "UTC+04:00",
  "UTC+05:00",
  "UTC+05:30 (IST)",
  "UTC+06:00",
  "UTC+07:00",
  "UTC+08:00",
  "UTC+09:00",
  "UTC+10:00",
  "UTC+11:00",
  "UTC+12:00",
]

export const INTERVIEW_MEDIUMS = [
  "Video Call (Zoom)",
  "Video Call (Google Meet)",
  "Video Call (Microsoft Teams)",
  "Phone Call",
  "In-Person",
  "Other",
]
