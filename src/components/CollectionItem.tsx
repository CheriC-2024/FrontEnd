import React from 'react';
import styled from 'styled-components/native';
import { View, Image, TouchableOpacity } from 'react-native';
import { Caption, Subtitle1 } from 'src/styles/typography';

interface CollectionItemProps {
  selected: boolean;
  onPress: () => void;
  imageSource: any;
  name: string;
  description: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  selected,
  onPress,
  imageSource,
  name,
  description,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ItemContainer selected={selected}>
        <CollectionImage>
          {imageSource && (
            <Image
              source={imageSource}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
              }}
            />
          )}
        </CollectionImage>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <CollectionName>{name}</CollectionName>
          <DescriptionText numberOfLines={2}>{description}</DescriptionText>
        </View>
      </ItemContainer>
    </TouchableOpacity>
  );
};

const ItemContainer = styled.View<{ selected: boolean }>`
  overflow: visible;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margin.m};
  margin-horizontal: ${({ theme }) => theme.spacing.s1};
  padding: ${({ theme }) => theme.padding.s};
  background-color: white;
  border: 1.7px dashed
    ${({ selected, theme }) =>
      selected ? theme.colors.cherryRed_10 : 'transparent'};
  border-radius: 60px;
  elevation: 4;
`;

const CollectionImage = styled.View`
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin-right: ${({ theme }) => theme.margin.m};
  border-radius: 50px;
`;

const CollectionName = styled(Subtitle1)`
  margin-bottom: ${({ theme }) => theme.margin.xs};
`;

const DescriptionText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_8};
`;

export default CollectionItem;
