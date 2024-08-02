import React from 'react';
import { Button, View } from 'react-native';
import Onboarding, { OnboardingProps, ButtonComponentProps } from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigations/AppNavigator';
import styled from 'styled-components/native';
import { theme } from '../styles/theme';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();

  return (
    <Container>
      <Onboarding
        containerStyles={{ paddingTop: 0 }}
        bottomBarHighlight={false}
        showNext={false}
        showDone={false}
        bottomBarHeight={60}
        DotComponent={Dots}
        SkipButtonComponent={(props) => <Skip {...props}>SKIP ></Skip>}
        onSkip={() => navigation.replace('MainTabs')}
        pages={[
          {
            backgroundColor: theme.colors.grey_4,
            image: <StyledImage source={require('../assets/images/onboarding.png')} />,
            title: <Title>아트 컬렉팅</Title>,
            subtitle: (
              <Subtitle>
                체리시에 온라인 아트 컬렉팅을 해보아요. 신진 작가분들의 유료, 무료 작품들을 만날 수 있어요!
              </Subtitle>
            ),
          },
          {
            backgroundColor: theme.colors.grey_4,
            image: <StyledImage source={require('../assets/images/onboarding.png')} />,
            title: <Title>소장 작품 등록</Title>,
            subtitle: (
              <Subtitle>
                이미 미술 작품을 소유하고 계시나요? 체리시에 소장 인증하고 전시까지 진행해보아요
              </Subtitle>
            ),
          },
          {
            backgroundColor: theme.colors.grey_4,
            image: <StyledImage source={require('../assets/images/onboarding.png')} />,
            title: <Title>온라인 컬렉션 전시</Title>,
            subtitle: (
              <Subtitle>
                너의 취향을 담은 컬렉션으로 전시를 만들고 다른 컬렉터들과 말썽 전시로 소통해요!
              </Subtitle>
            ),
          },
          {
            backgroundColor: theme.colors.grey_4,
            image: <StyledImage source={require('../assets/images/onboarding.png')} />,
            title: <Title>작품 수익창출</Title>,
            subtitle: (
              <View>
                <Subtitle>
                  작가분들은 체리시에 작품을 등록하여 수익을 낼 수 있어요!
                </Subtitle>
                <ButtonWrapper>
                  <Button
                    title="Cheric 로그인 하기"
                    onPress={() => navigation.replace('MainTabs')}
                    color={theme.colors.cherryRed_10}
                  />
                </ButtonWrapper>
              </View>
            ),
          },
        ]}
        bottomBarContent={({ isLight, ...props }) => (
          <BottomBar>
            <Skip {...props}>SKIP ></Skip>
            <DotsWrapper>
              {props.pages.map((_, i) => (
                <Dots
                  key={i}
                  isLight={isLight}
                  selected={i === props.pageIndex}
                />
              ))}
            </DotsWrapper>
          </BottomBar>
        )}
      />
    </Container>
  );
};

const Dots = ({ selected }: { selected: boolean }) => {
  let backgroundColor;
  backgroundColor = selected ? theme.colors.cherryRed_10 : theme.colors.grey_6;
  return <Dot style={{ backgroundColor }} />;
};

const Skip = ({ children, ...props }: ButtonComponentProps & { children: React.ReactNode }) => (
  <SkipButton {...props}>
    <SkipButtonText>{children}</SkipButtonText>
  </SkipButton>
);

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.grey_4};
  position: relative;
`;

const StyledImage = styled.Image`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  background-color: #ccc;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: bold;
  color: ${props => props.theme.colors.redBlack};
  margin-bottom: ${props => props.theme.spacing.s3};
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.fontSizes.body1};
  color: ${props => props.theme.colors.grey_6};
  text-align: center;
  padding-horizontal: ${props => props.theme.spacing.s5};
`;

const ButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.s5};
  align-items: center;
`;

const Dot = styled.View`
  width: ${props => props.theme.spacing.s2};
  height: ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.spacing.s2};
  margin-horizontal: ${props => props.theme.spacing.s1};
`;

const BottomBar = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${props => props.theme.spacing.s12};
  padding-horizontal: ${props => props.theme.spacing.s5};
`;

const DotsWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SkipButton = styled.TouchableOpacity`
  margin-right: ${props => props.theme.spacing.s6};
`;

const SkipButtonText = styled.Text`
  font-size: ${props => props.theme.fontSizes.body2};
  color: ${props => props.theme.colors.cherryRed_10};
  text-align: center;
`;

export default OnboardingScreen;
