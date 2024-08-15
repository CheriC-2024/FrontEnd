import styled from 'styled-components/native';

export const Btn = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey_6 : theme.colors.redBlack};
  padding: ${({ theme }) => theme.spacing.s4};
  border-radius: ${({ theme }) => theme.radius.l};
  align-items: center;
  justify-content: center;
`;

export const BtnText = styled.Text<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey_2 : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
`;
