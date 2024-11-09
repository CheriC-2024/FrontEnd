import { Body1 } from 'src/styles/typography';
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
`;

export const BtnText = styled(Body1)<{ disabled?: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey_2 : theme.colors.white};
`;
