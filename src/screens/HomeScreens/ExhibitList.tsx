import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import {
  ArtCategoryHeader,
  CircleSlider,
  ExhibitListCard,
} from 'src/components/_index';
import Icon from 'react-native-vector-icons/Ionicons';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption } from 'src/styles/typography';
import { Container } from 'src/styles/layout';
import { homeExhibitData } from '../data';

const ExhibitList: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'모두보기' | '팔로우'>(
    '모두보기',
  );
  const [showCircleSlider, setShowCircleSlider] = useState(false);

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

  const data = [{ key: 'header' }, ...homeExhibitData];

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={({ item }) => {
          if (item.key === 'header') {
            return (
              <>
                <HeaderContainer>
                  <ButtonContainer>
                    <ToggleButton
                      selected={selectedTab === '모두보기'}
                      onPress={() => {
                        setSelectedTab('모두보기');
                        setShowCircleSlider(false);
                      }}
                    >
                      <ToggleText selected={selectedTab === '모두보기'}>
                        모두보기
                      </ToggleText>
                    </ToggleButton>
                    <ToggleButton
                      selected={selectedTab === '팔로우'}
                      onPress={handleFollowToggle}
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
                {showCircleSlider && (
                  <CircleSlider
                    selectedArtworks={homeExhibitData} // 필요한 데이터로 대체
                    currentIndex={0}
                    onCirclePress={(index) => console.log(index)}
                    scrollViewRef={React.createRef()}
                  />
                )}
              </>
            );
          } else {
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
    </Container>
  );
};

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
