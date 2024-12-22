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
import { artistData, artworkData } from '../data'; // 더미 데이터
import LinearGradient from 'react-native-linear-gradient';
import { useFetchArtTypes } from 'src/api/hooks/useArtworkQueries';
import { ForwardIcon } from 'src/assets/icons/_index';
import { useRecommendUsers } from 'src/api/hooks/useUserQueries';
import { artTypeMapping } from 'src/utils/artTypeMapper';

const artTypes = Object.keys(artTypeMapping);

const useArtTypeData = () => {
  return artTypes.map((artType) => {
    const { data, isLoading, isError } = useRecommendUsers({
      isArtist: true,
      artType,
      order: 'LATEST',
      size: 5,
    });

    return {
      artType,
      title: artTypeMapping[artType], // 한글 이름 매핑
      data,
      isLoading,
      isError,
    };
  });
};

const CollectingScreen: React.FC = () => {
  const navigation = useNavigation();
  const images = [
    require('src/assets/images/CollectingPage/swipe1.png'),
    // require('src/assets/images/CollectingPage/swipe_test2.png'),
    // require('src/assets/images/CollectingPage/swipe_test3.png'),
  ];

  const [selectedCoverType, setSelectedCoverType] = useState<'작품' | '작가'>(
    '작품',
  );
  const { data: apiData, isLoading, isError } = useFetchArtTypes();
  const {
    data: artistAndArtworkData,
    isLoading: isArtistAndArtworkDataLoading,
    isError: isArtistAndArtworkDataError,
  } = useRecommendUsers({
    artType: 'PAINTING',
    order: 'LATEST',
    size: 5,
  });

  const artTypeData = useArtTypeData(); // artType 데이터를 가져옴

  // 데이터를 상위 2개와 나머지로 그룹화
  const topCategories = artTypeData.slice(0, 2); // 상위 2개의 artType
  const remainingCategories = artTypeData.slice(2); // 나머지 artType

  const handleCoverTypeChange = (type: '작품' | '작가') => {
    setSelectedCoverType(type);
  };
  const handleNavigation = (screen: string, categoryTitle: string) => {
    navigation.navigate('CollectingStack', {
      screen: screen,
      params: { categoryTitle },
    });
  };

  const transformArtworkData = (artworkResponse: any) => {
    const recommended = {
      categoryTitle: '컬렉터님을 위한 추천',
      sections: [],
    };

    const otherCategories = {
      categoryTitle: '체리시의 미술 작품',
      sections: [],
    };

    artworkResponse.forEach((item: any) => {
      const section = {
        title: item.artType,
        data: item.artMostBriefListRess.map((art: any) => ({
          id: art.artId,
          image: art.imgUrl,
        })),
      };

      if (item.userPreference) {
        recommended.sections.push(section);
      } else {
        otherCategories.sections.push(section);
      }
    });

    return [recommended, otherCategories];
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
      {/* 컬렉터님을 위한 추천 */}
      <ArtistSectionWrapper>
        <H5>컬렉터님을 위한 추천</H5>
        {topCategories.map((category, index) => {
          const { title, data, isLoading, isError } = category;

          if (isLoading) {
            return (
              <CategoryWrapper key={index}>
                <ArtistCategoryTitle>{title}</ArtistCategoryTitle>
                <Caption>로딩 중...</Caption>
              </CategoryWrapper>
            );
          }

          if (isError || !data) {
            return (
              <CategoryWrapper key={index}>
                <ArtistCategoryTitle>{title}</ArtistCategoryTitle>
                <Caption>데이터를 가져오는 중 오류가 발생했습니다.</Caption>
              </CategoryWrapper>
            );
          }

          return (
            <CategoryWrapper key={index}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('CollectingStack', {
                    screen: 'ArtistCollecting',
                    params: { categoryTitle: category.title }, // Pass artType as a param
                  })
                }
              >
                <SectionTitle>{title}</SectionTitle>
                <View style={{ marginBottom: 8 }}>
                  <ForwardIcon width={22} height={22} />
                </View>
              </TouchableOpacity>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ArtistWithArtworks
                    artist={{
                      id: item.id,
                      name: item.name,
                      image: item.profileImgUrl,
                    }}
                    artworks={item.artBriefRess.map((artwork) => ({
                      id: artwork.artId,
                      fileName: artwork.imgUrl,
                      name: artwork.name,
                      cherryNum: artwork.cherryPrice,
                      register: artwork.collectorsArt ? 'COLLECTOR' : 'ARTIST',
                    }))}
                  />
                )}
                contentContainerStyle={{ paddingRight: 16 }}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              />
            </CategoryWrapper>
          );
        })}
      </ArtistSectionWrapper>
      <SeparatorLine />
      {/* 체리시의 작가 */}
      <ArtistSectionWrapper>
        <H5>체리시의 작가님들</H5>
        {remainingCategories.map((category, index) => {
          const { title, data, isLoading, isError } = category;

          if (isLoading) {
            return (
              <CategoryWrapper key={index}>
                <ArtistCategoryTitle>{title}</ArtistCategoryTitle>
                <Caption>로딩 중...</Caption>
              </CategoryWrapper>
            );
          }

          if (isError || !data) {
            return (
              <CategoryWrapper key={index}>
                <ArtistCategoryTitle>{title}</ArtistCategoryTitle>
                <Caption>데이터를 가져오는 중 오류가 발생했습니다.</Caption>
              </CategoryWrapper>
            );
          }

          return (
            <CategoryWrapper key={index}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('CollectingStack', {
                    screen: 'ArtistCollecting',
                    params: { categoryTitle: category.title }, // Pass artType as a param
                  })
                }
              >
                <SectionTitle>{title}</SectionTitle>
                <View style={{ marginBottom: 8 }}>
                  <ForwardIcon width={22} height={22} />
                </View>
              </TouchableOpacity>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <ArtistWithArtworks
                    artist={{
                      id: item.id,
                      name: item.name,
                      image: item.profileImgUrl,
                    }}
                    artworks={item.artBriefRess.map((artwork) => ({
                      id: artwork.artId,
                      fileName: artwork.imgUrl,
                      name: artwork.name,
                      cherryNum: artwork.cherryPrice,
                      register: artwork.collectorsArt ? 'COLLECTOR' : 'ARTIST',
                    }))}
                  />
                )}
                contentContainerStyle={{ paddingRight: 16 }}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              />
            </CategoryWrapper>
          );
        })}
      </ArtistSectionWrapper>
    </View>
  );

  const renderArtworkSection = () => {
    if (isLoading || isArtistAndArtworkDataLoading) {
      // Return a placeholder JSX instead of nothing
      return <View style={{ padding: 20 }}></View>;
    }

    if (isError || !apiData || isArtistAndArtworkDataError) {
      // Return an error placeholder JSX instead of nothing
      return (
        <View style={{ padding: 20 }}>
          <Caption>Error loading artwork data.</Caption>
        </View>
      );
    }

    // Transform the API response into the required structure
    const transformedData = transformArtworkData(apiData);

    return (
      <Container>
        <FlatList
          data={transformedData}
          keyExtractor={(item) => item.categoryTitle || item.key}
          renderItem={({ item }) => {
            return (
              <CategoryWrapper is2ndSection>
                <CategoryTitle>{item.categoryTitle}</CategoryTitle>
                {item.sections.map((section) => (
                  <SectionWrapper key={section.title}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() =>
                        navigation.navigate('CollectingStack', {
                          screen: 'ArtCollecting',
                          params: { categoryTitle: section.title }, // Pass artType as a param
                        })
                      }
                    >
                      <SectionTitle>{section.title}</SectionTitle>
                      <View style={{ marginBottom: 8 }}>
                        <ForwardIcon width={22} height={22} />
                      </View>
                    </TouchableOpacity>
                    <FlatList
                      data={section.data}
                      keyExtractor={(subItem) => subItem.id.toString()}
                      horizontal
                      renderItem={({ item: art }) => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('CollectingStack', {
                              screen: 'ArtworkInfo', // Specify the screen within the stack
                              params: { artworkId: art.id }, // Pass artId as a parameter
                            })
                          }
                        >
                          <ImageWrapper>
                            <StyledImage source={{ uri: art.image }} />
                          </ImageWrapper>
                        </TouchableOpacity>
                      )}
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ overflow: 'visible', zIndex: 3 }}
                    />
                  </SectionWrapper>
                ))}
              </CategoryWrapper>
            );
          }}
          ListFooterComponent={<View style={{ height: 60 }} />}
        />
      </Container>
    );
  };

  return (
    <Container removePadding>
      <FlatList
        data={artworkData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // Sticky header
        ListHeaderComponent={
          <>
            <View style={{ position: 'relative', marginBottom: 18 }}>
              <Swiper
                loop
                timeout={2}
                controlsEnabled={false}
                containerStyle={{ width: '100%', height: 320 }}
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
                    <GradientOverlay />
                  </View>
                ))}
              </Swiper>
              <Button
                onPress={() =>
                  navigation.navigate('MyChericStack', {
                    screen: 'PrivateArtRegisterStack',
                    params: { screen: 'AddArtwork' },
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
          return null; // Avoid early returns causing hook mismatch
        }}
        ListFooterComponent={
          <View>
            {selectedCoverType === '작품' && renderArtworkSection()}
            {selectedCoverType === '작가' && renderArtistSection()}
          </View>
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
  /* background-color: ${({ is2ndSection, theme }) =>
    is2ndSection ? theme.colors.bg : theme.colors.grey_4}; */
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
  margin-right: 8px;
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
