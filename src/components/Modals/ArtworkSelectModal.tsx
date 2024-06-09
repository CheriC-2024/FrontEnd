import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface ArtworkSelectModalProps {
  visible: boolean;
  requiredCherries: number;
  cherryCount: number; // 추가된 체리 카운트
  userCherries: number;
  onClose: () => void;
  onBuyCherries: () => void;
  onConfirm: () => void; // 추가된 onConfirm prop
}

const ArtworkSelectModal: React.FC<ArtworkSelectModalProps> = ({
  visible,
  requiredCherries,
  cherryCount,
  userCherries,
  onClose,
  onBuyCherries,
  onConfirm, // 추가된 onConfirm prop
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

  const isCherriesSufficient = requiredCherries <= userCherries;

  return (
    <Modal transparent={true} visible={visible} animationType="none">
      <CenteredView>
        <Animated.View style={[animatedStyle]}>
          <ModalView>
            <ModalTitle>
              {isCherriesSufficient
                ? `전시 완료 시점에 체리 ${requiredCherries}개가 사용돼요!`
                : '앗 체리가 부족해요!'}
            </ModalTitle>
            {isCherriesSufficient ? (
              <ModalText>
                선택하신 작품 중 {cherryCount}점은, 작가님이 설정한 갯수만큼
                체리가 필요해요{`\n`}우리 작품의 저작권을 함께 지켜가요!
              </ModalText>
            ) : (
              <ModalText>
                선택하신 작품 중 {cherryCount}개는 전시를 위해{`\n`}
                <Text style={{ fontFamily: 'Bold' }}>
                  체리 {requiredCherries}개
                </Text>
                가 필요해요{`\n`}체리를 더 구매하셔야 될 것 같아요!
              </ModalText>
            )}
            <ModalCherry>
              보유 중인 체리{' '}
              <Text style={{ color: '#E52C32' }}>{userCherries}</Text>
            </ModalCherry>
            <ButtonContainer>
              <ModalButtonLeft onPress={onClose}>
                <ButtonTextLeft>뒤로가기</ButtonTextLeft>
              </ModalButtonLeft>
              {isCherriesSufficient ? (
                <ModalButtonRight onPress={onConfirm}>
                  <ButtonTextRight>확인했어요!</ButtonTextRight>
                </ModalButtonRight>
              ) : (
                <ModalButtonRight onPress={onBuyCherries}>
                  <ButtonTextRight>체리 구매하기</ButtonTextRight>
                </ModalButtonRight>
              )}
            </ButtonContainer>
          </ModalView>
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

const ModalView = styled.View`
  flex-direction: column;
  margin: 15px;
  padding: 60px 45px;
  background-color: white;
  border-radius: 20px;
  align-items: start;
  elevation: 5;
`;

const ModalTitle = styled.Text`
  margin-bottom: 15px;
  text-align: left;
  font-family: 'Bold';
  font-size: 22px;
  color: #120000;
`;

const ModalText = styled(ModalTitle)`
  font-family: 'Regular';
  font-size: 16px;
  color: #b0abab;
  line-height: 22px;
`;

const ModalCherry = styled(ModalTitle)`
  font-family: 'Bold';
  font-size: 14px;
  color: #b0abab;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ModalButtonLeft = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 20px;
  padding: 12px 27px;
  border: 1.5px solid #f7f5f5;
`;

const ModalButtonRight = styled.TouchableOpacity`
  background-color: #f7f5f5;
  border-radius: 20px;
  padding: 12px 27px;
`;

const ButtonTextLeft = styled.Text`
  font-family: 'Regular';
  font-size: 16px;
  color: #b0abab;
  text-align: center;
`;

const ButtonTextRight = styled(ButtonTextLeft)`
  color: #120000;
`;

export default ArtworkSelectModal;
