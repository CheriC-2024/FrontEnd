import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'; //그라디언트 배경을 적용하기 위해
import Icon from 'react-native-vector-icons/Ionicons';
import FilterInput from '../../components/FilterInput';
import ProgressBarComponent from '../../components/ProgressBar';
import { useProgressBar } from '../../components/ProgressBarContext';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { fetchCollectionsByUser } from '../../api/collectionApi';
import { imageAssets } from '../../assets/DB/imageAssets';

interface Collection {
  id: number;
  name: string;
  description: string;
  filePath: string;
  fileName: string;
}

const CollectionSelect: React.FC<{
  onSelectionChange: (count: number) => void;
}> = ({ onSelectionChange }) => {
  const { selectedCollections, setSelectedCollections } = useGlobalState();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [filterText, setFilterText] = useState('');
  const { step, setStep } = useProgressBar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStep(0); // Set progress bar to step 1 (index 0)
  }, [setStep]);

  useEffect(() => {
    onSelectionChange(selectedCollections.length);
  }, [selectedCollections]);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        const userId = 2; // 테스트할 사용자 ID
        console.log(
          `Fetching collections for user ID from global state: ${userId}`,
        );
        const data = await fetchCollectionsByUser(userId);
        console.log('Fetched Collections:', data.collections);
        setCollections(data.collections);

        data.collections.forEach((collection: Collection) => {
          console.log('File Path:', collection.fileName);
        });
      } catch (error) {
        console.error('LoadCollection Error: ', error);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, []);

  const handleSelectCollection = (id: number) => {
    setSelectedCollections((prev: number[]) => {
      const newSelections = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      console.log('Selected Collections:', newSelections);
      return newSelections;
    });
  };

  const handleRemoveCollection = (id: number) => {
    setSelectedCollections((prev: number[]) => {
      const newSelections = prev.filter((item) => item !== id);
      console.log('Selected Collections:', newSelections);
      return newSelections;
    });
  };

  const filteredCollections = collections.filter((collection) =>
    collection.name.includes(filterText),
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
      <GradientBackground>
        <ProgressBarComponent totalSteps={7} />
        {collections.length === 0 ? ( // 컬렉션이 아예 없는 경우
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
                {` `}컬렉션 추가하러 가기
              </AddCollectionButtonText>
            </AddCollectionButton>
          </EmptyStateContainer>
        ) : (
          // 컬렉션이 있는 경우
          <>
            <TitleContainer>
              <TitleIcon
                source={require('src/assets/images/Character/character_surprised.png')}
              />
              <TitleText>
                <Title>어떤 컬렉션을 전시로 올릴까요?</Title>
                <Subtitle>전시로 만들고 싶은 컬렉션을 선택해보세요</Subtitle>
              </TitleText>
            </TitleContainer>
            <FilterInput
              placeholder="컬렉션 검색하기"
              filterText={filterText}
              setFilterText={setFilterText}
            />
            <SelectedCollectionContainer>
              <SelectedCollectionText>선택한 컬렉션</SelectedCollectionText>
              <CollectionTag>
                {selectedCollections.map((id) => {
                  const collection = collections.find((c) => c.id === id);
                  if (collection) {
                    return (
                      <CollectionTagWrapper key={id}>
                        <CollectionTagText>{collection.name}</CollectionTagText>
                        <RemoveButton
                          onPress={() => handleRemoveCollection(id)}
                        >
                          <Icon name="close-outline" size={16} color="#fff" />
                        </RemoveButton>
                      </CollectionTagWrapper>
                    );
                  }
                  return null;
                })}
              </CollectionTag>
            </SelectedCollectionContainer>
            <CollectionList>
              {filteredCollections.map((collection) => {
                const selected = selectedCollections.includes(collection.id);
                const firstArtworkImage = imageAssets[collection.fileName]; //TODO: url로 변경 예정
                if (!firstArtworkImage) {
                  console.warn(
                    `Image not found for fileName: ${collection.fileName}`,
                  );
                }
                return (
                  <CollectionItem
                    key={collection.id}
                    selected={selected}
                    onPress={() => handleSelectCollection(collection.id)}
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
                    <CollectionInfo>
                      <CollectionName>{collection.name}</CollectionName>
                      <CollectionDescription numberOfLines={2}>
                        {collection.description}
                      </CollectionDescription>
                    </CollectionInfo>
                  </CollectionItem>
                );
              })}
            </CollectionList>
          </>
        )}
      </GradientBackground>
    </Container>
  );
};

interface GradientBackgroundProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

const GradientBackground = styled(
  LinearGradient,
).attrs<GradientBackgroundProps>((props) => ({
  colors: props.colors || ['rgb(255, 255, 255)', 'rgba(229, 44, 50, 0.1)'],
  start: props.start || { x: 0.5, y: 0.7 },
  end: props.end || { x: 0.5, y: 1 },
}))<GradientBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 16px 0 16px;
`;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  position: relative;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
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

const SelectedCollectionContainer = styled.View`
  margin: 18px 0 20px 0;
`;

const SelectedCollectionText = styled.Text`
  font-family: 'Bold';
  font-size: 14px;
  margin-bottom: 6px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CollectionTag = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const CollectionTagWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #413333;
  padding: 0px 10px;
  border-radius: 30px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const CollectionTagText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.5px;
`;

const RemoveButton = styled.TouchableOpacity`
  padding: 4px;
`;

const CollectionList = styled.ScrollView`
  scroll-padding-bottom: 16px;
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
  background-color: #d3d3d3;
  border-radius: 50px;
  margin-right: 15px;
  overflow: hidden;
`;

const CollectionInfo = styled.View`
  flex: 1;
  padding-right: 15px;
`;

const CollectionName = styled.Text`
  margin-bottom: 4px;
  font-family: 'Bold';
  font-size: 16px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const CollectionDescription = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #413333;
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
