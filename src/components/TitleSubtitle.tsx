import React from 'react';
import styled from 'styled-components/native';
import { H6, Caption } from '../styles/typography';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin: ${({ theme }) => theme.spacing.s4} 0;
`;

const TextContainer = styled.View`
  flex-direction: column;
`;

const Title = styled(H6)`
  color: ${({ theme }) => theme.colors.redBlack};
`;

const Subtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
  padding-top: ${({ theme }) => theme.spacing.s1};
`;

const Image = styled.Image`
  width: 45px;
  height: 80px;
  margin-right: ${({ theme }) => theme.spacing.s3};
`;

interface TitleSubtitleProps {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  imageSource?: { uri: string } | number;
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  title,
  subtitle,
  imageSource,
}) => {
  return (
    <Container>
      {imageSource && <Image source={imageSource} />}
      <TextContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TextContainer>
    </Container>
  );
};

export default TitleSubtitle;
