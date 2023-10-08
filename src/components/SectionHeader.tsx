import { FC } from "react";
import { useStepStore } from "@/store/stepsStore";

import Navbar from "./Navbar";
import ContentSteps from "./ui/ContentSteps";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Button } from "./ui/Button";

interface SectionHeaderProps {}

// Navigation for our lesson slides
const SectionHeader: FC<SectionHeaderProps> = ({}) => {
  const activeStep = useStepStore((state) => state.activeStep);
  const setActiveStep = useStepStore((state) => state.setActiveStep);
  const slides = useStepStore((state) => state.slides);

  const handlePrevStep = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Navbar>
      <Button
        variant={"ghost"}
        disabled={activeStep === 0}
        className="disabled:bg-transparent text-2xl disabled:text-[#4a4e54] btn-circle"
        onClick={handlePrevStep}
      >
        <BiChevronLeft />
      </Button>
      <ContentSteps />
      <Button
        disabled={activeStep === slides.length - 1}
        variant={"ghost"}
        className="disabled:bg-transparent text-2xl disabled:text-[#4a4e54] btn-circle"
        onClick={handleNextStep}
      >
        <BiChevronRight />
      </Button>
    </Navbar>
  );
};

export default SectionHeader;
