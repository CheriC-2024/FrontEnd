import React from 'react';
import { View } from 'react-native';
import { Caption, H3, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const ArtCategoryHeader: React.FC<{
  categoryTitle: string;
  categoryType: 'artwork' | 'artist';
}> = ({ categoryTitle, categoryType }) => {
  return (
    <HeaderWrapper>
      <ImageWrapper>
        <HeaderImage
          source={
            categoryType === 'artist'
              ? require('src/assets/images/Character/character_front.png')
              : require('src/assets/images/ExhibitPage/empty_collection.png')
          }
          categoryType={categoryType}
        />
      </ImageWrapper>
      <TextWrapper>
        <TitleWrapper>
          <MainText>
            {categoryType === 'artist' ? '신진 작가' : '작품'}
          </MainText>
          <CategoryWrapper>
            <CategoryTitle>{categoryTitle}</CategoryTitle>
          </CategoryWrapper>
        </TitleWrapper>
        <SubText>
          {categoryType === 'artist'
            ? '신진 작가의 작품을 둘러보고 컬렉팅 해보세요!'
            : '추천하는 작품을 둘러보고 컬렉팅 해보세요!'}
        </SubText>
      </TextWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: ${({ theme }) => theme.margin.s};
`;

const ImageWrapper = styled.View`
  margin-right: ${({ theme }) => theme.margin.s};
`;

const HeaderImage = styled.Image<{ categoryType: 'artwork' | 'artist' }>`
  width: ${({ categoryType }) => (categoryType === 'artist' ? '56px' : '70px')};
  height: ${({ categoryType }) =>
    categoryType === 'artist' ? '84px' : '82px'};
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
