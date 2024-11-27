import React, { useEffect } from 'react';
import { Text, ActivityIndicator, FlatList, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState, AppDispatch } from '../../store';
import {
  setFilterText,
  selectCollection,
  clearSelectedCollections,
} from '../../slices/collectionSlice';
import { useUserCollection } from 'src/api/hooks/useCollectionQueries';
import { Container } from 'src/styles/layout';
import GradientBackground from '../../styles/GradientBackground';
import { Body1, Caption, H6, Subtitle2 } from 'src/styles/typography';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import {
  ProgressBar,
  TitleSubtitle,
  SearchBar,
  TagButton,
  CollectionItem,
} from 'src/components/_index';

const CollectionSelect: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { data: collectionsData, isLoading, error } = useUserCollection(); // 임시 유저ID API 연결 예정
  const { activeCollections, filterText } = useSelector(
    (state: RootState) => state.collection,
  );

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled = activeCollections.length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        headerRightText: '다음',
        nextScreenName: 'ArtworkSelect',
        headerRightDisabled: !isNextEnabled,
      }),
    );
  }, [navigation, activeCollections]);

  // 컴포넌트가 처음 마운트될 때 filterText 초기화
  useEffect(() => {
    dispatch(setFilterText('')); // filterText를 빈 문자열로 초기화
    dispatch(clearSelectedCollections());
  }, [dispatch]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='large' color='#E52C32' />
      </LoadingContainer>
    );
  }

  if (error) {
    console.log(error);
    return <Text>로드 발생</Text>;
  }

  // 컬렉션이 없는 경우
  if (collectionsData.length === 0) {
    return <EmptyState />;
  }

  // 필터링된 컬렉션 목록
  const filteredCollectionsData = collectionsData.filter((collection) =>
    collection.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <Container>
      <GradientBackground />
      <ProgressBar currentStep={1} totalSteps={7} />
      <>
        <TitleSubtitle
          titleLarge='전시할 컬렉션 고르기'
          subtitle='전시로 만들고 싶은 컬렉션을 선택해보세요'
          imageSource={require('src/assets/images/Character/character_surprised.png')}
        />
        <View style={{ marginBottom: 24 }} />
        <SearchBar
          placeholder='컬렉션 검색하기'
          filterText={filterText}
          setFilterText={(text) => dispatch(setFilterText(text))}
        />
        <LabelText>선택한 컬렉션</LabelText>
        <SelectedTagContainer>
          {activeCollections.map((id) => {
            const collection = collectionsData.find(
              (c) => c.collectionId === id,
            );
            return (
              collection && (
                <TagButton
                  key={id}
                  text={collection.name}
                  onRemove={() => dispatch(selectCollection(id))}
                  showHash={false}
                />
              )
            );
          })}
        </SelectedTagContainer>
        <FlatList // 컬렉션 목록
          style={{ paddingTop: 8, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          data={filteredCollectionsData}
          keyExtractor={(item) => item.collectionId.toString()} // 각 아이템의 고유한 키 설정
          renderItem={({ item: collection }) => {
            // renderItem에서 컬렉션을 렌더링
            const selected = activeCollections.includes(
              collection.collectionId,
            );
            return (
              <CollectionItem
                selected={selected}
                onPress={() =>
                  dispatch(selectCollection(collection.collectionId))
                }
                imageSource={collection.latestArtImgUrl}
                name={collection.name}
                description={collection.description}
              />
            );
          }}
        />
      </>
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
      <Icon name='add-outline' size={22} color='#fff' />
      <ActionButtonText> {` `}컬렉션 추가하러 가기</ActionButtonText>
    </ActionButton>
  </EmptyStateWrapper>
);

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: 'white';
`;

const SelectedTagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.padding.s};
`;

const LabelText = styled(Subtitle2)`
  margin: ${({ theme }) => theme.margin.s} 0;
  color: ${({ theme }) => theme.colors.redBlack};
`;

const EmptyStateWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
  padding: ${({ theme }) => `${theme.padding.s} ${theme.padding.m}`};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ theme }) => theme.colors.redBlack};
`;

const ActionButtonText = styled(Body1)`
  color: ${({ theme }) => theme.colors.white};
`;

export default CollectionSelect;
