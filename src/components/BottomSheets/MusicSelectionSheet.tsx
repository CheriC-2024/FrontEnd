import React, { useEffect } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import useSlideAnimation from 'src/hooks/useSlideAnimation';
import { Body2, ButtonText, H4 } from 'src/styles/typography';

const MusicSelectionSheet = ({
  isVisible,
  onClose,
  selectedMusic,
  setSelectedMusic,
}) => {
  const { slideAnim, slideIn, slideOut } = useSlideAnimation();
  const selectedThemes = useSelector(
    (state: RootState) => state.theme.selectedThemes,
  );

  const handleMusicSelect = (music: string) => {
    if (selectedMusic === music) {
      setSelectedMusic(null);
    } else {
      setSelectedMusic(music);
    }
  };

  useEffect(() => {
    if (isVisible) {
      slideIn();
    }
  }, [isVisible]);

  const handleClose = () => slideOut(onClose);

  return (
    <Modal
      visible={isVisible}
      animationType='none'
      transparent
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
            >
              <SheetContainer>
                <HeaderContainer>
                  <Title>🎵 전시 배경 음악 설정하기</Title>
                </HeaderContainer>
                <Subtitle>
                  컬렉터님의 전시 테마를 기반으로 추천된 배경음이에요
                </Subtitle>
                <TagsContainer>
                  {selectedThemes.map((theme, index) => (
                    <Tag key={index}>#{theme}</Tag>
                  ))}
                </TagsContainer>
                <ScrollView style={{ flexGrow: 1 }}>
                  {['Brightness', 'Colorful', 'Upbeat Melody'].map(
                    (music, index) => (
                      <MusicItem
                        key={index}
                        selected={selectedMusic === music}
                        onPress={() => handleMusicSelect(music)}
                      >
                        <Icon
                          name='musical-note-outline'
                          size={20}
                          color='#120000'
                        />
                        <MusicText>{music}</MusicText>
                      </MusicItem>
                    ),
                  )}
                </ScrollView>
              </SheetContainer>
            </Animated.View>
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const SheetContainer = styled.View`
  background-color: #f7f5f5;
  border-top-left-radius: ${({ theme }) => theme.radius.m};
  border-top-right-radius: ${({ theme }) => theme.radius.m};
  padding: 28px 16px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled(H4)``;

const Subtitle = styled(Body2)`
  color: ${({ theme }) => theme.colors.grey_8};
  margin-bottom: 15px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const Tag = styled(ButtonText)`
  color: #fff;
  background-color: ${({ theme }) => theme.colors.redBlack};
  padding: 4px 12px;
  border-radius: 20px;
  margin-right: 4px;
  letter-spacing: 0.5px;
`;

const MusicItem = styled(TouchableOpacity)<{ selected: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  border: 1.7px dashed
    ${(props) => (props.selected ? '#E52C32' : 'transparent')};
  border-radius: 30px;
  margin-horizontal: 3px;
  margin-bottom: 10px;
  elevation: 3;
  overflow: visible;
`;

const MusicText = styled(ButtonText)`
  margin-left: 10px;
`;

export default MusicSelectionSheet;
