import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CherryIcon, PencilIcon } from '../../assets/icons/_index.js';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedArtworks } from 'src/slices/artworkSlice';
import { RootState } from 'src/store';
import MusicSelectionSheet from '../../components/bottomSheets/MusicSelectionSheet';
import { imageAssets } from '../../assets/DB/imageAssets';
import {
  TitleSubtitle,
  ProgressBar,
  CherryFinishModal,
} from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { Caption, H5, Subtitle2 } from 'src/styles/typography';
import { Artwork } from 'src/interfaces/collection';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useCherryFinishModal } from 'src/hooks/_index';

const FinishSetting: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { exhibitTitle, exhibitDescription, selectedFont } = useSelector(
    (state: RootState) => state.exhibit,
  );
  const { selectedCover, coverType, selectedCoverImage } = useSelector(
    (state: RootState) => state.cover,
  );

  const { selectedThemes } = useSelector((state: RootState) => state.theme);
  const { selectedArtworks, totalCherries } = useSelector(
    (state: RootState) => state.artwork,
  );
  const [selectedMusic, setSelectedMusic] = useState<string[]>([
    '아직 음악이 없습니다',
  ]);
  const [isMusicSheetVisible, setMusicSheetVisible] = useState(false);

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '완성',
        nextScreenName: 'FinishSetting',
        onHeaderRightPress: handleNext,
      }),
    );
  }, [navigation]);

  const userCherries = 5; // 실제 사용자의 체리 정보 (임시)

  const { isModalVisible, modalProps, handleNext, setModalVisible } =
    useCherryFinishModal(userCherries, totalCherries, () => {
      // 확인했을 때 실행될 POST 요청, 체리 차감 API 등 추가 예정
      navigation.reset({
        index: 0, // 첫 번째 스크린으로 설정
        routes: [{ name: 'Tabs' }], // Tabs 화면으로 이동
      });
      console.log('체리 사용 후 전시 완료');
    });

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Artwork>) => {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    });

    useEffect(() => {
      if (isActive) {
        scale.value = withSpring(1.05);
        opacity.value = withSpring(0.5);
      } else {
        scale.value = withSpring(1);
        opacity.value = withSpring(1);
      }
    }, [isActive]);

    const artworkImage = imageAssets[item.fileName];

    return (
      <ArtworkContainer style={animatedStyle}>
        <ArtworkTouchable disabled={isActive}>
          <ArtworkImage source={artworkImage} />
        </ArtworkTouchable>
        <ArtworkInfo>
          <Subtitle2>{item.name}</Subtitle2>
          <ArtworkSubtitle>{item.artist}</ArtworkSubtitle>
          {item.cherryNum !== null && (
            <ArtworkCherry>
              {item.cherryNum === 0 ? (
                '무료'
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CherryIcon fill='#B0ABAB' />
                  <Text style={{ color: '#B0ABAB' }}>{item.cherryNum}</Text>
                </View>
              )}
            </ArtworkCherry>
          )}
          {item.cherryNum === null && (
            <CollectorOnlyImage
              source={require('../../assets/images/collectorOnlyText.png')}
            />
          )}
        </ArtworkInfo>
        <MenuIconContainer onLongPress={drag}>
          <MenuIcon name='menu' size={24} color='#000' />
        </MenuIconContainer>
      </ArtworkContainer>
    );
  };

  const handleDragEnd = ({ data }: { data: Artwork[] }) => {
    dispatch(setSelectedArtworks([...data]));
  };

  const handleEditPress = () => {
    setTimeout(() => {
      navigation.navigate('Exhibit', { step: 4 });
    }, 0);
  };

  const openMusicSheet = () => setMusicSheetVisible(true);
  const closeMusicSheet = () => setMusicSheetVisible(false);

  const renderCoverContent = () => (
    <>
      <MusicContainer>
        <MusicTextContainer onPress={openMusicSheet}>
          <Icon name='musical-notes-outline' size={16} color='#fff' />
          <MusicText>
            {selectedMusic ? selectedMusic : '아직 음악이 없습니다'}
          </MusicText>
        </MusicTextContainer>
        <PencilIcon width={16} height={16} />
      </MusicContainer>
      <SectionTitleContainer>
        <H5 style={{ fontFamily: selectedFont }}>{exhibitTitle}</H5>
        <PencilIcon width={16} height={16} onPress={handleEditPress} />
      </SectionTitleContainer>
      <ExhibitDescriptionContainer>
        <Caption numberOfLines={1} ellipsizeMode='tail'>
          {exhibitDescription}
        </Caption>
      </ExhibitDescriptionContainer>
      <TagsContainer>
        {selectedThemes.map((theme, index) => (
          <Tag key={index}>#{theme}</Tag>
        ))}
        <PencilIcon width={16} height={16} />
      </TagsContainer>
    </>
  );

  return (
    <Container>
      <ProgressBar totalSteps={7} currentStep={7} />
      <TitleSubtitle
        titleLarge='전시 마무리하기'
        subtitle='마지막으로 컬렉터님의 전시를 점검해주세요:)'
        imageSource={require('src/assets/images/Character/character_wink.png')}
      />
      <View style={{ marginBottom: 24 }} />
      <GradientContainer>
        {/* 이미지 업로드된 경우 우선적으로 이미지 표시 */}
        {selectedCoverImage ? (
          <ImageBackground
            source={{ uri: selectedCoverImage }}
            style={{ width: 'auto', height: 'auto', padding: 16 }}
            resizeMode='cover'
          >
            {renderCoverContent()}
          </ImageBackground>
        ) : (
          <>
            {coverType === 'gradient' && (
              <LinearGradient colors={selectedCover} style={{ padding: 16 }}>
                {renderCoverContent()}
              </LinearGradient>
            )}

            {coverType === 'solid' && (
              <View style={{ backgroundColor: selectedCover[0], padding: 16 }}>
                {renderCoverContent()}
              </View>
            )}
          </>
        )}
        <CherryFinishModal
          onClose={() => setModalVisible(false)}
          visible={isModalVisible}
          {...modalProps}
        />
      </GradientContainer>

      <InnerContainer>
        <DraggableFlatList
          data={selectedArtworks}
          renderItem={renderItem}
          keyExtractor={(item) => item.artId.toString()}
          onDragEnd={handleDragEnd}
        />
      </InnerContainer>

      <MusicSelectionSheet
        isVisible={isMusicSheetVisible}
        onClose={closeMusicSheet}
        selectedMusic={selectedMusic}
        setSelectedMusic={(music) => dispatch(setSelectedMusic(music))}
      />
    </Container>
  );
};

