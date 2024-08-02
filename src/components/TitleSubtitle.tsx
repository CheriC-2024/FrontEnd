import React from 'react';
import styled from 'styled-components/native';
import { H6, Caption } from './Typography';

const Container = styled.View`
  //margin: ${({ theme }) => theme.spacing.s4};
`;

const Title = styled(H6)`
  color: ${({ theme }) => theme.colors.redBlack};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const Subtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

interface TitleSubtitleProps {
  title: string;
  subtitle: string;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({ title, subtitle }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

export default TitleSubtitle;