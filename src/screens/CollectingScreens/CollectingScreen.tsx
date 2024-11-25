import React, { useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-web-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ArtistBioItem,
  ArtistCard,
  ArtistImage,
  ArtistWithArtworks,
  SeparatorLine,
  TitleSubtitle,
} from 'src/components/_index';
import { Container } from 'src/styles/layout';
import {
  Body2,
  Caption,
  H5,
  H6,
  Subtitle1,
  Subtitle2,
} from 'src/styles/typography';
import { artistAndArtworkData, artistData, artworkData } from '../data'; // 더미 데이터
import LinearGradient from 'react-native-linear-gradient';

const CollectingScreen: React.FC = () => {
  const navigation = useNavigation();
  const images = [
    require('src/assets/images/CollectingPage/swipe_test1.png'),
    require('src/assets/images/CollectingPage/swipe_test2.png'),
    require('src/assets/images/CollectingPage/swipe_test3.png'),
  ];

  const [selectedCoverType, setSelectedCoverType] = useState<'작품' | '작가'>(
    '작품',
  );

  const handleCoverTypeChange = (type: '작품' | '작가') => {
    setSelectedCoverType(type);
  };
  const handleNavigation = (screen: string, categoryTitle: string) => {
    navigation.navigate('CollectingStack', {
      screen: screen,
      params: { categoryTitle },
    });
  };

  const renderCategoryButtons = () => (
    <CategoryButtons>
      <CategoryTypeButton
        selected={selectedCoverType === '작품'}
        onPress={() => handleCoverTypeChange('작품')}
      >
        <CategoryTypeButtonText selected={selectedCoverType === '작품'}>
          작품 기준
        </CategoryTypeButtonText>
      </CategoryTypeButton>
      <CategoryTypeButton
        selected={selectedCoverType === '작가'}
        onPress={() => handleCoverTypeChange('작가')}
      >
        <CategoryTypeButtonText selected={selectedCoverType === '작가'}>
          작가 기준
        </CategoryTypeButtonText>
      </CategoryTypeButton>
    </CategoryButtons>
  );

  const renderArtistSection = () => (
    <View>
      <ArtistSectionWrapper>
        <CategoryTitle>새로 유입된 신진 작가</CategoryTitle>
        <FlatList
          data={artistData}
          keyExtractor={(item) => item.id}
          horizontal
          initialNumToRender={2}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />} // 아이템 사이 간격 설정
          contentContainerStyle={{ paddingHorizontal: 2 }}
          renderItem={({ item }) => (
            <ArtistCard
              image={item.image}
              name={item.name}
              artistId={item.id}
              size={74}
            />
          )}
        />
      </ArtistSectionWrapper>
      <SeparatorLine />
      <ArtistSectionWrapper>
        <H5>내가 팔로우한 작가 소식</H5>
        <FlatList
          data={[...artistData].reverse()}
          keyExtractor={(item) => item.id}
          horizontal
          initialNumToRender={2}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{ paddingTop: 4 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FollowingArtistWrapper>
              <ArtistInfoWrapper>
                <ArtistImage
                  image={item.image}
                  size={36}
                  style={{ elevation: 0 }}
                />
                <ArtistInfo>
                  <ArtistName>{item.name}</ArtistName>
                  <ArtistTime>08.27 22:00</ArtistTime>
                </ArtistInfo>
              </ArtistInfoWrapper>
              <TouchableOpacity onPress={() => {}}>
                <ArtworkImage
                  source={{
                    uri: item.backgroundImage,
                  }}
                />
              </TouchableOpacity>
              <ArtistDescription>
                작가님의 새로운 작품이 추가되었습니다!
              </ArtistDescription>
            </FollowingArtistWrapper>
          )}
        />
      </ArtistSectionWrapper>
      <SeparatorLine />
      <ArtistSectionWrapper>
        <H5>HOT한 작가님들</H5>
        <FlatList
          data={artistData}
          horizontal
          keyExtractor={(item) => item.id}
          initialNumToRender={3}
          ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          renderItem={({ item }) => (
            <ArtistBioItem
              image={item.image}
              name={item.name}
              category={item.description}
              bio={item.bio}
              artistId={item.id}
              backgroundImage={item.backgroundImage}
            />
          )}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
          showsHorizontalScrollIndicator={false}
        />
      </ArtistSectionWrapper>
      <FlatList
        data={artworkData.slice(1)} // 첫 번째 항목 (key) 제외, 이건 API 연결시 변경 예정
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryWrapper
            is2ndSection={item.categoryTitle === '체리시의 미술 작품'}
          >
            <ArtistCategoryTitle>{item.categoryTitle}</ArtistCategoryTitle>
            {item.sections?.map((section) => (
              <SectionWrapper key={section.title}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() =>
                    handleNavigation('ArtistCollecting', section.title)
                  }
                >
                  <SectionTitle>{section.title}</SectionTitle>
                  <Icon
                    name='chevron-forward'
                    size={20}
                    color='#120000'
                    style={{ paddingBottom: 7 }}
                  />
                </TouchableOpacity>
                {/* ArtistWithArtworks 컴포넌트를 사용한 가로 스크롤 */}
                <FlatList
                  data={artistAndArtworkData}
                  keyExtractor={(subItem) => subItem.artist.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item: subItem }) => (
                    <ArtistWithArtworks
                      artist={subItem.artist}
                      artworks={subItem.artworks}
                    />
                  )}
                  contentContainerStyle={{ paddingHorizontal: 0 }}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                />
              </SectionWrapper>
            ))}
          </CategoryWrapper>
        )}
        ListFooterComponent={<View style={{ height: 60 }} />}
      />
    </View>
  );

  const renderArtworkSection = () => (
    <FlatList
      data={artworkData.slice(1)} // 첫 번째 항목 (key) 제외, 이건 API 연결시 변경 예정
      keyExtractor={(item, index) => index.toString()}
      initialNumToRender={5}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CategoryWrapper
          is2ndSection={item.categoryTitle === '체리시의 미술 작품'}
        >
          <CategoryTitle>{item.categoryTitle}</CategoryTitle>
          {item.sections?.map((section) => (
            <SectionWrapper key={section.title}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                // section.title을 ArtCollecting으로 전달
                onPress={() => handleNavigation('ArtCollecting', section.title)}
              >
                <SectionTitle>{section.title}</SectionTitle>
                <Icon
                  name='chevron-forward'
                  size={20}
                  color='#120000'
                  style={{ paddingBottom: 7 }}
                />
              </TouchableOpacity>

              {/* ArtistWithArtworks 컴포넌트를 사용한 가로 스크롤 */}
              <FlatList
                data={section.data}
                keyExtractor={(subItem) => subItem.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: subItem }) => (
                  <TouchableOpacity
                    // section.title을 ArtCollecting으로 전달
                    onPress={() =>
                      handleNavigation('ArtworkInfo', { artworkId: subItem.id })
                    }
                  >
                    <ImageWrapper>
                      <StyledImage source={{ uri: subItem.image }} />
                    </ImageWrapper>
                  </TouchableOpacity>
                )}
              />
            </SectionWrapper>
          ))}
        </CategoryWrapper>
      )}
      ListFooterComponent={<View style={{ height: 60 }} />} // 리스트 하단 여백 값
    />
  );

  return (
    <Container removePadding>
      <FlatList
        data={artworkData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // CategoryButtons가 고정되도록 설정
        ListHeaderComponent={
          <>
            <View
              style={{
                position: 'relative',
                marginBottom: 18,
              }}
            >
              {/* Swiper 컴포넌트는 배경 이미지만 스와이프 */}
              <Swiper
                loop
                timeout={2}
                controlsEnabled={false}
                containerStyle={{
                  width: '100%',
                  height: 320,
                }}
              >
                {images.map((image, index) => (
                  <View key={index} style={{ position: 'relative' }}>
                    <Image
                      source={image}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                    {/* 그라데이션 추가 */}
                    <GradientOverlay />
                  </View>
                ))}
              </Swiper>
              {/* Swiper 외부에 고정된 버튼 */}
              <Button
                onPress={() =>
                  navigation.navigate('MyChericStack', {
                    screen: 'PrivateArtRegisterStack',
                    params: {
                      screen: 'AddArtwork',
                    },
                  })
                }
              >
                <ButtonContent>
                  <ButtonText>내가 소장한 작품 등록하러 가기</ButtonText>
                  <ButtonIcon
                    name='chevron-forward'
                    size={20}
                    color='#120000'
                  />
                </ButtonContent>
              </Button>
            </View>
            <TitleSubtitle
              style={{ paddingHorizontal: 16 }}
              titleLarge='아트 컬렉팅하기'
              subtitle='체리시에서 컬렉터님만의 컬렉션을 만들어 보세요:)'
            />
          </>
        }
        renderItem={({ item }) => {
          if (item.key === 'CATEGORY_BUTTONS') {
            return renderCategoryButtons();
          }
        }}
        ListFooterComponent={
          selectedCoverType === '작품'
            ? renderArtworkSection()
            : renderArtistSection()
        }
      />
    </Container>
  );
};

