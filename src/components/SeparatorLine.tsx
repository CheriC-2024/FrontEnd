import React from 'react';
import styled from 'styled-components/native';

interface SeparatorLineProps {
  margin?: number; // 선택적 margin prop
  width?: string; // 선택적 width prop
}

const SeparatorLine: React.FC<SeparatorLineProps> = ({
  margin = 20,
  width = '90%',
}) => {
  return <StyledLine margin={margin} width={width} />;
};

export default SeparatorLine;

const StyledLine = styled.View<{ margin: number; width: string }>`
  height: 1.5px;
  background-color: #f2f0f0;
  width: ${({ width }) => width};
  align-self: center;
  margin: ${({ margin }) => margin}px 0;
`;
