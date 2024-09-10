import React from 'react';
import styled from 'styled-components/native';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <ProgressBarContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <ProgressDot key={index} active={index < currentStep} />
      ))}
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
`;

const ProgressDot = styled.View<{ active: boolean }>`
  width: 11px;
  height: 11px;
  background-color: ${({ active }) => (active ? '#E52C32' : '#F7F5F5')};
  border-radius: 6px;
  margin: 0 11.5px;
`;

export default ProgressBar;
