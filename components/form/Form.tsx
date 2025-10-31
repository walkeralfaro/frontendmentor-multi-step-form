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
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import StepProgressBar from "../app/step-progress-bar";
import StepProgressLabel from "../app/step-progress-label";
import FormFinish from "./FormFinish";
import { Progress } from "../ui/progress";

export default function FormComponent() {

  const [progress, setProgress] = useState(0)
  const [disableBarbuttons, setDisableBarbuttons] = useState(false)

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
      case 3:
        return <FormFinish />
      default:
        return null
    }
  }, [currentStep])


  const onSubmit = (formData: FormType) => {
    setDisableBarbuttons(true)

    setTimeout(() => {
      setDisableBarbuttons(false)
      setProgress(0)
      resetSteps()
      form.reset()
    }, 10000);

  }

  useEffect(() => {
    if (form.formState.isSubmitted) {

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 1
        })
      }, 100)
      return () => clearInterval(timer)

    }
  }, [form.formState.isSubmitted])

  return (

    <div className="min-h-dvh flex">
      <Form {...form}>
        <form className="flex flex-col grow justify-between" onSubmit={form.handleSubmit(onSubmit)}>

          <div className="mt-8">
            <div className="flex justify-center">
              <StepProgressBar steps={steps} currentStep={currentStep} onStepClick={handleStepClick} disabled={disableBarbuttons} />
            </div>

            <div className="bg-white m-4 rounded-lg px-6 py-8 shadow-md">

              {
                !form.formState.isSubmitSuccessful ? (
                  <StepProgressLabel steps={steps} currentStep={currentStep} />
                ) : (
                  <div className="text-center flex flex-col gap-3 items-center py-10">
                    <img src='/icon-thank-you.svg' className="w-12"></img>
                    <h3 className="text-blue-950 text-xl font-black mt-3">Thank you!</h3>
                    <p className="text-gray-400">Thanks for confirming you subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                    <Progress value={progress} className="w-[40%] mt-6" />
                  </div>
                )
              }

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
                disabled={disableBarbuttons}
                className={`text-gray-400 text-base justify-self-start p-5 ${isFirstStep ? "hidden" : ""}`}
                onClick={handleBack}
              >
                Go Back
              </Button>

              <Button
                type="button"
                variant="default"
                disabled={disableBarbuttons}
                className={`rounded bg-blue-950 text-gray-300 text-base p-5 justify-self-end col-end-3 ${isLastStep ? "hidden" : ""}`}
                onClick={handleNext}
              >
                Next Step
              </Button>
            </div>

            {isLastStep && (
              <Button
                type="submit"
                disabled={!isLastStep || disableBarbuttons}
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