const InnerContainer = styled.View`
  flex: 1;
  margin: -16px;
  padding-top: 15px;
`;

const GradientContainer = styled.View`
  margin-bottom: 16px;
  margin-left: -16px;
  margin-right: -16px;
`;

const MusicContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 75px;
`;

const MusicTextContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha40};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.radius.l};
`;

const MusicText = styled(Caption)`
  color: #fff;
  margin-left: ${({ theme }) => theme.margin.xs};
`;

const SectionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: 'Bold';
  color: #120000;
`;

const ExhibitDescriptionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.s};
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Tag = styled(Caption)`
  color: #fff;
  background-color: ${({ theme }) => theme.colors.grey_8};
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.l};
  margin-right: ${({ theme }) => theme.margin.xs};
  margin-bottom: ${({ theme }) => theme.margin.m};
  letter-spacing: 0.5px;
`;

const ArtworkTouchable = styled(TouchableOpacity)`
  width: auto;
`;

const ArtworkContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.m};
  padding: 0 ${({ theme }) => theme.padding.m};
`;

const ArtworkImage = styled.Image`
  width: 70px;
  height: 85px;
  border-radius: ${({ theme }) => theme.radius.xs};
  margin-right: ${({ theme }) => theme.margin.xl};
`;

const ArtworkInfo = styled.View`
  flex: 1;
`;

const ArtworkSubtitle = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6};
`;

const ArtworkCherry = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6};
`;

const CollectorOnlyImage = styled.Image`
  width: 75px;
  height: 15px;
  margin-top: ${({ theme }) => theme.margin.s};
`;

const MenuIconContainer = styled.TouchableOpacity`
  margin-left: ${({ theme }) => theme.margin.s};
`;

const MenuIcon = styled(Icon)`
  padding-right: ${({ theme }) => theme.padding.m};
`;

export default FinishSetting;
