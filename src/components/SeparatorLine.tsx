import React from 'react';
import styled from 'styled-components/native';

const SeparatorLine: React.FC = () => {
  return <StyledLine />;
};

export default SeparatorLine;

const StyledLine = styled.View`
  height: 1.5px;
  background-color: #f2f0f0;
  width: 90%;
  align-self: center;
  margin: 20px 0;
`;
