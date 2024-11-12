import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Artwork } from 'src/interfaces/collection';
import { imageAssets } from '../assets/DB/imageAssets';

interface CircleSliderProps {
  // 전시 보기 때문에 추가함 -> 추후에 리팩토링해야될 듯,,
  selectedArtworks?: Artwork[];
  selectedFollowers?: { profileImage: string }[]; // 팔로워 데이터 추가
  currentIndex: number;
  onCirclePress: (index: number) => void;
  isDescriptionFilled?: (index: number) => boolean;
  scrollViewRef: React.RefObject<ScrollView>;
}

const CircleSlider: React.FC<CircleSliderProps> = ({
  selectedArtworks,
  selectedFollowers,
  currentIndex,
  onCirclePress,
  isDescriptionFilled = () => false,
  scrollViewRef,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingBottom: parseInt(theme.spacing.s3),
        backgroundColor: '#fcfcfc',
      }}
    >
      <CircleScrollView ref={scrollViewRef}>
        {selectedArtworks?.map((artwork, index) => (
          <TouchableOpacity
            key={`artwork-${index}`}
            onPress={() => onCirclePress(index)}
          >
            <Circle isActive={currentIndex === index}>
              {artwork.fileName && (
                <CircleImage source={imageAssets[artwork.fileName]} />
              )}
              {isDescriptionFilled(index) && <Overlay />}
              {isDescriptionFilled(index) && (
                <OverlayImage
                  source={require('src/assets/images/complete_face.png')}
                />
              )}
            </Circle>
          </TouchableOpacity>
        ))}
        {selectedFollowers?.map((follower, index) => (
          <TouchableOpacity
            key={`follower-${index}`}
            onPress={() => onCirclePress(index)}
          >
            <Circle isActive={currentIndex === index}>
              <CircleImage source={{ uri: follower.profileImage }} />
            </Circle>
          </TouchableOpacity>
        ))}
      </CircleScrollView>
    </View>
  );
};

const Circle = styled.View<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 60px;
  margin-right: 10px;
  background-color: transparent;
  padding: ${({ isActive }) => (isActive ? '1.5px' : '0px')};
  border: 1.7px dashed
    ${({ isActive, theme }) =>
      isActive ? theme.colors.cherryRed_10 : 'transparent'};
  position: relative;
`;

const CircleImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 60px;
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
  border-radius: 60px;
`;

const OverlayImage = styled.Image`
  position: absolute;
  width: 22px;
  height: 27px;
  border-radius: 60px;
`;

const CircleScrollView = React.forwardRef<
  ScrollView,
  { children: React.ReactNode }
>((props, ref) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    ref={ref}
    style={{ flexDirection: 'row' }}
  >
    {props.children}
  </ScrollView>
));

export default CircleSlider;
