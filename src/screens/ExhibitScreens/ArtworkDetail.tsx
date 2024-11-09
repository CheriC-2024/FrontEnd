import React, { useEffect } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../navigation/types';
import { imageAssets } from '../../assets/DB/imageAssets';
import { Container } from 'src/styles/layout';
import { Caption, H4, Subtitle1, Subtitle2 } from 'src/styles/typography';
import { theme } from 'src/styles/theme';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Table } from 'src/components/_index';

type ArtworkDetailRouteProp = RouteProp<StackParamList, 'ArtworkDetail'>;

interface InfoItem {
  title: string;
  value: string;
}

const tableItems = [
  { label: '작가', content: '네번째작가' },
  { label: '시리즈', content: '아몬드 나무' },
  { label: '작품 크기', content: '740mm * 920mm' },
  { label: '재질(사용재료)', content: '캔버스에 유화' },
  { label: '제작시기', content: '1890년' },
  { label: '작품 분야', content: '회화, 서양화' },
];

const ArtworkDetail: React.FC = () => {
  const route = useRoute<ArtworkDetailRouteProp>();
  const navigation = useNavigation();
  const { isCollectorOnly, imageUrl, title } = route.params;
  const imageSource = imageAssets[imageUrl];

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'both',
        leftButtonText: '작품의 상세 정보',
        marginLeft: 0,
      }),
    );
  }, [navigation]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArtworkTitleContainer>
          <H4>{title}</H4>
          {isCollectorOnly && (
            <CollectorOnlyImage
              source={require('../../assets/images/ExhibitPage/collectors_only.png')}
            />
          )}
        </ArtworkTitleContainer>
        <ImageContainer>
          <MainImage source={imageSource} />
          <CharacterImage
            source={require('../../assets/images/Character/character_front.png')}
          />
        </ImageContainer>

        {isCollectorOnly ? (
          <>
            <RealImagesContainer>
              <RealImage source={imageSource} />
              <RealImage source={imageSource} />
              <RealImage source={imageSource} />
            </RealImagesContainer>
          </>
        ) : (
          <>
            <Subtitle2>작가의 작품 소개</Subtitle2>
            <IntroTextContainer>
              <InfoText>
                안녕하세요 저는 현재 10년 경력의 작가 네번째작가라고 합니다.
                이번 작품은 제 어릴적 좋아하던 동화책에서 영감을 받아 작업한
                작품이에요. 여러분도 어릴적 좋아하던 동화의 주인공이 있지
                않으신가요? 제가 좋아하는 주인공인 피터팬을 모티브로 세상을
                자유롭게 여행하는 한 아이의 이야기를 담았습니다.
              </InfoText>
            </IntroTextContainer>
          </>
        )}

        <Subtitle2>작품 기본 정보</Subtitle2>
        <View style={{ marginTop: 8, marginBottom: 16 }}>
          <Table items={tableItems} />
        </View>
        {isCollectorOnly ? (
          <>
            <Subtitle2>작품 소장 정보</Subtitle2>
            <InfoContainer>
              {collectorOwnershipInfoItems.map((item, index) => (
                <InfoRow key={index}>
                  <InfoTitle>{item.title}</InfoTitle>
                  <InfoText>{item.value}</InfoText>
                </InfoRow>
              ))}
            </InfoContainer>
          </>
        ) : (
          <>
            <Subtitle2>작품 이용 유의사항</Subtitle2>
            <InfoContainer>
              {publicUsageInfoItems.map((item, index) => (
                <InfoRow key={index}>
                  <InfoTitle>{item.title}</InfoTitle>
                  <InfoText>{item.value}</InfoText>
                </InfoRow>
              ))}
            </InfoContainer>
          </>
        )}
        <View style={{ height: 120 }} />
      </ScrollView>
    </Container>
  );
};

const collectorInfoItems: InfoItem[] = [
  { title: '작가', value: '세번째 작가' },
  { title: '시리즈', value: '넘버링 드림' },
  {
    title: '작품 설명',
    value:
      '세번째 작가의 넘버링 드림 시리즈 중 3번째 작품으로 작가는 어릴적 자신이 꾸던 꿈에서 영감을 받아 캔버스로 옮긴 작품입니다.',
  },
  { title: '작품 크기', value: '740mm*920mm' },
  { title: '재질(사용재료)', value: '캔버스에 유채' },
  { title: '제작시기', value: '2011년' },
  { title: '작품 분야', value: '회화, 서양화' },
];

const publicInfoItems: InfoItem[] = [
  { title: '작가', value: '빈센트 반 고흐' },
  { title: '시리즈', value: '아몬드 나무' },
  {
    title: '작품 설명',
    value:
      '빈센트 반 고흐의 아몬드 나무 시리즈 중 1번째 작품으로 세계적으로 유명한 빈센트 반고흐의 작품으로 현재 국제 미술관에서 소장중입니다.',
  },
  { title: '작품 크기', value: '740mm*920mm' },
  { title: '재질(사용재료)', value: '캔버스에 유채' },
  { title: '제작시기', value: '1890년' },
  { title: '작품 분야', value: '회화, 서양화' },
];

const publicUsageInfoItems: InfoItem[] = [
  { title: '공개 여부', value: '무료' },
  { title: '저작권자', value: '국제 미술관' },
  {
    title: '유의사항',
    value:
      '전시에 해당 작품은 무료로 활용할 수 있습니다. 단, 외부로의 유출을 금지하고 있으며, 캡처, 다운로드 등을 막아두고 있습니다. 이점 유의하시기 바랍니다.',
  },
];

const collectorOwnershipInfoItems: InfoItem[] = [
  { title: '소장 일시', value: '2024년 04월 15일' },
  { title: '소장 장소', value: '비스토리 갤러리' },
  { title: '작품 구매 가격', value: '300만 원' },
];

const ArtworkTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.s5};
  margin-bottom: ${({ theme }) => theme.margin.l};
`;

const CollectorOnlyImage = styled.Image`
  margin-left: 8px;
  width: 100px;
  height: 40px;
`;

const ImageContainer = styled.View`
  position: relative;
  width: 100%;
  align-items: center;
`;

const MainImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.xs};
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const CharacterImage = styled.Image`
  position: absolute;
  top: -75px;
  right: 18px;
  width: 55px;
  height: 75px;
`;

const RealImagesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.margin.xs};
  margin-bottom: ${({ theme }) => theme.spacing.s9};
`;

const RealImage = styled.Image`
  width: 32%;
  height: 150px;
  border-radius: ${({ theme }) => theme.radius.xs};
`;

const InfoContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.s4} 0;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const InfoTitle = styled(Caption)`
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-right: ${({ theme }) => theme.spacing.s3};
`;

const IntroTextContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.grey_4};
  border-radius: ${({ theme }) => theme.radius.m};
  padding: 20px 26px;
  margin-top: ${({ theme }) => theme.margin.xs};
  margin-bottom: ${({ theme }) => theme.margin.m};
  shadow-color: rgba(0, 0, 0, 0.3);
  shadow-offset: 0px 2px;
  shadow-opacity: 1;
  shadow-radius: 6px;
  elevation: 5;
  overflow: visible;
`;

const InfoText = styled(Caption)`
  flex: 1;
  flex-wrap: wrap;
  line-height: 18px;
`;

export default ArtworkDetail;
