import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const ToastContainer = styled(Animated.View)<{ style: ViewStyle }>`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #6e6e6e;
  padding: ${(props) => props.theme.spacing.s4};
  border-radius: ${(props) => props.theme.radius.s};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ToastText = styled.Text`
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.regular};
`;

interface ToastMessageProps {
  message: string;
  visible: boolean;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, visible }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 2500);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <ToastContainer style={{ opacity }}>
      <ToastText>{message}</ToastText>
    </ToastContainer>
  );
};

export default ToastMessage;
