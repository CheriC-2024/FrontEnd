import React, { useState } from 'react';
import {
  Text,
  ScrollView,
  ImageBackground,
  Image,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Container } from 'src/styles/layout';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { ForwardIcon, PlusIcon } from 'src/assets/icons/_index';
import {
  ArtistCard,
  CollectorSuggestSheet,
  ExhibitCard,
  ExhibitCarousel,
  PrivateArtworkCard,
  SeparatorLine,
} from 'src/components/_index';
import { artistData, homeExhibitData, privateArtworkData } from '../data';
import { Caption, H4, H6 } from 'src/styles/typography';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => setBottomSheetVisible(true);
  const closeBottomSheet = () => setBottomSheetVisible(false);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Background source={require('src/assets/home_bg.png')}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStack', { screen: 'ExhibitList' })
          }
          style={{ paddingLeft: 16 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <H4>컬렉션 전시 둘러보기</H4>
            <ForwardIcon width={28} height={28} />
          </View>
          <Caption>전시회에 오신 컬렉터님들을 환영합니다 :)</Caption>
        </TouchableOpacity>
        <CharacterImage
          source={require('src/assets/images/Character/right.png')}
        />
        <View style={{ marginTop: 32 }}>
          <ExhibitCarousel data={homeExhibitData} />
        </View>
      </Background>
      <Container style={{ flex: 1 }} removePadding>
        <SectionWrapper>
          <CategoryTitle>내가 팔로우하는 컬렉터</CategoryTitle>
          <FlatList
            data={artistData}
            keyExtractor={(item) => item.id}
            horizontal
            initialNumToRender={2}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            contentContainerStyle={{ paddingHorizontal: 2 }}
            renderItem={({ item }) => (
              <ArtistCard
                image={item.image}
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
        </SectionWrapper>
        <SeparatorLine />
        <SectionWrapper>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() =>
              navigation.navigate('HomeStack', { screen: 'PrivateArtworkList' })
            }
          >
            <CategoryTitle>NEW! 소장작품</CategoryTitle>
            <View style={{ paddingTop: 10 }}>
              <ForwardIcon width={24} height={24} />
            </View>
          </TouchableOpacity>
        </SectionWrapper>
        {privateArtworkData.map((item) => (
          <CardWrapper key={item.id}>
            <PrivateArtworkCard
              image={item.image}
              collectorName={item.collectorName}
              collectorImage={item.collectorImage}
            />
          </CardWrapper>
        ))}
      </Container>
      {isBottomSheetVisible && (
        <CollectorSuggestSheet onClose={closeBottomSheet} />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const Background = styled(ImageBackground)`
  padding-top: 90px;
  padding-bottom: 20px;
`;

const CharacterImage = styled(Image)`
  position: absolute;
  top: 90px;
  right: -1px;
  width: 68px;
  height: 122px;
`;

const SectionWrapper = styled.View`
  padding-left: ${({ theme }) => theme.padding.m};
`;

const CategoryTitle = styled(H6)`
  padding-top: 20px;
  margin-bottom: ${({ theme }) => theme.margin.s};
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

const CardWrapper = styled.View`
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
`;
