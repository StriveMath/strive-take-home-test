import { useStepStore } from '@/store/stepsStore';

import Navbar from './Navbar';
import StepsContent from './StepsContent';
import { Button } from './Button';

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// Navigation for our lesson slides
const Header = () => {
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
        variant={'transparent'}
        disabled={activeStep === 0}
        className="disabled:bg-transparent text-2xl disabled:text-[#4a4e54] btn-circle"
        onClick={handlePrevStep}
      >
        <BiChevronLeft />
      </Button>
      <StepsContent />
      <Button
        disabled={activeStep === slides.length - 1}
        variant={'transparent'}
        className="disabled:bg-transparent text-2xl disabled:text-[#4a4e54] btn-circle"
        onClick={handleNextStep}
      >
        <BiChevronRight />
      </Button>
    </Navbar>
  );
};

export default Header;
