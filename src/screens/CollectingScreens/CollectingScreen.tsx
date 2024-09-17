import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-web-swiper';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Caption, H5, H6, Subtitle1, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';
import { artistAndArtworkData, artistData, artworkData } from '../data';
import {
  ArtistBioItem,
  ArtistCard,
  ArtistImage,
  ArtistWithArtworks,
} from 'src/components/_index';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
      <SectionWrapper>
        <SectionTitle>새로 유입된 신진 작가</SectionTitle>
        <FlatList
          data={artistData}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />} // 아이템 사이 간격 설정
          contentContainerStyle={{ paddingHorizontal: 6 }}
          renderItem={({ item }) => (
            <ArtistCard
              image={item.image}
              name={item.name}
              artistId={item.id}
            />
          )}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>내가 팔로우한 작가 소식</SectionTitle>
        <FlatList
          data={artistData}
          keyExtractor={(item) => item.id}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          contentContainerStyle={{ paddingHorizontal: 6 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <ArtistWrapper>
              <ArtistInfoWrapper>
                <ArtistImage image={item.image} size={36} />
                <ArtistInfo>
                  <ArtistName>{item.name}</ArtistName>
                  <ArtistTime>08.27 22:00</ArtistTime>
                </ArtistInfo>
              </ArtistInfoWrapper>
              <ArtworkImage
                source={{ uri: 'https://via.placeholder.com/300x150' }}
              />
              <ArtistDescription>
                작가님의 새로운 작품이 추가되었습니다!
              </ArtistDescription>
            </ArtistWrapper>
          )}
        />
      </SectionWrapper>
      <SectionWrapper>
        <SectionTitle>HOT한 작가님들</SectionTitle>
        <FlatList
          data={artistData}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <ArtistBioItem
              image={item.image}
              name={item.name}
              category={item.description}
              bio={item.bio}
              artistId={item.id}
            />
          )}
        />
      </SectionWrapper>
      <FlatList
        data={artworkData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <CategoryWrapper>
            {/* 카테고리 제목 */}
            <SectionTitle>{item.categoryTitle}</SectionTitle>

            {/* 카테고리 내의 여러 섹션 처리 */}
            {item.sections?.map((section) => (
              <SectionWrapper key={section.title}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() =>
                    handleNavigation('ArtistCollecting', section.title)
                  }
                >
                  <CategoryTitle>{section.title}</CategoryTitle>
                  <Icon name='chevron-forward' size={20} color='#120000' />
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
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                  ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                />
              </SectionWrapper>
            ))}
          </CategoryWrapper>
        )}
      />
    </View>
  );

  const renderArtworkSection = () => (
    <FlatList
      data={artworkData}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <CategoryWrapper>
          <SectionTitle>{item.categoryTitle}</SectionTitle>
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
                <CategoryTitle>{section.title}</CategoryTitle>
                <Icon name='chevron-forward' size={20} color='#120000' />
              </TouchableOpacity>

              {/* ArtistWithArtworks 컴포넌트를 사용한 가로 스크롤 */}
              <FlatList
                data={section.data}
                keyExtractor={(subItem) => subItem.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: subItem }) => (
                  <ImageWrapper>
                    <StyledImage source={{ uri: subItem.image }} />
                  </ImageWrapper>
                )}
              />
            </SectionWrapper>
          ))}
        </CategoryWrapper>
      )}
    />
  );

  return (
    <Container>
      <FlatList
        data={artworkData}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]} // CategoryButtons가 고정되도록 설정
        ListHeaderComponent={
          <>
            {/* Swiper 컴포넌트를 FlatList의 헤더로 추가 */}
            <Swiper
              loop
              timeout={2}
              controlsEnabled={false}
              containerStyle={{
                marginTop: 8,
                marginBottom: 16,
                width: '100%',
                height: SCREEN_HEIGHT / 4,
              }}
            >
              {images.map((image, index) => (
                <View key={index}>
                  <Image
                    source={image}
                    style={{
                      width: 'auto',
                      height: '100%',
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              ))}
            </Swiper>
            <Button onPress={() => Alert.alert('Button Pressed')}>
              <ButtonContent>
                <ButtonText>내가 소장한 작품 등록하러 가기</ButtonText>
                <ButtonIcon name='chevron-forward' size={20} color='#120000' />
              </ButtonContent>
            </Button>
            <TitleSubtitle
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
          selectedCoverType === '작가'
            ? renderArtistSection()
            : renderArtworkSection()
        }
      />
    </Container>
  );
};

const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  margin-top: ${({ theme }) => theme.margin.m};
  margin-bottom: ${({ theme }) => theme.spacing.s7};
  border-radius: 32px;
  border: 1px solid #f7f5f5;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : 'white')};
  justify-content: center;
  z-index: 1;
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
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const CategoryTypeButton = styled.TouchableOpacity<{ selected?: boolean }>`
  margin-right: ${({ theme }) => theme.margin.s};
  padding: 6px 18px;
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${(props) => (props.selected ? '#120000' : '#F7F5F5')};
`;

const CategoryTypeButtonText = styled(Subtitle1)<{ selected?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${(props) => (props.selected ? '#fff' : '#413333')};
`;

const CategoryWrapper = styled.View`
  margin-bottom: 20px;
`;

const CategoryTitle = styled(H6)`
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const SectionWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

const SectionTitle = styled(H5)`
  margin-bottom: ${({ theme }) => theme.spacing.s3};
`;

const ImageWrapper = styled.View`
  width: 100px;
  height: 130px;
  margin-right: ${({ theme }) => theme.margin.s};
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.xs};
`;

const ArtistInfoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const ArtistWrapper = styled.View`
  width: 260px;
`;

const ArtistTime = styled.Text`
  font-size: 12px;
  color: #999;
`;

const ArtistInfo = styled.View`
  flex-direction: column;
  margin-left: ${({ theme }) => theme.margin.xs};
`;

const ArtistName = styled(Subtitle2)``;

const ArtistDescription = styled.Text`
  color: #555;
  margin-top: 4px;
`;

const ArtworkImage = styled.Image`
  width: 100%;
  height: 160px;
  margin-top: 10px;
  border-radius: ${({ theme }) => theme.radius.m};
`;

export default CollectingScreen;
