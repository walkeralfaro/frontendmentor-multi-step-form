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
import Image from "next/image";

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
        <form className="flex flex-col grow justify-between md:items-center md:justify-center" onSubmit={form.handleSubmit(onSubmit)}>

          <div className="md:container md:max-w-4xl 2xl:max-w-6xl">
            <div className="mt-8 md:mt-0 ">

              <div className="flex justify-center md:hidden">
                <StepProgressBar steps={steps} currentStep={currentStep} onStepClick={handleStepClick} disabled={disableBarbuttons} />
              </div>

              <div className="bg-white m-4 mt-8 rounded-lg px-6 py-8 shadow-md md:p-4 md:m-6 md:flex md:justify-between md:h-[540] 2xl:h-[680]">

                {/* Sidebar Desktop */}
                <div className="hidden justify-center md:block md:relative">
                  <img src='/bg-sidebar-desktop.svg' alt="background sidebar" className="hidden md:block md:h-full" />
                  <div className="md:absolute top-1/16 left-1/8 ">
                    <StepProgressBar steps={steps} currentStep={currentStep} onStepClick={handleStepClick} disabled={disableBarbuttons} />
                  </div>
                </div>

                {/* Principal Desktop */}
                <div className="md:flex md:flex-col md:justify-between md:grow md:mx-auto md:max-w-[440] md:my-6 2xl:max-w-[580]">

                  {
                    !form.formState.isSubmitSuccessful ? (
                      <StepProgressLabel steps={steps} currentStep={currentStep} />
                    ) : (
                      <div className="text-center flex flex-col gap-3 items-center py-10">
                        <Image src="/icon-thank-you.svg" width={60} height={60} alt="Thanks Image" priority />
                        <h3 className="text-blue-950 text-xl font-black mt-3">Thank you!</h3>
                        <p className="text-gray-400">Thanks for confirming you subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
                        <Progress value={progress} className="w-[40%] mt-6" />
                      </div>
                    )
                  }

                  {/* Form */}
                  <div className="md:grow md:mt-4">
                    {renderStep}
                  </div>

                  {/* Buttons Desktop */}
                  <div className="bg-white hidden justify-between items-center p-5 md:flex md:p-0 md:mt-10">
                    <div className="grid grid-cols-2 items-center w-full">
                      <Button
                        type="button"
                        variant="ghost"
                        disabled={disableBarbuttons}
                        className={`text-gray-400 text-base justify-self-start p-5 ${isFirstStep ? "hidden" : ""} 2xl:text-xl 2xl:p-6`}
                        onClick={handleBack}
                      >
                        Go Back
                      </Button>

                      <Button
                        type="button"
                        variant="default"
                        disabled={disableBarbuttons}
                        className={`rounded bg-blue-950 text-gray-300 text-base p-5 justify-self-end col-end-3 ${isLastStep ? "hidden" : ""} 2xl:text-xl 2xl:p-6`}
                        onClick={handleNext}
                      >
                        Next Step
                      </Button>
                    </div>

                    {isLastStep && (
                      <Button
                        type="submit"
                        disabled={!isLastStep || disableBarbuttons}
                        className="rounded bg-indigo-500 text-white text-base p-5 2xl:text-xl 2xl:p-6"
                      >
                        Confirm
                      </Button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>


          {/* Buttons Mobile */}
          <div className="bg-white flex justify-between items-center p-5 md:hidden">
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