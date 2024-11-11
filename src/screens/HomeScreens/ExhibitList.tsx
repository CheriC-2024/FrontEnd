import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ArtCategoryHeader } from 'src/components/_index';
import Icon from 'react-native-vector-icons/Ionicons';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Caption } from 'src/styles/typography';
import { Container } from 'src/styles/layout';

const ExhibitList: React.FC = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState<'모두보기' | '팔로우'>(
    '모두보기',
  );

  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
      }),
    );
  }, [navigation]);

  return (
    <Container>
      <ListWrapper>
        <FlatList
          data={[]} // 데이터 추가
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <></>}
          ListHeaderComponent={
            <>
              <ArtCategoryHeader
                categoryType='exhibit'
                style={{ paddingHorizontal: 6, marginTop: 8, marginBottom: 12 }}
              />
              <HeaderContainer>
                <ButtonContainer>
                  <ToggleButton
                    selected={selectedTab === '모두보기'}
                    onPress={() => setSelectedTab('모두보기')}
                  >
                    <ToggleText selected={selectedTab === '모두보기'}>
                      모두보기
                    </ToggleText>
                  </ToggleButton>
                  <ToggleButton
                    selected={selectedTab === '팔로우'}
                    onPress={() => setSelectedTab('팔로우')}
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
            </>
          }
          stickyHeaderIndices={[1]} // 첫 번째 아이템을 스티키 헤더로 고정
          showsVerticalScrollIndicator={false}
        />
      </ListWrapper>
    </Container>
  );
};

const ListWrapper = styled.View`
  flex: 1;
  margin-horizontal: -6px;
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
