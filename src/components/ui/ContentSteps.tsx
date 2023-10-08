import { useStepStore } from "@/store/stepsStore";
import { FC } from "react";

interface ContentStepsProps {
  steps?: string[];
}

//TODO import steps as props to make this dynamic

const stepTitles = ["Section 1", "Section 2", "Named Section", "Embeddings"];

const ContentSteps: FC<ContentStepsProps> = ({ steps }) => {
  const activeStep = useStepStore((state) => state.activeStep);
  const slides = useStepStore((state) => state.slides);
  const setActiveStep = useStepStore((state) => state.setActiveStep);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const renderedSteps = slides?.map((step, i) => {
    const isCurrentStep = i === activeStep;
    const isPreviousStep = i <= activeStep;

    return (
      <li
        key={step.title + i}
        className={`text-[10px] md:text-[16px] cursor-pointer step ${
          isCurrentStep || isPreviousStep ? "step-primary" : ""
        }`}
        onClick={() => handleStepClick(i)}
      >
        {step.title.replace(/<\/?[^>]+(>|$)/g, "")}
      </li>
    );
  });
  return (
    // TODO: li names should be dynamic also (step-primary class)
    <>
      <ul className="steps steps-horizontal">{renderedSteps}</ul>
    </>
  );
};

export default ContentSteps;
