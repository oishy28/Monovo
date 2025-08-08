import React, { useState, Children, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  className = "",
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };
  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };
  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className={"w-full h-full flex flex-col rounded-3xl overflow-hidden shadow-lg border border-gray-200 bg-white " + className}>
      <div className="flex w-full items-center p-6">
        {stepsArray.map((_, index) => {
          const stepNumber = index + 1;
          const isNotLastStep = index < totalSteps - 1;
          return (
            <React.Fragment key={stepNumber}>
              {renderStepIndicator ? (
                renderStepIndicator({
                  step: stepNumber,
                  currentStep,
                  onStepClick: (clicked) => {
                    setDirection(clicked > currentStep ? 1 : -1);
                    updateStep(clicked);
                  },
                })
              ) : (
                <StepIndicator
                  step={stepNumber}
                  disableStepIndicators={disableStepIndicators}
                  currentStep={currentStep}
                  onClickStep={(clicked) => {
                    setDirection(clicked > currentStep ? 1 : -1);
                    updateStep(clicked);
                  }}
                />
              )}
              {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
            </React.Fragment>
          );
        })}
      </div>

      <StepContentWrapper isCompleted={isCompleted} currentStep={currentStep} direction={direction}>
        <div className="px-6">{stepsArray[currentStep - 1]}</div>
      </StepContentWrapper>

      {!isCompleted && (
        <div className="px-6 pb-6">
          <div className={`mt-10 flex ${currentStep !== 1 ? "justify-between" : "justify-end"}`}>
            {currentStep !== 1 && (
              <button onClick={handleBack} className="rounded-md px-2 py-1 text-gray-400 hover:text-zinc-600 transition">
                {backButtonText}
              </button>
            )}
            <button
              onClick={isLastStep ? handleComplete : handleNext}
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white font-medium tracking-tight px-3.5 py-1.5 hover:bg-indigo-600/90 transition"
            >
              {isLastStep ? "Complete" : nextButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Step({ children }) {
  return <div className="py-0">{children}</div>;
}

function StepContentWrapper({ isCompleted, currentStep, direction, children }) {
  return (
    <div className="relative flex-1 min-h-0 overflow-hidden">
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction}>
            {/* Padding stays inside so the scroll feels right */}
            <div className="px-6 pb-2 h-full overflow-y-auto">
              {children}
            </div>
          </SlideTransition>
        )}
      </AnimatePresence>
    </div>
  );
}


function SlideTransition({ children, direction }) {
  return (
    <motion.div
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
}


const stepVariants = {
  enter: (dir) => ({ x: dir >= 0 ? "-100%" : "100%", opacity: 0 }),
  center: { x: "0%", opacity: 1 },
  exit: (dir) => ({ x: dir >= 0 ? "50%" : "-50%", opacity: 0 }),
};

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";
  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };
  return (
    <motion.button type="button" onClick={handleClick} className="relative cursor-pointer outline-none" animate={status} initial={false}>
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#a3a3a3", color: "#222" },
          active: { scale: 1, backgroundColor: "#254EDB", color: "#254EDB" },
          complete: { scale: 1, backgroundColor: "#254EDB", color: "#254EDB" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon className="h-4 w-4 text-white" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-white" />
        ) : (
          <span className="text-sm text-white/80">{step}</span>
        )}
      </motion.div>
    </motion.button>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = { incomplete: { width: 0, backgroundColor: "transparent" }, complete: { width: "100%", backgroundColor: "#254EDB" } };
  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-zinc-600">
      <motion.div className="absolute left-0 top-0 h-full" variants={lineVariants} initial={false} animate={isComplete ? "complete" : "incomplete"} transition={{ duration: 0.4 }} />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}