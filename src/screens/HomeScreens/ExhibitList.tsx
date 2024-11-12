import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
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

const ExhibitList: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'모두보기' | '팔로우'>(
    '모두보기',
  );
  const [showCircleSlider, setShowCircleSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCollectorSuggestSheet, setShowCollectorSuggestSheet] =
    useState(false);
  // Redux 상태에서 현재 프로필 ID와 팔로우 정보 가져오기
  const { currentProfileId, isFollowing } = useSelector(
    (state: RootState) => state.follow,
  );

  // Redux의 팔로우 상태를 기반으로 팔로우된 사용자 ID 리스트 생성
  const followedUserIds = Object.keys(isFollowing)
    .filter((userId) => isFollowing[Number(userId)] === true)
    .map(Number);
  console.log(followedUserIds);

  // TODO: 팔로우된 사용자들의 프로필 이미지를 반환하는 함수 -API 연결시 수정
  const selectedFollowers = followedUserIds.map((userId) => ({
    profileImage: homeExhibitData.find((exhibit) => exhibit.userId === userId)
      ?.profileImage,
  }));

  // "팔로우" 탭에서 팔로우된 사용자가 없을 때 빈 메시지 표시 조건
  const isFollowTabEmpty =
    selectedTab === '팔로우' && followedUserIds.length === 0;

  // "팔로우" 탭이 선택된 경우에는 팔로우된 사용자 전시만, "모두보기"일 경우 전체 전시를 표시
  const exhibitsToDisplay =
    selectedTab === '팔로우' && followedUserIds.length > 0
      ? homeExhibitData.filter((exhibit) =>
          followedUserIds.includes(exhibit.id),
        )
      : homeExhibitData;

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

  // const handleCirclePress = (index: number) => {
  //   setCurrentIndex(index);
  //   dispatch(setCurrentProfileId(followedUserIds[index])); // 선택된 프로필 ID 업데이트
  // };

  const handleShowCollectorSuggestSheet = () => {
    setShowCollectorSuggestSheet(true);
  };

  const handleCloseCollectorSuggestSheet = () => {
    setShowCollectorSuggestSheet(false);
  };

  // sticky 구현하기 위해서 'header' 항목 추가
  // "팔로우" 탭에서 팔로우된 사용자가 없을 때 데이터를 빈 배열로 설정
  const data =
    selectedTab === '팔로우' && followedUserIds.length === 0
      ? []
      : [{ key: 'header' }, ...exhibitsToDisplay];

  return (
    <Container>
      <FlatList
        data={[{ key: 'header' }, ...exhibitsToDisplay]}
        keyExtractor={(item, index) => item.key || index.toString()}
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
                      selectedFollowers={selectedFollowers} // 필요한 데이터로 전달
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
            // 팔로우된 사용자가 있는 경우에만 ExhibitListCard 렌더링
            return (
              <ExhibitListCard
                imageSource={item.imageSource}
                title={item.title}
                collectorName={item.collectorName}
                profileImage={item.profileImage}
                likes={item.likes}
                favorites={item.favorites}
                tags={item.tags}
              />
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
        stickyHeaderIndices={[1]} // HeaderContainer만 스티키로 설정
        showsVerticalScrollIndicator={false}
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
