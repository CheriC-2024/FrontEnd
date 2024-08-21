import styled from 'styled-components/native';

export const Btn = styled.TouchableOpacity<{ disabled?: boolean }>`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey_6 : theme.colors.redBlack};
  padding: ${({ theme }) => theme.spacing.s4};
  border-radius: ${({ theme }) => theme.radius.l};
  align-items: center;
  justify-content: center;
  margin: 0 ${({ theme }) => theme.margin.m};
`;

export const BtnText = styled.Text<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey_2 : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSizes.subtitle1};
`;
