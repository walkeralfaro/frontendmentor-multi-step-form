interface Step {
  title: string
  description?: string
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
  onStepClick: (stepIndex: number) => void
  disabled: boolean
}

export default function StepProgressBar({ steps, currentStep, onStepClick, disabled }: StepProgressProps) {
  return (


      <div className="flex gap-3">
        {
          steps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onStepClick(index)}
              disabled={disabled}
              className={`w-[40] h-[40] flex justify-center items-center rounded-full cursor-pointer border ${index === currentStep ? "bg-cyan-200 border-cyan-200 text-blue-950" : "bg-transparent border-white text-white"}`}
            >
              <p className="text-lg">{index + 1}</p>
            </button>
          ))
        }
      </div>
    
  )
}