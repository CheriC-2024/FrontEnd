import React from 'react';
import styled from 'styled-components/native';
import { View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProfileImage } from 'src/slices/userSlice';
import { ButtonText, Caption, H4, H5, Subtitle2 } from 'src/styles/typography';
import { RootState } from 'src/store';
import { Container } from 'src/styles/layout';
import { CherryIcon, ForwardIcon } from 'src/assets/icons/_index';
import { useNavigation } from '@react-navigation/native';

const MyCheriCScreen: React.FC = () => {
  const navigation = useNavigation();
  //TODO: 유저 정보 불러오는 API 연결
  const { nickname, interests } = useSelector((state: RootState) => state.user);
  const profileImage = useSelector(selectProfileImage);

  // TODO: 화면 이름 정리
  const exhibitSettings = [
    { title: '내가 게시한 컬렉션 전시', screen: 'PostedCollectionScreen' },
    { title: '내가 좋아요한 컬렉션 전시', screen: 'RequestedCollectionScreen' },
    { title: '내가 작성한 방명록', screen: 'ReviewScreen' },
    { title: '작품 구매 내역', screen: 'PurchaseHistoryScreen' },
  ];

  const collectingSettings = [
    { title: '컬렉션 리스트', screen: 'CollectionListScreen' },
    { title: '소장 작품 등록하기', screen: 'PrivateArtRegister' },
    { title: '등록한 소장 작품', screen: 'RegisteredArtworkScreen' },
    { title: '내가 좋아요한 작품', screen: 'LikedArtworkScreen' },
    { title: '내가 보낸 작품 요청', screen: 'SentRequestsScreen' },
  ];

  const extraSettings = [
    { title: '작가로 인증하기', screen: 'ArtistRegister' },
    { title: '공지사항 및 이벤트', screen: 'RegisterArtworkScreen' },
    { title: 'CheriC에 문의하기', screen: 'RegisteredArtworkScreen' },
  ];

  const handleNavigation = (screen: string) => {
    navigation.navigate('MyChericStack', { screen });
  };

  return (
    <Container removePadding>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileSection>
          <ProfileImage source={{ uri: profileImage }} />
          <ProfileInfo>
            <Name>닉네임</Name>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TagTitle>선호 분야</TagTitle>
              <Tags>유화</Tags>
              <Tags>회화</Tags>
            </View>
          </ProfileInfo>
          <ProfileButton>
            <ProfileButtonText>내 프로필 보기</ProfileButtonText>
          </ProfileButton>
        </ProfileSection>
        <SectionTitle>체리 관리하기</SectionTitle>
        <CherryCard>
          <CurrentCherryContainer>
            <CherryLabel>현재 보유중인 체리</CherryLabel>
            <CherryCountWrapper>
              <CherryIcon fill={'#E52C32'} width={25} height={22} />
              <CherryCount>10</CherryCount>
            </CherryCountWrapper>
          </CurrentCherryContainer>
          <CherryButtonsWrapper>
            <CherryButton>
              <CherryButtonText>체리 충전하기</CherryButtonText>
            </CherryButton>
            <CherryButton>
              <CherryButtonText>체리 내역 보기</CherryButtonText>
            </CherryButton>
          </CherryButtonsWrapper>
        </CherryCard>
        <Section>
          <SectionTitle>나의 컬렉션 전시 활동</SectionTitle>
          {exhibitSettings.map((item, index) => (
            <ListItem key={index} onPress={() => handleNavigation(item.screen)}>
              <ListItemText>{item.title}</ListItemText>
              <ForwardIcon />
            </ListItem>
          ))}
        </Section>
        <Section>
          <SectionTitle>나의 컬렉션 전시 활동</SectionTitle>
          {collectingSettings.map((item, index) => (
            <ListItem key={index} onPress={() => handleNavigation(item.screen)}>
              <ListItemText>{item.title}</ListItemText>
              <ForwardIcon />
            </ListItem>
          ))}
        </Section>
        <Section>
          <SectionTitle>나의 컬렉션 전시 활동</SectionTitle>
          {extraSettings.map((item, index) => (
            <ListItem key={index} onPress={() => handleNavigation(item.screen)}>
              <ListItemText>{item.title}</ListItemText>
              <ForwardIcon />
            </ListItem>
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
};

export default MyCheriCScreen;

const CherryCard = styled.View`
  flex-direction: row;
  margin-bottom: 28px;
  padding: 0 16px;
`;

const CurrentCherryContainer = styled.View`
  background-color: #fff;
  border-radius: 16px;
  padding: 20px 32px;
  border: 1px solid #f2f0f0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CherryLabel = styled(Caption)`
  margin-bottom: 8px;
`;

const CherryButtonsWrapper = styled.View`
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 12px;
`;

const CherryButton = styled.TouchableOpacity`
  margin-top: 8px;
  padding: 8px 14px;
  background-color: #fff;
  border-radius: 24px;
  elevation: 2;
`;

const CherryButtonText = styled(Caption)``;

const CherryCountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileSection = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 0 16px;
  margin-top: 8px;
  margin-bottom: 24px;
`;

const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 8px;
  elevation: 4;
`;

const ProfileInfo = styled.View`
  flex: 1;
  margin-top: 4px;
`;

const Name = styled(H5)``;

const TagTitle = styled(Caption)`
  margin-right: 4px;
  color: ${({ theme }) => theme.colors.grey_8};
`;

const Tags = styled(TagTitle)`
  padding: 4px 8px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.grey_4};
  text-align: center;
`;

const ProfileButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.redBlack};
  margin-top: 4px;
  padding: 10px 12px;
  border-radius: 20px;
  elevation: 4;
`;

const ProfileButtonText = styled(Caption)`
  color: #fff;
`;

const Section = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled(Subtitle2)`
  margin-bottom: 8px;
  padding: 0 16px;
`;

const ListItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f2f0f0;
  background-color: #fff;
`;

const ListItemText = styled(ButtonText)``;

const CherryCount = styled(H4)`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.grey_8};
`;
