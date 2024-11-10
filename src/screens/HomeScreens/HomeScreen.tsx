import { Text, ScrollView, ImageBackground, Image, View } from 'react-native';
import styled from 'styled-components';
import { Container } from 'src/styles/layout';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { ForwardIcon } from 'src/assets/icons/_index';
import { ExhibitCard, ExhibitCarousel } from 'src/components/_index';
import { homeExhibitData } from '../data';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Background source={require('src/assets/home_bg.png')}>
        <TitleSubtitle
          titleLarge={
            <>
              컬렉션 전시 둘러보기
              <ForwardIcon style={{ marginLeft: 8 }} />
            </>
          }
          subtitle={'전시회에 오신 컬렉터님들을 환영합니다:)'}
          style={{ paddingLeft: 16 }}
        />
        <CharacterImage
          source={require('src/assets/images/Character/right.png')}
        />
        <View style={{ marginTop: 32 }}>
          <ExhibitCarousel data={homeExhibitData} />
        </View>
      </Background>
      <Container style={{ flex: 1 }}>
        <Text style={{ marginBottom: 200 }}>나머지 콘텐츠</Text>
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;

const Background = styled(ImageBackground)`
  flex: 1.4;
  padding-top: 90px;
`;

const CharacterImage = styled(Image)`
  position: absolute;
  top: 90px;
  right: -1px;
  width: 68px;
  height: 122px;
`;
