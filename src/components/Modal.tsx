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
import { Body1, H5 } from 'src/styles/typography';

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
    <Modal transparent visible={visible} animationType='none'>
      <BackgroundView>
        <CenteredView>
          <Animated.View style={[animatedStyle]}>
            <ModalContainer>
              <CloseButton onPress={onClose}>
                <Icon name='close' size={24} color='#000' />
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
      </BackgroundView>
    </Modal>
  );
};

const BackgroundView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(18, 0, 0, 0.5);
`;

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 50px; /* 모달 위치 */
`;

const ModalContainer = styled.View`
  flex-direction: column;
  margin: 15px;
  padding: 50px 35px;
  background-color: white;
  border-radius: 20px;
  align-items: start;
  elevation: 5;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 20px;
`;

const Title = styled(H5)`
  text-align: left;
  margin-bottom: 15px;
`;

const Body = styled.View`
  margin-bottom: 40px;
  align-items: start;
`;

const BodyText = styled(Body1)`
  text-align: left;
  line-height: 22px;
  margin-bottom: 40px;
  color: #b0abab;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const CancelButton = styled.TouchableOpacity`
  width: 120px;
  background-color: #fcf9f9;
  border-radius: ${({ theme }) => theme.radius.l};
  padding: 12px 28px;
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.redBlack};
  border-radius: ${({ theme }) => theme.radius.l};
  padding: 12px 28px;
`;

const CancelButtonText = styled(Body1)`
  color: ${({ theme }) => theme.colors.grey_6};
  text-align: center;
`;

const ConfirmButtonText = styled(Body1)`
  color: #fff;
`;

export default CustomModal;
