import type { FormData } from "@/types/form"

export async function uploadDocument(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("https://assessments-xhy0.onrender.com/upload-file", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Upload failed")
  }

  const result = await response.json()
  console.log(result)
  return result.url
}

export async function submitForm(formData: FormData): Promise<void> {
    const { q1, q2, q3 } = formData.statementOfPurpose;
    const q3Array = q3.split(',').map(s => s.trim()).filter(Boolean);

    const formDataToSend = {
        ...formData,
        submittedAt: new Date().toISOString(),
        statementOfPurpose: {
            q1,
            q2,
            q3: q3Array
          }
    }
    console.log(formDataToSend)
  const response = await fetch("https://assessments-xhy0.onrender.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataToSend),
  })

  if (!response.ok) {
    throw new Error("Submission failed")
  }
}