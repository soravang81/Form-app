import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormStepperProps {
  currentStep: number
  steps: string[]
  isStepValid: (step: number) => boolean
}

export function FormStepper({ currentStep, steps, isStepValid }: FormStepperProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-primary bg-background text-primary"
                      : "border-muted-foreground/30 bg-background text-muted-foreground",
                )}
              >
                {index < currentStep && isStepValid(index) ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <div className="mt-2 text-center">
                <div
                  className={cn(
                    "text-sm font-medium",
                    index <= currentStep ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn("mx-4 h-0.5 w-16 bg-muted-foreground/30", index < currentStep ? "bg-primary" : "")} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
