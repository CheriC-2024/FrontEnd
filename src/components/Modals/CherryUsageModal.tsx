import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { CherryIcon, XIcon } from 'src/assets/icons/_index';
import { H5, Subtitle2, Body1 } from 'src/styles/typography';

interface CherryUsageModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  userCherries?: number;
  requiredCherries?: number;
  buttonText?: string;
  secondaryButtonText?: string;
  onAction?: () => void;
  onSecondaryAction?: () => void;
}

const CherryUsageModal: React.FC<CherryUsageModalProps> = ({
  visible,
  onClose,
  title = '기본 제목',
  message = '기본 메시지',
  userCherries = 0,
  requiredCherries,
  buttonText = '확인했어요!',
  onAction,
  secondaryButtonText = '뒤로가기',
  onSecondaryAction = onClose,
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
            <XIcon fill='#120000' width={24} height={24} />
          </CloseButton>
          <TitleWrapper>
            <H5>{title}</H5>
          </TitleWrapper>
          <MessageWrapper>
            <MessageText>{message}</MessageText>
          </MessageWrapper>
          {requiredCherries !== undefined && (
            <CherryCountWrapper>
              <Subtitle2>필요한 체리 </Subtitle2>
              <Icon />
              <UserCherries>{requiredCherries}</UserCherries>
            </CherryCountWrapper>
          )}
          <CherryCountWrapper>
            <Subtitle2 style={{ color: '#B0ABAB' }}>보유중인 체리 </Subtitle2>
            <Icon />
            <UserCherries>{userCherries}</UserCherries>
          </CherryCountWrapper>
          <ButtonGroup>
            {secondaryButtonText && (
              <SecondaryButton onPress={onSecondaryAction}>
                <SecondaryText>{secondaryButtonText}</SecondaryText>
              </SecondaryButton>
            )}
            <PrimaryButton onPress={onAction}>
              <PrimaryText>{buttonText}</PrimaryText>
            </PrimaryButton>
          </ButtonGroup>
        </ModalContainer>
      </ModalOverlay>
    </Modal>
  );
};

export default CherryUsageModal;

const ModalOverlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const ModalContainer = styled.View`
  position: relative;
  align-items: flex-start;
  width: 90%;
  padding: 65px 34px;
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  right: 25px;
`;

const TitleWrapper = styled.View`
  margin-bottom: 16px;
`;

const MessageWrapper = styled.View`
  margin-bottom: 20px;
`;

const MessageText = styled(Body1)`
  color: ${({ theme }) => theme.colors.grey_6};
  text-align: left;
`;

const CherryCountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled(CherryIcon)`
  fill: ${({ theme }) => theme.colors.cherryRed_10};
`;

const UserCherries = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const PrimaryButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.redBlack};
`;

const PrimaryText = styled(Body1)`
  color: ${({ theme }) => theme.colors.white};
`;

const SecondaryButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: ${({ theme }) => theme.colors.grey_4};
  margin-right: 16px;
`;

const SecondaryText = styled(Body1)`
  color: ${({ theme }) => theme.colors.grey_6};
`;
