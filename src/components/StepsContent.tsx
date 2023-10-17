import { useStepStore } from '@/store/stepsStore';

const StepsContent = () => {
  const activeStep = useStepStore((state) => state.activeStep);
  const slides = useStepStore((state) => state.slides);
  const setActiveStep = useStepStore((state) => state.setActiveStep);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const renderedSteps = slides?.map((step, i) => {
    const currentStep = i === activeStep;
    const previousStep = i <= activeStep;

    return (
      <li
        key={step.title + i}
        className={`text-[10px] md:text-[16px] cursor-pointer step ${
          currentStep || previousStep ? 'step-primary' : ''
        }`}
        onClick={() => handleStepClick(i)}
      >
        <span className="px-5">
          {step.title.replace(/<\/?[^>]+(>|$)/g, '')}
        </span>
      </li>
    );
  });
  return (
    <>
      <ul className="steps steps-horizontal">{renderedSteps}</ul>
    </>
  );
};

export default StepsContent;
