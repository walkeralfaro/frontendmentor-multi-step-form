interface Step {
  title: string
  description?: string
}

interface StepProgressProps {
  steps: Step[]
  currentStep: number
}

export default function StepProgressLabel({ steps, currentStep }: StepProgressProps) {
  return (

    <div>
      {/* Titulo y descripcion del paso actual */}
      <div className="mb-6">
        <h3 className="text-2xl text-blue-900 font-black mb-3 2xl:text-4xl">
          {
            steps[currentStep]?.title || 'Unable step'
          }
        </h3>
        {
          steps[currentStep].description && (
            <p className="text-base text-gray-400 2xl:text-xl"> {steps[currentStep].description} </p>
          )
        }

      </div>
    </div>
  )
}