const GradientOverlay = styled(LinearGradient).attrs({
  colors: ['rgba(18, 0, 0, 0.2)', 'rgba(18, 0, 0, 0)'],
  start: { x: 0, y: 1 },
  end: { x: 0, y: 0.5 },
})`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
`;

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  position: absolute;
  bottom: 20px;
  left: 16px;
  right: 16px;
  border-radius: ${({ theme }) => theme.radius.l};
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'white')};
  z-index: 10;
  elevation: 4;
  overflow: visible;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ButtonText = styled(Subtitle2)`
  padding: 14px 20px;
  letter-spacing: 0.5px;
`;

const ButtonIcon = styled(Icon)`
  margin-right: 15px;
`;

const CategoryButtons = styled.View`
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing.s3} ${({ theme }) => theme.padding.m};
  background-color: ${({ theme }) =>
    theme.colors.bg}; /* sticky header 였을때 텍스트 겹쳐 보이는걸 방지 */
`;

const CategoryTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  margin-right: ${({ theme }) => theme.margin.s};
  padding: 2px 12px;
  border: 1px solid ${(props) => (props.selected ? undefined : '#F2F0F0')};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${(props) => (props.selected ? '#120000' : '#FFF')};
`;

const CategoryTypeButtonText = styled(Body2)<{ selected?: boolean }>`
  color: ${(props) => (props.selected ? '#fff' : '#B0ABAB')};
