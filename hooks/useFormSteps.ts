import { useState } from "react";
import { Path, UseFormReturn } from "react-hook-form"
import { toast } from "sonner";

export interface Step {
  title: string;
  description?: string;
  disabled?: boolean;
  fields: string[];
}

export function useFormSteps<T extends object>(form: UseFormReturn<T>, steps: Step[]) {

  const [currentStep, setCurrentStep] = useState<number>(0)

  const validateStep = async (stepIndex: number) => {
    const fields = steps[stepIndex].fields || []
    const isValid = await form.trigger(fields as Path<T>[], {
      shouldFocus: true
    })
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (!isValid) {
      toast.error('Complete the required fields')
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, (steps.length - 1)))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex === currentStep || steps[stepIndex].disabled) return

    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex)
      return
    }

    // Validar todos los pasos intermedios antes de avanzar
    for (let i = currentStep; i < stepIndex; i++) {
      const isValid = await validateStep(i)
      if (!isValid) {
        toast.error(`Complete required fields in step ${steps[i].title}`)
        return // detener solo si hay error
      }
    }

    // Si todos los pasos anteriores son válidos, avanzar
    setCurrentStep(stepIndex)
  }

  const resetSteps = async () => {
    setCurrentStep(0)
  }

  return {
    currentStep,
    steps: steps.map(step => ({
      description: step.description,
      title: step.title,
      disabled: step.disabled
    })),
    validateStep,
    handleNext,
    handleBack,
    handleStepClick,
    resetSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === (steps.length - 1)
  }

}