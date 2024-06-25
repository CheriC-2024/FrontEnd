import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CherryIcon from '../../assets/icons/cherry.svg';
import { NavigationProp, useNavigation } from '@react-navigation/native';
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
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { RootStackParamList } from '../../navigations/AppNavigator';
import { useGlobalState, Artwork } from '../../contexts/GlobalStateContext';
import MusicSelectionSheet from '../../components/BottomSheets/MusicSelectionSheet';
import { imageAssets } from '../../assets/DB/imageAssets';

interface FinishSettingProps {
  setIsEditing: (isEditing: boolean) => void;
}

const FinishSetting: React.FC<FinishSettingProps> = ({ setIsEditing }) => {
  const { step, setStep } = useProgressBar();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {
    exhibitTitle,
    exhibitDescription,
    selectedThemes,
    selectedArtworks,
    setSelectedArtworks,
    selectedFont,
    coverColors,
    selectedMusic,
    setSelectedMusic,
  } = useGlobalState();
  const [isMusicSheetVisible, setMusicSheetVisible] = useState(false);

  useEffect(() => {
    setStep(6);
  }, [setStep]);

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
          <ArtworkTitle>{item.name}</ArtworkTitle>
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
                  <CherryIcon fill="#B0ABAB" />
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
          <MenuIcon name="menu" size={24} color="#000" />
        </MenuIconContainer>
      </ArtworkContainer>
    );
  };

  const handleDragEnd = ({ data }: { data: Artwork[] }) => {
    setSelectedArtworks([...data]);
  };

  const handleEditPress = () => {
    setIsEditing(true);
    setTimeout(() => {
      navigation.navigate('Exhibit', { step: 4 });
    }, 0);
  };

  const openMusicSheet = () => setMusicSheetVisible(true);
  const closeMusicSheet = () => setMusicSheetVisible(false);

  return (
    <OuterContainer>
      <ProgressBarComponent totalSteps={7} />
      <TitleContainer>
        <TitleIcon
          source={require('src/assets/images/Character/character_wink.png')}
        />
        <TitleText>
          <Title>전시를 마무리해 볼까요?</Title>
          <Subtitle>마지막으로 컬렉터님의 전시를 점검해주세요:)</Subtitle>
        </TitleText>
      </TitleContainer>
      <GradientContainer>
        <LinearGradient colors={coverColors} style={{ padding: 16 }}>
          <MusicContainer>
            <MusicTextContainer onPress={() => setMusicSheetVisible(true)}>
              <Icon name="musical-notes-outline" size={16} color="#fff" />
              <MusicText>
                {selectedMusic ? selectedMusic : '아직 음악이 없습니다'}
              </MusicText>
            </MusicTextContainer>
            <EditIcon name="pencil-outline" size={20} color="#000" />
          </MusicContainer>

          <DescriptionContainer>
            <SectionTitleContainer>
              <SectionTitle style={{ fontFamily: selectedFont }}>
                {exhibitTitle}
              </SectionTitle>
              <EditIcon
                name="pencil-outline"
                size={20}
                color="#000"
                onPress={handleEditPress}
              />
            </SectionTitleContainer>
            <ExhibitDescriptContainer>
              <ExhibitDescript numberOfLines={1} ellipsizeMode="tail">
                {exhibitDescription}
              </ExhibitDescript>
            </ExhibitDescriptContainer>
          </DescriptionContainer>

          <TagsContainer>
            {selectedThemes.map((theme, index) => (
              <Tag key={index}>#{theme}</Tag>
            ))}
            <EditIcon name="pencil-outline" size={20} color="#000" />
          </TagsContainer>
        </LinearGradient>
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
        setSelectedMusic={setSelectedMusic}
      />
    </OuterContainer>
  );
};

const OuterContainer = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const InnerContainer = styled.View`
  flex: 1;
  margin: -16px;
  padding-top: 15px;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;
`;

const TitleIcon = styled.Image`
  width: 45px;
  height: 80px;
  margin-right: 10px;
`;

const TitleText = styled.View`
  flex-direction: column;
`;

const Title = styled.Text`
  font-family: 'Bold';
  font-size: 18px;
  color: #120000;
`;

const Subtitle = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
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
  background-color: #9e8c8f;
  padding: 5px 10px;
  border-radius: 20px;
`;

const MusicText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #fff;
  margin-left: 5px;
`;

const DescriptionContainer = styled.View`
  background-color: #ffffff00;
  border-radius: 12px;
`;

const EditIcon = styled(Icon)`
  margin-left: 8px;
`;

const SectionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  font-family: 'Bold';
  color: #120000;
`;

const ExhibitDescriptContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ExhibitDescript = styled.Text`
  font-size: 12px;
  font-family: 'Regular';
  color: #120000;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Tag = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #fff;
  background-color: #413333;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 8px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
`;

const ArtworkTouchable = styled(TouchableOpacity)`
  width: auto;
`;

const ArtworkContainer = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const ArtworkImage = styled.Image`
  width: 70px;
  height: 85px;
  border-radius: 5px;
  margin-right: 30px;
`;

const ArtworkInfo = styled.View`
  flex: 1;
`;

const ArtworkTitle = styled.Text`
  font-size: 14px;
  font-family: 'Bold';
  color: #120000;
`;

const ArtworkSubtitle = styled.Text`
  font-size: 12px;
  font-family: 'Regular';
  color: #b0abab;
`;

const ArtworkCherry = styled.Text`
  font-size: 12px;
  font-family: 'Regular';
  color: #b0abab;
`;

const CollectorOnlyImage = styled.Image`
  width: 75px;
  height: 15px;
  margin-top: 8px;
`;

const MenuIconContainer = styled.TouchableOpacity`
  margin-left: 8px;
`;

const MenuIcon = styled(Icon)`
  padding-right: 16px;
`;

export default FinishSetting;
