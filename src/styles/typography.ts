import styled from 'styled-components/native';

export const H1 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h1};
  line-height: ${({ theme }) => theme.lineHeights.h1};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const H2 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  line-height: ${({ theme }) => theme.lineHeights.h2};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const H3 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  line-height: ${({ theme }) => theme.lineHeights.h3};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const H4 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  line-height: ${({ theme }) => theme.lineHeights.h4};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const H5 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h5};
  line-height: ${({ theme }) => theme.lineHeights.h5};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const H6 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.h6};
  line-height: ${({ theme }) => theme.lineHeights.h6};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const Subtitle1 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
  line-height: ${({ theme }) => theme.lineHeights.subtitle1};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const Subtitle2 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.subtitle2};
  line-height: ${({ theme }) => theme.lineHeights.subtitle2};
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.redBlack};
`;

export const Body1 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body1};
  line-height: ${({ theme }) => theme.lineHeights.body1};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.grey_8};
`;

export const Body2 = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.body2};
  line-height: ${({ theme }) => theme.lineHeights.body2};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.grey_8};
`;

export const ButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.button};
  line-height: ${({ theme }) => theme.lineHeights.button};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.grey_8};
`;

export const Caption = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  line-height: ${({ theme }) => theme.lineHeights.caption};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.grey_8};
`;
