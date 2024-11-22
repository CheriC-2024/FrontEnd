import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';

const Container = styled(ScrollView)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 15px;
`;

const ProfileInfo = styled.View`
  flex: 1;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Tags = styled.Text`
  color: #666;
`;

const ProfileButton = styled.TouchableOpacity`
  background-color: #333;
  padding: 8px 15px;
  border-radius: 20px;
`;

const ProfileButtonText = styled.Text`
  color: #fff;
  font-size: 12px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

const ListItemText = styled.Text`
  font-size: 14px;
  color: #333;
`;

const CherrySection = styled.View`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
`;

const CherryCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  background-color: #eee;
  padding: 8px 15px;
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  font-size: 12px;
  color: #333;
`;

const MyCheriCScreen: React.FC = () => {
  return (
    <Container>
      {/* Profile Section */}
      <ProfileSection>
        <ProfileImage source={{ uri: 'https://via.placeholder.com/60' }} />
        <ProfileInfo>
          <Name>닉네임</Name>
          <Tags>선호 분야 | 유화 | 목화</Tags>
        </ProfileInfo>
        <ProfileButton>
          <ProfileButtonText>내 프로필 보기</ProfileButtonText>
        </ProfileButton>
      </ProfileSection>

      {/* Cherry Management Section */}
      <SectionTitle>체리 관리하기</SectionTitle>
      <CherryCard>
        <CherryInfo>
          <CherryLabel>현재 보유중인 체리</CherryLabel>
          <CherryCountWrapper>
            <CherryIcon
              source={{ uri: 'https://via.placeholder.com/24?text=🍒' }}
            />
            <CherryCount>10</CherryCount>
          </CherryCountWrapper>
        </CherryInfo>
      </CherryCard>
      <ButtonGroup>
        <Button>
          <ButtonText>체리 충전하기</ButtonText>
        </Button>
        <Button>
          <ButtonText>체리 내역 보기</ButtonText>
        </Button>
      </ButtonGroup>

      {/* Collection Exhibition Activities */}
      <SectionTitle>나의 컬렉션 전시 활동</SectionTitle>
      <ListItem>
        <ListItemText>내가 게시한 컬렉션 전시</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>내가 요청한 컬렉션 전시</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>내가 작성한 관람 후기</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>작품 구매 내역</ListItemText>
      </ListItem>

      {/* Collecting Activities */}
      <SectionTitle>나의 컬렉팅 활동</SectionTitle>
      <ListItem>
        <ListItemText>컬렉션 리스트</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>소장 작품 등록하기</ListItemText>
      </ListItem>
    </Container>
  );
};

export default MyCheriCScreen;

const CherryCard = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid #eee;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

// 체리 정보
const CherryInfo = styled.View`
  flex-direction: column;
`;

const CherryLabel = styled.Text`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const CherryCountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CherryIcon = styled.Image`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;
