import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProgressBarContextProps {
  step: number;
  setStep: (step: number) => void;
}

const ProgressBarContext = createContext<ProgressBarContextProps | undefined>(
  undefined,
);

export const useProgressBar = () => {
  const context = useContext(ProgressBarContext);
  if (!context) {
    throw new Error('useProgressBar must be used within a ProgressBarProvider');
  }
  return context;
};

export const ProgressBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState(0);

  return (
    <ProgressBarContext.Provider value={{ step, setStep }}>
      {children}
    </ProgressBarContext.Provider>
  );
};
