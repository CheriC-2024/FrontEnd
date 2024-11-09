import styled from 'styled-components/native';

export const Container = styled.View<{ removePadding?: boolean }>`
  flex: 1;
  position: relative;
  padding: ${({ removePadding, theme }) =>
    removePadding ? '0px' : `0 ${theme.spacing.s4}`};
  background-color: ${({ theme }) => theme.colors.bg};
  overflow: visible;
`;
