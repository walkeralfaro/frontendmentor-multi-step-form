interface Step {
  title: string
  description?: string
  side_description: string
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
  disabled: boolean
}

export default function StepProgressBar({ steps, currentStep, onStepClick, disabled }: StepProgressProps) {
  return (


    <div className="flex gap-3 md:flex-col md:gap-5 2xl:gap-10">
      {
        steps.map((step, index) => (
          <div key={index} className="flex gap-4 items-center">

            <button
              type="button"
              onClick={() => onStepClick(index)}
              disabled={disabled}
              className={`w-[40] h-[40] flex justify-center items-center rounded-full cursor-pointer border ${index === currentStep ? "bg-cyan-200 border-cyan-200 text-blue-950" : "bg-transparent border-white text-white"}`}
            >
              <p className="text-lg">{index + 1}</p>
            </button>

            <div className="hidden md:flex md:flex-col ">
              <h4 className="text-gray-400  2xl:text-lg">Step <span>{index + 1}</span> </h4>
              <p className="text-gray-100 uppercase 2xl:text-xl">{step.side_description}</p>
            </div>

          </div>
        ))
      }
    </div>

  )
}