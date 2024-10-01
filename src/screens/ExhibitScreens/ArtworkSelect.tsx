import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import {
  toggleArtworkSelection,
  expandAllCollections,
  toggleCollectionExpansion,
  collapseAllCollections,
  resetSelectedArtworks,
} from '../../slices/artworkSlice';
import { useArtworkList } from '../../api/hooks/useCollectionQueries';
import { Container } from 'src/styles/layout';
import {
  ProgressBar,
  TitleSubtitle,
  SearchBar,
  ArtworkGrid,
  CherryUsageModal,
} from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption, Subtitle2 } from 'src/styles/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CherryIcon } from 'src/assets/icons/_index';
import { theme } from 'src/styles/theme';
import { filterData } from 'src/utils/filterUtils';
import { setFilterText } from 'src/slices/collectionSlice';
import { useCherryModal } from 'src/hooks/_index';

const ArtworkSelect: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { activeCollections, filterText } = useSelector(
    (state: RootState) => state.collection,
  );
  const { selectedArtworks, expandedCollections, totalCherries } = useSelector(
    (state: RootState) => state.artwork,
  );
  const {
    data: artworkListData,
    isLoading,
    error,
  } = useArtworkList(activeCollections);

  // 임시 유저 보유 체리 => userApi 사용 예정
  const userCherries = 5;

  // 체리가 포함된 작품 개수 계산
  const cherryArtworksCount = selectedArtworks.filter(
    (artwork) => artwork.cherryNum > 0,
  ).length;

  const handleNextScreen = () => {
    navigation.navigate('ThemeSetting');
  };

  // useCherryModal 훅 사용: onAction으로 화면 이동 동작을 전달
  const { isModalVisible, modalProps, handleNext, setModalVisible } =
    useCherryModal(
      userCherries,
      totalCherries,
      cherryArtworksCount,
      handleNextScreen,
    );

  // 헤더의 "다음" 버튼을 설정
  useEffect(() => {
    const isNextEnabled = selectedArtworks.length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        headerRightDisabled: !isNextEnabled,
        onHeaderRightPress: handleNext, // "다음" 버튼 클릭 시 handleNext 호출
      }),
    );
  }, [navigation, selectedArtworks]);

  // 사용자가 해당 화면 나가면 상태 초기화
  useEffect(() => {
    // 'beforeRemove' 이벤트는 화면이 뒤로 가기 전에 트리거
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // 선택한 작품을 초기화하는 액션 호출
      dispatch(resetSelectedArtworks());
    });

    // cleanup: 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    if (artworkListData) {
      const collectionIds = artworkListData.map(
        (collection) => collection.collectionId,
      );
      dispatch(expandAllCollections(collectionIds));
    }
  }, [artworkListData, dispatch]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // 작품 검색 필터링
  const filteredArtworkListData = artworkListData.map((collection) => ({
    ...collection,
    artList: filterData(collection.artList, filterText, 'name'),
  }));

  // 모든 컬렉션 접기/펼치기
  const handleToggleAllCollections = () => {
    const allCollapsed = Object.values(expandedCollections).every(
      (value) => !value,
    );
    if (allCollapsed) {
      const collectionIds = artworkListData.map(
        (collection) => collection.collectionId,
      );
      dispatch(expandAllCollections(collectionIds));
    } else {
      dispatch(collapseAllCollections());
    }
  };

  // 각 컬렉션의 제목과 작품 목록을 렌더링하는 함수
  const renderCollection = ({ item: collection }) => (
    <View key={collection.collectionId}>
      <CollectionTitle
        collectionName={collection.collectionName}
        isExpanded={expandedCollections[collection.collectionId]}
        onToggle={() =>
          dispatch(toggleCollectionExpansion(collection.collectionId))
        }
      />
      {/* 컬렉션이 확장되어 있는 경우에만 작품 목록을 렌더링 */}
      {expandedCollections[collection.collectionId] && (
        <ArtworkGrid
          artworks={collection.artList}
          selectedArtworks={selectedArtworks}
          onSelect={(artwork) => dispatch(toggleArtworkSelection(artwork))}
        />
      )}
    </View>
  );

  return (
    <Container>
      <ProgressBar currentStep={2} totalSteps={7} />
      <TitleSubtitle
        titleLarge='전시할 작품 선택하기'
        subtitle={
          <>
            보유중인 체리 {` `}
            <Icon />
            {` `}
            {userCherries}
          </>
        }
        imageSource={require('src/assets/images/Character/character_surprised.png')}
      />
      <View style={{ marginBottom: 24 }} />
      <SearchBar
        placeholder='작품 검색하기'
        filterText={filterText}
        setFilterText={(text) => dispatch(setFilterText(text))}
      />
      <ControlBar>
        <SelectedCount
          selectedCount={selectedArtworks.length}
          totalCount={30}
        />
        <ToggleButton onPress={handleToggleAllCollections} />
      </ControlBar>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredArtworkListData}
        renderItem={renderCollection}
        keyExtractor={(item) => item.collectionId.toString()} // 컬렉션 고유 ID 설정
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      />

      {/* CherryUsageModal을 렌더링 */}
      <CherryUsageModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        {...modalProps} // 모달에 필요한 텍스트 및 액션 전달
      />
    </Container>
  );
};

interface CollectionTitleProps {
  collectionName: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const CollectionTitle: React.FC<CollectionTitleProps> = ({
  collectionName,
  isExpanded,
  onToggle,
}) => (
  <CollectionTitleWrapper>
    <Subtitle2>{collectionName}</Subtitle2>
    <DropDownButton onPress={onToggle}>
      <Ionicons
        name={isExpanded ? 'chevron-down-outline' : 'chevron-up-outline'}
        size={20}
        color='#120000'
      />
    </DropDownButton>
  </CollectionTitleWrapper>
);

const ControlBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.margin.m};
`;

interface SelectedCountProps {
  selectedCount: number;
  totalCount: number;
}

const SelectedCount: React.FC<SelectedCountProps> = ({
  selectedCount,
  totalCount,
}) => (
  <Caption style={{ color: theme.colors.grey_6 }}>
    <Caption style={{ color: theme.colors.grey_8 }}>{selectedCount}</Caption> /{' '}
    {totalCount}
  </Caption>
);

interface ToggleButtonProps {
  onPress: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onPress }) => {
  const expandAllCollections = useSelector(
    (state: RootState) => state.artwork.expandedCollections,
  );

  const isAllCollapsed = Object.values(expandAllCollections).every(
    (value) => !value,
  );

  return (
    <TouchableOpacity style={{ paddingLeft: 8 }} onPress={onPress}>
      <Caption style={{ color: theme.colors.grey_6 }}>
        {isAllCollapsed ? '컬렉션 모두 펼치기' : '컬렉션 모두 접기'}
      </Caption>
    </TouchableOpacity>
  );
};

const Icon = styled(CherryIcon)`
  fill: ${({ theme }) => theme.colors.redBlack};
`;

const CollectionTitleWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px;
  margin-top: ${({ theme }) => theme.margin.s};
  margin-bottom: ${({ theme }) => theme.margin.m};
  border: 1.5px solid #f8f8f8;
  border-radius: ${({ theme }) => theme.radius.s};
`;

const DropDownButton = styled(TouchableOpacity)`
  padding: ${({ theme }) => theme.padding.xs};
`;

export default ArtworkSelect;
