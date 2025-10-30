interface Step {
  title: string
  description?: string
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
}

export default function StepProgressBar({ steps, currentStep, onStepClick }: StepProgressProps) {
  return (


      <div className="flex gap-3">
        {
          steps.map((_, index) => (
            <div
              key={index}
              onClick={() => onStepClick(index)}
              className={`w-[40] h-[40] flex justify-center items-center rounded-full cursor-pointer border border-white  ${index === currentStep ? "bg-cyan-200" : "bg-transparent"}`}
            >
              <p className="text-lg text-white">{index + 1}</p>
            </div>
          ))
        }
      </div>
    
  )
}