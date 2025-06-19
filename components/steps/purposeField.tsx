"use client"

import { useAtom, useSetAtom } from "jotai"
import { formDataAtom, updateFormDataAtom } from "@/jotai-store/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useFormNavigation } from "@/hooks/useformNavigation"
import { STATEMENT_QUESTIONS } from "@/lib/constants"
import { getWordCount } from "@/lib/validation"

export function StatementOfPurposeStep() {
  const [formData] = useAtom(formDataAtom)
  const updateFormData = useSetAtom(updateFormDataAtom)
  const { handleNext, handlePrevious } = useFormNavigation()

  const handleInputChange = (field: string, value: string) => {
    if (field === 'question3') {
      updateFormData({ section: "statementOfPurpose", data: { q3: value } })
    } else if (field === 'question1') {
      updateFormData({ section: "statementOfPurpose", data: { q1: value } })
    } else if (field === 'question2') {
      updateFormData({ section: "statementOfPurpose", data: { q2: value } })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statement of Purpose</CardTitle>
        <CardDescription>Please answer all questions. Each answer must be within 300 words.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {STATEMENT_QUESTIONS.map((question, index) => {
          const currentValue = question.key === 'question1' 
            ? formData.statementOfPurpose.q1 
            : question.key === 'question2' 
              ? formData.statementOfPurpose.q2 
              : formData.statementOfPurpose.q3

          const wordCount = Array.isArray(currentValue) 
            ? currentValue.reduce((sum, item) => sum + getWordCount(item), 0)
            : getWordCount(currentValue as string)
          const isOverLimit = wordCount > 300

          return (
            <div key={question.key} className="space-y-2">
              <Label htmlFor={question.key} className="text-sm font-medium">
                Question {index + 1} *
              </Label>
              <p className="text-sm text-muted-foreground mb-2">{question.text}</p>
              <Textarea
                id={question.key}
                value={Array.isArray(currentValue) ? currentValue.join(', ') : currentValue}
                onChange={(e) => handleInputChange(question.key, e.target.value)}
                placeholder={question.key === 'question3' ? "Enter answers separated by commas..." : "Enter your answer here..."}
                className="min-h-[120px]"
                required
              />
              <div className={`text-sm ${isOverLimit ? "text-red-500" : "text-muted-foreground"}`}>
                {wordCount}/300 words
              </div>
            </div>
          )
        })}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => handlePrevious(2)}>
            Previous
          </Button>
          <Button onClick={() => handleNext(2)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}