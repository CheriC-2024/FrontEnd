import React from 'react';
import styled from 'styled-components/native';
import { H6, Caption, H4 } from '../styles/typography';
import { ViewStyle, TextStyle } from 'react-native';

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
`;

const TextContainer = styled.View<{ hasImage: boolean }>`
  flex-direction: column;
  margin-top: ${({ hasImage, theme }) => (hasImage ? '0px' : theme.spacing.s4)};
`;

const Title = styled(H6)<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.colors.redBlack};
`;

const TitleLarge = styled(H4)<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.colors.redBlack};
`;

const Subtitle = styled(Caption)<{ color?: string }>`
  color: ${({ theme, color }) => color || theme.colors.grey_8};
  padding-top: ${({ theme }) => theme.spacing.s1};
`;

const Image = styled.Image`
  width: 45px;
  height: 80px;
  margin-right: ${({ theme }) => theme.spacing.s3};
`;

interface TitleSubtitleProps {
  titleLarge?: string | React.ReactNode;
  title?: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  imageSource?: { uri: string } | number;
  style?: ViewStyle; // 전달받는 스타일 prop
}

const TitleSubtitle: React.FC<TitleSubtitleProps> = ({
  titleLarge,
  title,
  subtitle,
  imageSource,
  style = {},
}) => {
  const textColor = (style as TextStyle).color || undefined; // style에서 color 추출

  return (
    <Container style={style}>
      {imageSource && <Image source={imageSource} />}
      <TextContainer hasImage={!!imageSource}>
        {titleLarge ? (
          <TitleLarge color={textColor}>{titleLarge}</TitleLarge>
        ) : (
          <Title color={textColor}>{title}</Title>
        )}
        <Subtitle color={textColor}>{subtitle}</Subtitle>
      </TextContainer>
    </Container>
  );
};

export default TitleSubtitle;
