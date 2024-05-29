import React from 'react';
import styled from 'styled-components/native';
import { useProgressBar } from './ProgressBarContext';

const ProgressBarComponent: React.FC<{ totalSteps: number }> = ({
  totalSteps,
}) => {
  const { step } = useProgressBar();

  return (
    <ProgressBarContainer>
      <ProgressBar>
        {Array.from({ length: totalSteps }, (_, index) => (
          <ProgressStep key={index} active={index <= step} />
        ))}
      </ProgressBar>
      <ProgressLabel>
        {step + 1} / {totalSteps}
      </ProgressLabel>
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ProgressBar = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-right: 16px;
`;

const ProgressStep = styled.View<{ active: boolean }>`
  flex: 1;
  height: 8px;
  background-color: ${(props) => (props.active ? '#ff2530' : '#e0e0e0')};
  margin-right: 4px;
  border-radius: 4px;
`;

const ProgressLabel = styled.Text`
  font-size: 14px;
  color: #777;
`;

export default ProgressBarComponent;
