import React, { useEffect } from 'react';
import { Modal, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  body: string | React.ReactNode;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  body,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
}) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else {
      scale.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Modal transparent visible={visible} animationType="none">
      <CenteredView>
        <Animated.View style={[animatedStyle]}>
          <ModalContainer>
            <CloseButton onPress={onClose}>
              <Icon name="close" size={24} color="#000" />
            </CloseButton>
            <Title>{title}</Title>
            <Body>
              {typeof body === 'string' ? <BodyText>{body}</BodyText> : body}
            </Body>
            <ButtonContainer>
              <CancelButton onPress={onClose}>
                <CancelButtonText>{cancelButtonText}</CancelButtonText>
              </CancelButton>
              <ConfirmButton onPress={onConfirm}>
                <ConfirmButtonText>{confirmButtonText}</ConfirmButtonText>
              </ConfirmButton>
            </ButtonContainer>
          </ModalContainer>
        </Animated.View>
      </CenteredView>
    </Modal>
  );
};

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px; /* 모달 위치 */
`;

const ModalContainer = styled.View`
  flex-direction: column;
  margin: 15px;
  padding: 60px 35px;
  background-color: white;
  border-radius: 20px;
  align-items: start;
  elevation: 5;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 22px;
  text-align: left;
  margin-bottom: 15px;
`;

const Body = styled.View`
  margin-bottom: 25px;
  align-items: start;
`;

const BodyText = styled.Text`
  text-align: left;
  font-family: 'Regular';
  font-size: 16px;
  line-height: 22px;
  color: #b0abab;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 20px;
  padding: 12px 27px;
  border: 1.5px solid #f7f5f5;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: #f7f5f5;
  border-radius: 20px;
  padding: 12px 27px;
`;

const CancelButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 16px;
  color: #b0abab;
  text-align: center;
`;

const ConfirmButtonText = styled.Text`
  font-family: 'Regular';
  font-size: 16px;
  color: #120000;
`;

export default CustomModal;
