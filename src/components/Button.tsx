import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.redBlack};
  padding: ${({ theme }) =>
    theme.spacing.s4}; //padding값은 디자인 시스템 수정되는데로 변경 예정
  border-radius: ${({ theme }) => theme.radius.l};
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.body1};
`;
