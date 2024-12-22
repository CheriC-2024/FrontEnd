import React, { useState } from 'react';
import {
  Animated,
  Easing,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useExhibitions } from 'src/api/hooks/useExhibitQueries';
import { useFollowList } from 'src/api/hooks/useFollowMutation';
import { PlusIcon, SearchIcon } from 'src/assets/icons/_index';
import {
  ArtistCard,
  CollectorSuggestSheet,
  ExhibitCard,
} from 'src/components/_index';
import { RootState } from 'src/store';
import { H6 } from 'src/styles/typography';
import styled from 'styled-components/native';

const SearchScreen: React.FC = () => {
  const userData = useSelector((state: RootState) => state.getUser);
  const [isExpanded, setIsExpanded] = useState(false);
  const [iconAnimation] = useState(new Animated.Value(0)); // 아이콘 위치 애니메이션
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const {
    data: followersData,
    isLoading: isFollowersLoading,
    error: isFollowersError,
  } = useFollowList({
    userId: userData.id,
    sort: 'FOLLOWING',
    order: 'LATEST',
    page: 0,
    size: 20,
  });
  const {
    data: exhibitData,
    isLoading: isCarouselLoading,
    isError: isCarouselError,
  } = useExhibitions({
    userId: undefined,
    order: 'LIKE',
    page: 0,
    size: 5,
  });

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);

    // 아이콘 위치 애니메이션
    Animated.timing(iconAnimation, {
      toValue: isExpanded ? 0 : 1, // 왼쪽에서 오른쪽으로
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);

  const iconPositionInterpolate = iconAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 300], // 왼쪽에서 오른쪽으로 이동 (픽셀 단위)
  });
  if (isFollowersLoading || isCarouselLoading) {
    return;
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <SearchBarContainer>
            <AnimatedSearchIcon
              style={{
                left: iconPositionInterpolate, // 아이콘 위치 애니메이션
              }}
              onPress={toggleSearchBar}
            >
              <SearchIcon fill={'#120000'} />
            </AnimatedSearchIcon>
            <SearchInput
              placeholder='검색어를 입력해주세요'
              editable={isExpanded}
              autoFocus={isExpanded} // 검색 확장 시 키보드 자동 활성화
              onFocus={() => !isExpanded && toggleSearchBar()} // 검색바 클릭 시 자동 확장
            />
          </SearchBarContainer>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginTop: 28,
          marginLeft: 16,
          marginBottom: 12,
        }}
      >
        <H6>체리시님을 위한 추천 컬렉터</H6>
      </View>
      <FlatList
        data={followersData}
        keyExtractor={(item) => String(item.id)}
        horizontal
        initialNumToRender={2}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
        contentContainerStyle={{ paddingHorizontal: 2, marginLeft: 16 }}
        renderItem={({ item }) => (
          <ArtistCard
            image={item.profileImgUrl}
            name={item.name}
            artistId={item.id}
            size={74}
          />
        )}
        ListFooterComponent={() => (
          <AddCollector onPress={openBottomSheet}>
            <PlusIcon fill={'#B0ABAB'} width={20} height={20} />
          </AddCollector>
        )}
      />
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          marginTop: -80,
          marginLeft: 16,
          marginBottom: 12,
        }}
      >
        <H6>오늘의 인기 컬렉션 전시</H6>
      </View>
      <ExhibitList data={exhibitData} />
      {isBottomSheetVisible && (
        <CollectorSuggestSheet onClose={closeBottomSheet} />
      )}
    </Container>
  );
};

const ExhibitList: React.FC<{ data: any[] }> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => String(item.exhibitionId)}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 16 }}
    renderItem={({ item }) => <ExhibitCard {...item} isCurrent={true} />}
    ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
  />
);

export default SearchScreen;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  styled.TouchableOpacity``,
);

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
`;

const SearchBarContainer = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  width: 92%;
  height: 50px;
  position: relative;
  margin-top: 60px;
  margin-left: 16px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: #333;
  margin-left: 50px;
`;

const AnimatedSearchIcon = styled(AnimatedTouchableOpacity)`
  position: absolute;
  top: 30%;
  transform: translateY(-12px);
  z-index: 2;
  padding: 10px;
`;

const AddCollector = styled.TouchableOpacity`
  width: 74px;
  height: 74px;
  margin-left: 12px;
  margin-right: 32px;
  background-color: #f1efef;
  border-radius: 37px;
  align-items: center;
  justify-content: center;
`;
