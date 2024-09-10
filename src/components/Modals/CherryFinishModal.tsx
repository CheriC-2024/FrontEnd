import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { CherryIcon } from 'src/assets/icons/_index';
import { H5, Body1, Subtitle2 } from 'src/styles/typography';

interface CherryFinishModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  requiredCherries: number;
  userCherries: number;
  buttonText?: string;
  onConfirm: () => void;
}

const CherryFinishModal: React.FC<CherryFinishModalProps> = ({
  visible,
  onClose,
  title,
  requiredCherries,
  userCherries,
  buttonText = '확인했습니다',
  onConfirm,
}) => {
  return (
    <Modal
      transparent={true}
      animationType='fade'
      visible={visible}
      onRequestClose={onClose}
    >
      <ModalOverlay>
        <ModalContainer>
          <CloseButton onPress={onClose}>
            <CloseButtonText>✕</CloseButtonText>
          </CloseButton>
          <TitleWrapper>
            <H5>{title}</H5>
          </TitleWrapper>
          <MessageWrapper>
            <CherryCountWrapper>
              <MessageText>필요한 체리</MessageText>
              <CherryIconWrapper>
                <Icon />
              </CherryIconWrapper>
              <RequiredCherries>{requiredCherries}</RequiredCherries>
            </CherryCountWrapper>
            <CherryCountWrapper>
              <MessageText>보유중인 체리</MessageText>
              <CherryIconWrapper>
                <Icon />
              </CherryIconWrapper>
              <UserCherries>{userCherries}</UserCherries>
            </CherryCountWrapper>
          </MessageWrapper>

          <ButtonGroup>
            <PrimaryButton onPress={onConfirm}>
              <Body1>{buttonText}</Body1>
            </PrimaryButton>
          </ButtonGroup>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
};

export default CherryFinishModal;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.View`
  position: relative;
  width: 90%;
  padding: 50px 30px;
  border-radius: 16px;
  background-color: white;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 25px;
`;

const CloseButtonText = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.redBlack};
`;

const TitleWrapper = styled.View`
  margin-bottom: 20px;
`;

const MessageWrapper = styled.View`
  margin-bottom: 60px;
`;

const MessageText = styled(Body1)`
  text-align: left;
  color: ${({ theme }) => theme.colors.grey_6};
`;

const CherryCountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CherryIconWrapper = styled.View`
  margin-left: 5px;
  margin-right: 5px;
`;

const Icon = styled(CherryIcon)`
  fill: ${({ theme }) => theme.colors.cherryRed_10};
`;

const RequiredCherries = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const UserCherries = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const ButtonGroup = styled.View`
  justify-content: center;
  width: 100%;
`;

const PrimaryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.grey_4};
`;
