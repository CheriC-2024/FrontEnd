import React from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MusicSelectionSheet = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <ModalContainer>
          <TouchableWithoutFeedback>
            <SheetContainer>
              <Title>
                <Icon name="musical-notes-outline" size={16} color="#000" />{' '}
                전시 배경 음악 설정하기
              </Title>
              <Subtitle>
                컬렉터님의 전시 테마를 기반으로 추천된 배경음이에요
              </Subtitle>
              <TagsContainer>
                <Tag>#따뜻한</Tag>
                <Tag>#재미있는</Tag>
                <Tag>#행복한</Tag>
              </TagsContainer>
              <ScrollView>
                <MusicItem>
                  <Icon name="musical-notes-outline" size={20} color="#000" />
                  <MusicText>음악 이름</MusicText>
                </MusicItem>
                <MusicItem>
                  <Icon name="musical-notes-outline" size={20} color="#000" />
                  <MusicText>음악 이름</MusicText>
                </MusicItem>
                <MusicItem>
                  <Icon name="musical-notes-outline" size={20} color="#000" />
                  <MusicText>음악 이름</MusicText>
                </MusicItem>
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

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
  margin-bottom: 5px;
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
  color: #000;
  background-color: #fff;
  border: 1px #f7f5f5;
  padding: 4px 12px;
  border-radius: 20px;
  margin-right: 6px;
  letter-spacing: 0.5px;
`;

const MusicItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 30px;
  margin-bottom: 10px;
`;

const MusicText = styled.Text`
  font-family: 'Regular';
  font-size: 14px;
  margin-left: 10px;
`;

export default MusicSelectionSheet;
