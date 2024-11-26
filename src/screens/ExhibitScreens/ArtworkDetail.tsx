import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { StackParamList } from '../../navigation/types';
import { Container } from 'src/styles/layout';
import { Caption, H4, Subtitle2 } from 'src/styles/typography';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Table } from 'src/components/_index';
import { useArtworkData } from 'src/api/hooks/useArtworkQueries';

type ArtworkDetailRouteProp = RouteProp<StackParamList, 'ArtworkDetail'>;

interface InfoItem {
  title: string;
  value: string;
}

const ArtworkDetail: React.FC = () => {
  const route = useRoute<ArtworkDetailRouteProp>();
  const navigation = useNavigation();
  const { artworkId } = route.params;
  console.log(artworkId);
  const { data: artworkData, isLoading } = useArtworkData(artworkId);

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

  if (isLoading) {
    return;
  }

  const tableItems = [
    { label: '작가', content: artworkData.artistName },
    { label: '시리즈', content: artworkData.series },
    {
      label: '작품 크기',
      content: `${artworkData.horizontalSize}mm * ${artworkData.verticalSize}mm`,
    },
    { label: '재질(사용재료)', content: artworkData.material },
    { label: '제작시기', content: artworkData.madeAt },
    { label: '작품 분야', content: artworkData.artTypes.join(', ') },
  ];

  const publicUsageInfoItems: InfoItem[] = [
    {
      title: '공개 여부',
      value:
        artworkData.cherryPrice === 0
          ? '무료'
          : `유료(전시 1회당 ${artworkData.cherryPrice}체리)`,
    },
    { title: '저작권자', value: artworkData.artistName },
    {
      title: '유의사항',
      value:
        artworkData.cherryPrice === 0
          ? '전시에 해당 작품은 무료로 활용할 수 있습니다. 단, 외부로의 유출을 금지하고 있으며, 캡처, 다운로드 등을 막아두고 있습니다. 이점 유의하시기 바랍니다.'
          : '전시에 해당 작품은 유료로 활용할 수 있습니다. 저작권자인 작가가 설정한 금액(체리)을 전시당 지불하시면, 전시에 활용하실 수 있습니다. 단, 외부로의 유출을 금지하고 있으며, 캡처, 다운로드 등을 막아두고 있습니다. 이점 유의하시기 바랍니다.',
    },
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArtworkTitleContainer>
          <H4>{artworkData.name}</H4>
          {artworkData.collectorsArt && (
            <CollectorOnlyImage
              source={require('../../assets/images/ExhibitPage/collectors_only.png')}
            />
          )}
        </ArtworkTitleContainer>
        <ImageContainer>
          <MainImage source={{ uri: artworkData.imgUrl }} />
          <CharacterImage
            source={require('../../assets/images/Character/character_front.png')}
          />
        </ImageContainer>

        {/* {artworkData.collectorsArt && (
          <>
            <RealImagesContainer>
              <RealImage source={imageSource} />
              <RealImage source={imageSource} />
              <RealImage source={imageSource} />
            </RealImagesContainer>
          </>
        )}  */}
        <Subtitle2>작가의 작품 소개</Subtitle2>
        <IntroTextContainer>
          <InfoText>{artworkData.description}</InfoText>
        </IntroTextContainer>

        <Subtitle2>작품 기본 정보</Subtitle2>
        <View style={{ marginTop: 8, marginBottom: 16 }}>
          <Table items={tableItems} />
        </View>
        {artworkData.collectorsArt && (
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
        )}
        <Subtitle2>작품 이용 유의사항</Subtitle2>
        <InfoContainer>
          {publicUsageInfoItems.map((item, index) => (
            <InfoRow key={index}>
              <InfoTitle>{item.title}</InfoTitle>
              <InfoText>{item.value}</InfoText>
            </InfoRow>
          ))}
        </InfoContainer>

        <View style={{ height: 120 }} />
      </ScrollView>
    </Container>
  );
};

// TODO: 소장 작품 정보 추가
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