`;

const CategoryWrapper = styled.View<{ is2ndSection?: boolean }>`
  padding-top: ${({ is2ndSection, theme }) =>
    is2ndSection ? theme.padding.xs : theme.padding.m};
  padding-left: ${({ theme }) => theme.padding.m};
  padding-bottom: ${({ theme }) => theme.padding.m};
  margin-bottom: 20px;
  background-color: ${({ is2ndSection, theme }) =>
    is2ndSection ? theme.colors.bg : theme.colors.grey_4};
`;

const CategoryTitle = styled(H6)`
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const ArtistCategoryTitle = styled(H5)`
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const SectionWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const ArtistSectionWrapper = styled.View`
  padding-left: ${({ theme }) => theme.padding.m};
`;

const SectionTitle = styled(Subtitle1)`
  margin-bottom: ${({ theme }) => theme.spacing.s2};
`;

const ImageWrapper = styled.View`
  width: 115px;
  height: 142px;
  margin-right: ${({ theme }) => theme.spacing.s3};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.xs};
`;

const ArtistInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FollowingArtistWrapper = styled.View`
  width: 290px;
`;

const ArtistTime = styled(Caption)`
  font-size: 10px;
  color: #b0abab;
`;

const ArtistInfo = styled.View`
  flex-direction: column;
  margin-left: ${({ theme }) => theme.margin.xs};
`;

const ArtistName = styled(Subtitle2)``;

const ArtistDescription = styled(Body2)`
  color: ${({ theme }) => theme.colors.grey_8};
  margin-top: 4px;
  margin-left: 4px;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 184px;
  margin-top: 10px;
  border-radius: ${({ theme }) => theme.radius.m};
`;

export default CollectingScreen;
