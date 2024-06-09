import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

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
  const isCherriesSufficient = requiredCherries <= userCherries;

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <CenteredView>
        <ModalView>
          <ModalTitle>
            {isCherriesSufficient
              ? '전시 완료 시점에 체리 사용돼요!'
              : '앗 체리가 부족해요!'}
          </ModalTitle>
          <ModalText>
            선택하신 작품 중 {cherryCount}개는 전시를 위해 체리가 필요해요.
            <Text style={{ fontWeight: 'bold' }}> {requiredCherries} 체리</Text>
            가 필요합니다.
          </ModalText>
          <ModalText>
            보유중인 체리:{' '}
            <Text style={{ fontWeight: 'bold' }}>{userCherries}</Text>
          </ModalText>
          <ButtonContainer>
            <ModalButton onPress={onClose}>
              <ButtonText>뒤로가기</ButtonText>
            </ModalButton>
            {isCherriesSufficient ? (
              <ModalButton onPress={onConfirm}>
                <ButtonText>확인했어요!</ButtonText>
              </ModalButton>
            ) : (
              <ModalButton onPress={onBuyCherries}>
                <ButtonText>체리 구매하기</ButtonText>
              </ModalButton>
            )}
          </ButtonContainer>
        </ModalView>
      </CenteredView>
    </Modal>
  );
};

const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

const ModalView = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const ModalTitle = styled.Text`
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const ModalText = styled.Text`
  margin-bottom: 15px;
  text-align: center;
  font-size: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const ModalButton = styled.TouchableOpacity`
  background-color: #e52c32;
  border-radius: 20px;
  padding: 10px 20px;
  elevation: 2;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

export default ArtworkSelectModal;
