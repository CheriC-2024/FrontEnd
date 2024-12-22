import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  CircleSlider,
  CollectorSuggestSheet,
  ExhibitListCard,
} from 'src/components/_index';
import Icon from 'react-native-vector-icons/Ionicons';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Body1, Caption, H6 } from 'src/styles/typography';
import { Container } from 'src/styles/layout';
import { homeExhibitData } from '../data';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useExhibitions } from 'src/api/hooks/useExhibitQueries';
import { getFontFamilyByValue } from 'src/utils/fontUtils';

const ExhibitList: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'모두보기' | '팔로우'>(
    '모두보기',
  );
  const [showCircleSlider, setShowCircleSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCollectorSuggestSheet, setShowCollectorSuggestSheet] =
    useState(false);
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태 관리

  const { currentProfileId, isFollowing } = useSelector(
    (state: RootState) => state.follow,
  );

  const followedUserIds = Object.keys(isFollowing)
    .filter((userId) => isFollowing[Number(userId)] === true)
    .map(Number);

  const {
    data: exhibits = [],
    isLoading,
    isError,
    refetch, // refetch 메서드 추가
  } = useExhibitions({
    userId: selectedTab === '팔로우' ? followedUserIds[0] : undefined,
    order: 'LATEST',
    page: 0,
    size: 20,
  });

  const selectedFollowers = followedUserIds.map((userId) => ({
    profileImage: homeExhibitData.find((exhibit) => exhibit.userId === userId)
      ?.profileImage,
  }));

  const isFollowTabEmpty =
    selectedTab === '팔로우' && followedUserIds.length === 0;

  const exhibitsToDisplay =
    selectedTab === '팔로우' && followedUserIds.length === 0 ? [] : exhibits;

  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
      }),
    );
  }, [navigation]);

  const handleFollowToggle = () => {
    setSelectedTab('팔로우');
    setShowCircleSlider(!showCircleSlider);
  };

  const handleToggleButtonPress = (tab: '모두보기' | '팔로우') => {
    setSelectedTab(tab);
    setShowCircleSlider(tab === '팔로우');
  };

  const handleShowCollectorSuggestSheet = () => {
    setShowCollectorSuggestSheet(true);
  };

  const handleCloseCollectorSuggestSheet = () => {
    setShowCollectorSuggestSheet(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true); // 새로고침 상태 시작
    await refetch(); // API 재요청
    setRefreshing(false); // 새로고침 상태 종료
  };

  const data =
    exhibitsToDisplay.length === 0
      ? [{ key: 'header' }]
      : [
          { key: 'header' },
          ...exhibitsToDisplay.map((exhibit) => ({ ...exhibit })),
        ];

  if (isLoading) {
    return null;
  }
  const font = getFontFamilyByValue(exhibits.font);

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.key || item.exhibitionId?.toString() || index.toString()
        }
        renderItem={({ item }) => {
          if (item.key === 'header') {
            return (
              <>
                <HeaderContainer>
                  <ButtonContainer>
                    <ToggleButton
                      selected={selectedTab === '모두보기'}
                      onPress={() => handleToggleButtonPress('모두보기')}
                    >
                      <ToggleText selected={selectedTab === '모두보기'}>
                        모두보기
                      </ToggleText>
                    </ToggleButton>
                    <ToggleButton
                      selected={selectedTab === '팔로우'}
                      onPress={() => handleToggleButtonPress('팔로우')}
                    >
                      <ToggleText selected={selectedTab === '팔로우'}>
                        팔로우
                      </ToggleText>
                    </ToggleButton>
                  </ButtonContainer>
                  <SortButton>
                    <Caption>최신순</Caption>
                    <Icon name='chevron-down' color='#120000' size={14} />
                  </SortButton>
                </HeaderContainer>
                {selectedTab === '팔로우' &&
                  followedUserIds.length > 0 &&
                  showCircleSlider && (
                    <CircleSlider
                      selectedFollowers={selectedFollowers}
                      currentIndex={currentIndex}
                      onCirclePress={setCurrentIndex}
                      scrollViewRef={React.createRef()}
                    />
                  )}
                {isFollowTabEmpty && (
                  <EmptyState onShowSheet={handleShowCollectorSuggestSheet} />
                )}
              </>
            );
          } else if (!isFollowTabEmpty) {
            return (
              <TouchableOpacity
                onPress={() => {
                  // 전시 아이디를 params로 넘겨서 ExhibitEntrance 화면으로 이동
                  navigation.navigate('HomeStack', {
                    screen: 'ExhibitEntrance',
                    params: {
                      exhibitId: item.exhibitionId,
                      exhibitColors: item.colors,
                      exhibitThemes: item.themes,
                      bgType: item.exhibitionBackgroundType,
                      heartCount: item.heartCount,
                      name: item.name,
                      font: item.font,
                      coverImgUrl: item.coverImgUrl,
                    },
                  });
                }}
              >
                <ExhibitListCard
                  imageSource={item.coverImgUrl}
                  colors={item.colors}
                  title={item.name}
                  collectorName={item.userRes.name}
                  profileImage={item.userRes.profileImgUrl}
                  heartCount={item.heartCount}
                  hits={item.hits}
                  tags={item.themes}
                  font={item.font}
                  bgType={item.exhibitionBackgroundType}
                />
              </TouchableOpacity>
            );
          }
          return null;
        }}
        ListHeaderComponent={
          <ArtCategoryHeader
            categoryType='exhibit'
            style={{ paddingHorizontal: 6, marginTop: 8, marginBottom: 12 }}
          />
        }
        ListFooterComponent={<View style={{ height: 60 }} />}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      {showCollectorSuggestSheet && (
        <CollectorSuggestSheet onClose={handleCloseCollectorSuggestSheet} />
      )}
    </Container>
  );
};

const EmptyState: React.FC<{ onShowSheet: () => void }> = ({ onShowSheet }) => (
  <EmptyStateWrapper>
    <EmptyStateImage
      source={require('src/assets/images/ExhibitPage/empty_collection.png')}
    />
    <EmptyStateText>{`아직 팔로우중인\n사용자가 없네요!`}</EmptyStateText>
    <ActionButton onPress={onShowSheet}>
      <Icon name='add-outline' size={22} color='#fff' />
      <ActionButtonText> {` `}추천 컬렉터 보기</ActionButtonText>
    </ActionButton>
  </EmptyStateWrapper>
);

const EmptyStateWrapper = styled.View`
  margin-top: 100px;
  align-items: center;
  justify-content: center;
`;

const EmptyStateImage = styled.Image`
  width: 155px;
  height: 180px;
  margin-bottom: ${({ theme }) => theme.spacing.s8};
`;

const EmptyStateText = styled(H6)`
  margin-bottom: ${({ theme }) => theme.spacing.s5};
  color: ${({ theme }) => theme.colors.grey_6};
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

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #fcfcfc;
  padding: 8px 6px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const ToggleButton = styled(TouchableOpacity)<{ selected: boolean }>`
  padding: 4px 12px;
  margin-right: 8px;
  border-radius: ${({ theme }) => theme.radius.l};
  border: ${({ selected, theme }) =>
    selected ? 'none' : `1px solid ${theme.colors.grey_4}`};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.redBlack : '#fff'};
`;

const ToggleText = styled(Caption)<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? '#fff' : theme.colors.redBlack};
`;

const SortButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

export default ExhibitList;
