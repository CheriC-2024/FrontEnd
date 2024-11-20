import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Artwork } from 'src/interfaces/collection';
import { imageAssets } from '../assets/DB/imageAssets';
import { Subtitle2 } from 'src/styles/typography';

interface CircleSliderProps {
  selectedArtworks?: Artwork[];
  selectedFollowers?: { profileImage: string }[];
  currentIndex: number;
  onCirclePress: (index: number) => void;
  isDescriptionFilled?: (index: number) => boolean;
  scrollViewRef: React.RefObject<ScrollView>;
  backgroundColor?: string;
  showEndButton?: boolean;
}

const CircleSlider: React.FC<CircleSliderProps> = ({
  selectedArtworks,
  selectedFollowers,
  currentIndex,
  onCirclePress,
  isDescriptionFilled = () => false,
  scrollViewRef,
  backgroundColor = '#fcfcfc',
  showEndButton = false,
}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        paddingBottom: parseInt(theme.spacing.s3),
        backgroundColor,
      }}
    >
      <CircleScrollView ref={scrollViewRef}>
        {selectedArtworks?.map((artwork, index) => (
          <TouchableOpacity
            key={`artwork-${index}`}
            onPress={() => onCirclePress(index)} // Regular circle press
          >
            <Circle isActive={currentIndex === index}>
              {artwork.fileName && /^https?:\/\//.test(artwork.fileName) ? (
                <CircleImage source={{ uri: artwork.fileName }} />
              ) : (
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
        {showEndButton && (
          <TouchableOpacity
            key='end-button'
            onPress={() => onCirclePress(selectedArtworks.length)}
          >
            <EndCircle isActive={currentIndex === selectedArtworks.length}>
              <EndText isActive={currentIndex === selectedArtworks.length}>
                END
              </EndText>
            </EndCircle>
          </TouchableOpacity>
        )}
      </CircleScrollView>
    </View>
  );
};

const EndCircle = styled.View<{ isActive: boolean }>`
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 60px;
  margin-right: 10px;
  background-color: transparent;
  border-style: ${({ isActive }) => (isActive ? 'dashed' : 'solid')};
  border-color: ${({ isActive }) => (isActive ? '#FF5555' : '#fff')};
  border-width: 1.7px;
`;

const EndText = styled(Subtitle2)<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#FF5555' : '#fff')};
`;

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
