import React, { useState } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

interface Step {
  title: string
  content: string
}

interface StepperProps {
  steps: Step[]
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0">
      <div className="">
        <h3 className="mt-8 mb-5 uppercase text-blue-100 text-center text-2xl text-white font-semiold">
          {steps[currentStep].title}
        </h3>
      </div>
      <ul
        aria-label="Steps"
        className="step-form items-center text-white font-medium md:flex mx-10">
        <button
          onClick={prevStep}
          className={`${
            currentStep === 0
              ? 'bg-white step-button opacity-50 cursor-not-allowed'
              : ''
          }  bg-white step-button text-white hover:bg-rose-200 p-3 rounded-full`}
          disabled={currentStep === 0}>
          <GrPrevious className="text-white" />
        </button>
        {steps.map((item, idx) => (
          <li
            aria-current={currentStep === idx ? 'step' : false}
            className="flex gap-x-3 md:flex-col md:flex-1 md:gap-x-0 cursor-pointer"
            key={idx}
            onClick={() => goToStep(idx)}>
            <div className="flex flex-col items-center md:flex-row md:flex-1">
              <hr
                className={`w-full border-2 hidden md:block ${
                  idx === 0
                    ? 'border-none'
                    : '' || currentStep >= idx
                    ? 'border-rose-400'
                    : ''
                }`}
              />
              <div
                className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                  currentStep >= idx && 'bg-rose-600 border-rose-400'
                }`}>
                <span className="text-white text-sm">{idx + 1}</span>
              </div>
              <hr
                className={`h-12 border-2 md:w-full md:h-auto ${
                  idx + 1 === steps.length
                    ? 'border-none'
                    : '' || currentStep > idx
                    ? 'border-rose-400'
                    : ''
                }`}
              />
            </div>
            <div className="h-8 flex justify-center items-center md:mt-3 md:h-auto">
              <h3
                className={`text-sm ${
                  currentStep === idx ? 'text-white' : ''
                }`}>
                {item.title}
              </h3>
            </div>
          </li>
        ))}

        <button
          onClick={nextStep}
          className={`${
            currentStep === steps.length - 1
              ? 'step-button bg-white opacity-50 cursor-not-allowed'
              : ''
          } bg-white step-button bg-white text-white hover:bg-rose-200 p-3 rounded-full`}
          disabled={currentStep === steps.length - 1}>
          <GrNext />
        </button>
      </ul>
      <div className="step-content max-w-xl mx-auto p-8  rounded-lg shadow-md">
        <div className="text-gray-600 mb-8">
          {steps[currentStep] && (
            <ReactMarkdown>{steps[currentStep]?.content}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  )
}

export default Stepper
