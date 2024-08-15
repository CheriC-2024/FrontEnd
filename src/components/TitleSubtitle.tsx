import React from 'react';
import styled from 'styled-components/native';
import { H6, Caption } from '../styles/typography';

const Container = styled.View`
  //margin: ${({ theme }) => theme.spacing.s4};
`;

const Title = styled(H6)`
  color: ${({ theme }) => theme.colors.redBlack};
`;

const Subtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  padding-top: ${({ theme }) => theme.spacing.s1};
`;

interface TitleSubtitleProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
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
