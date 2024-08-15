import React from 'react';
import styled from 'styled-components/native';
import { useProgressBar } from './ProgressBarContext';

const ProgressBar: React.FC<{ totalSteps: number }> = ({ totalSteps }) => {
  const { step } = useProgressBar();

  return (
    <ProgressBarContainer>
      {Array.from({ length: totalSteps }, (_, index) => (
        <ProgressDot key={index} active={index <= step} />
      ))}
    </ProgressBarContainer>
  );
};

const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const ProgressDot = styled.View<{ active: boolean }>`
  width: 11px;
  height: 11px;
  background-color: ${(props: { active: any }) =>
    props.active ? '#E52C32' : '#F7F5F5'};
  border-radius: 6px;
  margin: 0 11.5px;
`;

export default ProgressBar;
