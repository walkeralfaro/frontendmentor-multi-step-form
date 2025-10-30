'use client'

import { formSchema, FormType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormPersonalFields from "./FormPersonalFields";
import FormPlanFields from "./FormPlanFields";
import FormAddonsFields from "./FormAddonsFields";
import { useFormSteps } from "@/hooks/useFormSteps";
import { FormSteps } from "./FormSteps";
import { useMemo } from "react";
import { Button } from "../ui/button";
import StepProgressBar from "../app/step-progress-bar";
import StepProgressLabel from "../app/step-progress-label";

export default function FormComponent() {

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      plan: "arcade",
      period: "monthly",
      onlineservice: false,
      largerstorage: false,
      customizableprofile: false,
    }
  })

  const { currentStep, steps, handleBack, handleNext, handleStepClick, resetSteps, isFirstStep, isLastStep } = useFormSteps(form, FormSteps)

  const renderStep = useMemo(() => {
    switch (currentStep) {
      case 0:
        return <FormPersonalFields />
      case 1:
        return <FormPlanFields />
      case 2:
        return <FormAddonsFields />
      default:
        return null
    }
  }, [currentStep])



  return (

    <div className="min-h-dvh flex">
      <Form {...form}>
        <form className="flex flex-col grow justify-between">
          <div className="mt-8">
            <div className="flex justify-center">
              <StepProgressBar steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />
            </div>

            <div className="bg-white m-4 rounded-lg px-6 py-8 ">
              <StepProgressLabel steps={steps} currentStep={currentStep} />
              <div className="space-y-6">
                {renderStep}
              </div>
            </div>
          </div>

          {/* Footer fijo al fondo */}
          <div className="bg-white flex justify-between items-center p-5">
            <div className="grid grid-cols-2 items-center w-full">
              <Button
                type="button"
                variant="ghost"
                className={`text-gray-400 text-base justify-self-start p-5 ${isFirstStep ? "hidden" : ""}`}
                onClick={handleBack}
              >
                Go Back
              </Button>

              <Button
                type="button"
                variant="default"
                className={`rounded bg-blue-950 text-gray-300 text-base p-5 justify-self-end col-end-3 ${isLastStep ? "hidden" : ""}`}
                onClick={handleNext}
              >
                Next Step
              </Button>
            </div>

            {isLastStep && (
              <Button
                type="submit"
                disabled={!isLastStep}
                className="rounded bg-indigo-500 text-white text-base p-5"
              >
                Confirm
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>

  )
}