import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import ProgressBar from '../../components/ProgressBar';
import TitleSubtitle from '../../components/TitleSubtitle';
import { RootState, AppDispatch } from '../../store';
import {
  loadCollections,
  toggleCollectionSelection,
  setFilterText,
} from '../../slices/collectionSlice';
import { Container } from 'src/styles/layout';
import GradientBackground from '../../styles/GradientBackground';
import { useProgressBar } from 'src/components/ProgressBarContext';
import { imageAssets } from 'src/assets/DB/imageAssets';
import {
  Body1,
  Caption,
  H5,
  H6,
  Subtitle1,
  Subtitle2,
} from 'src/styles/typography';
import TagButton from 'src/components/TagButton';

const CollectionSelect: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  //Redux 스토어의 전체 상태에서 collection 상태만을 선택해서 반환하는 선택자(selector) 함수
  const { collections, selectedCollections, filterText, loading } = useSelector(
    (state: RootState) => state.collection,
  );

  const { setStep } = useProgressBar();

  useEffect(() => {
    // ProgressBar 초기화 (1단계)
    setStep(0);
  }, [setStep]);

  useEffect(() => {
    // 컬렉션 데이터를 비동기 Thunk를 통해 로드
    dispatch(loadCollections(2)); // 예시로 userId 2를 전달
  }, [dispatch]);

  // 필터링된 컬렉션 목록
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#E52C32" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <GradientBackground />
      <ProgressBar totalSteps={7} />
      {collections.length === 0 ? ( // 컬렉션이 아예 없는 경우
        <EmptyState />
      ) : (
        // 컬렉션이 있는 경우
        <>
          <TitleSubtitle
            title="어떤 컬렉션을 전시로 올릴까요?"
            subtitle="전시로 만들고 싶은 컬렉션을 선택해보세요"
            imageSource={require('src/assets/images/Character/character_surprised.png')}
          />
          <SearchBar
            placeholder="컬렉션 검색하기"
            filterText={filterText}
            setFilterText={(text) => dispatch(setFilterText(text))}
          />
          <View style={{ marginTop: 20, paddingBottom: 18 }}>
            <LabelText>선택한 컬렉션</LabelText>
            {/*선택한 컬렉션 테그 목록 */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {selectedCollections.map((id) => {
                const collection = collections.find((c) => c.id === id);
                return (
                  collection && (
                    <TagButton
                      key={id}
                      text={collection.name}
                      onRemove={() => dispatch(toggleCollectionSelection(id))}
                      showHash={false}
                    />
                  )
                );
              })}
            </View>
          </View>
          {/*컬렉션 목록 */}
          <ScrollView
            style={{ paddingTop: 8, paddingBottom: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredCollections.map((collection) => {
              const selected = selectedCollections.includes(collection.id);
              const firstArtworkImage = imageAssets[collection.fileName];
              return (
                <CollectionItem
                  key={collection.id}
                  selected={selected}
                  onPress={() =>
                    dispatch(toggleCollectionSelection(collection.id))
                  }
                >
                  <CollectionImage>
                    {firstArtworkImage && (
                      <Image
                        source={firstArtworkImage}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 50,
                        }}
                      />
                    )}
                  </CollectionImage>
                  <View style={{ flex: 1, paddingRight: 16 }}>
                    <CollectionName>{collection.name}</CollectionName>
                    <Caption numberOfLines={2}>
                      {collection.description}
                    </Caption>
                  </View>
                </CollectionItem>
              );
            })}
          </ScrollView>
        </>
      )}
    </Container>
  );
};

// 빈 상태 표시 컴포넌트
const EmptyState: React.FC = () => (
  <EmptyStateWrapper>
    <EmptyStateImage
      source={require('src/assets/images/ExhibitPage/empty_collection.png')}
    />
    <EmptyStateText>컬렉션이 텅 비어 있어요!</EmptyStateText>
    <EmptyStateSubtext>
      전시를 만들기 위해서는 컬렉터님의{`\n`}컬렉션이 필요해요!
    </EmptyStateSubtext>
    <ActionButton>
      <Icon name="add-outline" size={22} color="#fff" />
      <ActionButtonText> {` `}컬렉션 추가하러 가기</ActionButtonText>
    </ActionButton>
  </EmptyStateWrapper>
);

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const LabelText = styled(Subtitle2)`
  margin-bottom: ${(props) => props.theme.margin.s};
  color: ${(props) => props.theme.colors.redBlack};
`;

interface CollectionItemProps {
  selected: boolean;
}

const CollectionItem = styled(TouchableOpacity)<CollectionItemProps>`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: white;
  border: 1.7px dashed
    ${(props: { selected: boolean }) =>
      props.selected ? '#E52C32' : 'transparent'};
  border-radius: 60px;
  margin-bottom: 16px;
  margin-horizontal: 3px;
  elevation: 5;
  overflow: visible;
`;

const CollectionImage = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-right: ${(props) => props.theme.margin.m};
  overflow: hidden;
`;

const CollectionName = styled(Subtitle1)`
  margin-bottom: ${(props) => props.theme.margin.xs};
`;

const EmptyStateWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyStateImage = styled.Image`
  width: 155px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

const EmptyStateText = styled(H6)`
  margin-bottom: ${({ theme }) => theme.spacing.s1};
`;

const EmptyStateSubtext = styled(Caption)`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.redBlack};
  padding: ${({ theme }) => `${theme.padding.s} ${theme.padding.m}`};
  border-radius: ${({ theme }) => theme.radius.l};
`;

const ActionButtonText = styled(Body1)`
  color: ${({ theme }) => theme.colors.white};
`;

export default CollectionSelect;
