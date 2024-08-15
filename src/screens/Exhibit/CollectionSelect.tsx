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
import { fetchCollectionsByUser } from '../../api/collectionApi';
import { RootState } from '../../store';
import {
  setCollections,
  toggleCollectionSelection,
  setFilterText,
} from '../../slices/collectionSlice';
import { Container } from 'src/styles/layout';
import GradientBackground from '../../styles/GradientBackground';
import { useProgressBar } from 'src/components/ProgressBarContext';
import { imageAssets } from 'src/assets/DB/imageAssets';
import { Caption, Subtitle1, Subtitle2 } from 'src/styles/typography';
import TagButton from 'src/components/TagButton';

const CollectionSelect: React.FC = () => {
  const dispatch = useDispatch();
  const { collections, selectedCollections, filterText } = useSelector(
    (state: RootState) => state.collection,
  );

  const { setStep } = useProgressBar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ProgressBar 초기화 (1단계)
    setStep(0);
  }, [setStep]);

  useEffect(() => {
    // 컬렉션 데이터 로드
    const loadCollections = async () => {
      try {
        const userId = 2; // 테스트할 사용자 ID
        console.log(`Fetching collections for : ${userId}`);
        const data = await fetchCollectionsByUser(userId);
        console.log('Fetched Collections:', data.collections);
        dispatch(setCollections(data.collections));

        // data.collections.forEach((collection: Collection) => {
        //   console.log('File Name:', collection.fileName);
        // });
      } catch (error) {
        console.error('Collection Load Error: ', error);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, [dispatch]);

  // 필터링된 컬렉션 목록
  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  if (loading) {
    //로딩 상태 표시
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
  <EmptyStateContainer>
    <EmptyStateImage
      source={require('src/assets/images/ExhibitPage/empty_collection.png')}
    />
    <EmptyStateText>컬렉션이 텅 비어 있어요!</EmptyStateText>
    <EmptyStateSubText>
      전시를 만들기 위해서는 컬렉터님의{`\n`}컬렉션이 필요해요!
    </EmptyStateSubText>
    <AddCollectionButton>
      <Icon name="add-outline" size={22} color="#fff" />
      <AddCollectionButtonText>
        {' '}
        {` `}컬렉션 추가하러 가기
      </AddCollectionButtonText>
    </AddCollectionButton>
  </EmptyStateContainer>
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

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyStateImage = styled.Image`
  width: 155px;
  height: 180px;
  margin-bottom: 30px;
`;

const EmptyStateText = styled.Text`
  font-family: 'Bold';
  font-size: 20px;
  color: #120000;
  margin-bottom: 4px;
`;

const EmptyStateSubText = styled.Text`
  text-align: center;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  margin-bottom: 20px;
`;

const AddCollectionButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #120000;
  padding: 10px 20px;
  border-radius: 20px;
`;

const AddCollectionButtonText = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  color: #fff;
  letter-spacing: 0.5px;
`;

export default CollectionSelect;
