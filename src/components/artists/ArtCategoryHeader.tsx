import React from 'react';
import { View, ViewStyle } from 'react-native';
import { Caption, H3, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const ArtCategoryHeader: React.FC<{
  categoryTitle?: string;
  categoryType: 'artwork' | 'artist' | 'privateArtwork' | 'exhibit';
  style?: ViewStyle;
}> = ({ categoryTitle, categoryType, style }) => {
  return (
    <HeaderWrapper style={style}>
      <ImageWrapper>
        <HeaderImage
          source={
            categoryType === 'artist'
              ? require('src/assets/images/Character/artist_front.png')
              : categoryType === 'artwork'
                ? require('src/assets/images/CollectingPage/cherry.png')
                : categoryType === 'privateArtwork'
                  ? require('src/assets/images/CollectingPage/star.png')
                  : require('src/assets/images/CollectingPage/door.png')
          }
          categoryType={categoryType}
        />
      </ImageWrapper>
      <TextWrapper>
        <TitleWrapper>
          <MainText>
            {categoryType === 'artist'
              ? '신진 작가'
              : categoryType === 'privateArtwork'
                ? '소장작품'
                : categoryType === 'exhibit'
                  ? '컬렉션 전시'
                  : '작품'}
          </MainText>
          {categoryType !== 'privateArtwork' && categoryType !== 'exhibit' && (
            <CategoryWrapper>
              <CategoryTitle>{categoryTitle}</CategoryTitle>
            </CategoryWrapper>
          )}
        </TitleWrapper>
        <SubText>
          {categoryType === 'artist'
            ? '신진 작가의 작품을 둘러보고 컬렉팅 해보세요!'
            : categoryType === 'artwork'
              ? '추천하는 작품을 둘러보고 컬렉팅 해보세요!'
              : categoryType === 'privateArtwork'
                ? '컬렉터들이 등록한 신규 소장작품을 둘러보세요!'
                : '컬렉터들의 컬렉션 전시를 둘러보세요!'}
        </SubText>
      </TextWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const ImageWrapper = styled.View`
  margin-right: ${({ theme }) => theme.margin.s};
`;

const HeaderImage = styled.Image<{
  categoryType: 'artwork' | 'artist' | 'privateArtwork' | 'exhibit';
}>`
  width: ${({ categoryType }) => (categoryType === 'artist' ? '54px' : '64px')};
  height: ${({ categoryType }) =>
    categoryType === 'artist' ? '73px' : '74px'};
`;

const TextWrapper = styled.View`
  flex-direction: column;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MainText = styled(H3)`
  font-size: 32px;
`;

const CategoryWrapper = styled.View`
  margin-left: ${({ theme }) => theme.margin.s};
  padding: ${({ theme }) => theme.margin.xs} ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.s};
  background-color: #fcebeb;
`;

const CategoryTitle = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const SubText = styled(Caption)``;

export default ArtCategoryHeader;
