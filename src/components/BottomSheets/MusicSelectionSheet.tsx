import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const MusicSelectionSheet = ({
  isVisible,
  onClose,
  selectedMusic,
  setSelectedMusic,
}) => {
  const selectedThemes = useSelector(
    (state: RootState) => state.theme.selectedThemes,
  );

  const handleMusicSelect = (music: string) => {
    if (selectedMusic === music) {
      setSelectedMusic(null); // Deselect if already selected
    } else {
      setSelectedMusic(music);
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType='slide'
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <SheetContainer>
              <HeaderContainer>
                <Icon name='musical-notes-outline' size={24} color='#120000' />
                <Title>전시 배경 음악 설정하기</Title>
              </HeaderContainer>
              <Subtitle>
                컬렉터님의 전시 테마를 기반으로 추천된 배경음이에요
              </Subtitle>
              <TagsContainer>
                {selectedThemes.map((theme, index) => (
                  <Tag key={index}>#{theme}</Tag>
                ))}
              </TagsContainer>
              <ScrollView>
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
          </TouchableWithoutFeedback>
        </ModalContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SheetContainer = styled.View`
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  max-height: 50%;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
  margin-left: 10px;
  color: #120000;
`;

const Subtitle = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  color: #413333;
  margin-bottom: 15px;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

const Tag = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  color: #fff;
  background-color: #120000;
  padding: 4px 12px;
  border-radius: 20px;
  margin-right: 6px;
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

const MusicText = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  margin-left: 10px;
`;

export default MusicSelectionSheet;
