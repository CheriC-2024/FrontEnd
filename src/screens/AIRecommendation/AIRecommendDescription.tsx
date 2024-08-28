import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../../navigations/AppNavigator';
import CustomModal from '../../components/Modal';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { setExhibitTitle } from 'src/slices/exhibitSlice';
import { theme } from 'src/styles/theme';
import { ButtonText, Caption, Subtitle2 } from 'src/styles/typography';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Btn, BtnText } from 'src/components/Button';

const AIRecommendDescription: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const { exhibitTitle } = useSelector((state: RootState) => state.exhibit);
  const { aiTitle, aiTitleReason } = useSelector(
    (state: RootState) => state.aiRecommend,
  );
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: 'none' },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    };
  }, [navigation]);

  const handleTitleSelect = (title: string) => {
    setSelectedTitle(title);
  };

  const handleComplete = () => {
    if (selectedTitle) {
      if (exhibitTitle) {
        setIsModalVisible(true);
      } else {
        dispatch(setExhibitTitle(selectedTitle));
        navigation.navigate('Exhibit', { step: 4 });
      }
    }
  };

  const handleConfirm = () => {
    if (selectedTitle) {
      dispatch(setExhibitTitle(selectedTitle));
      setIsModalVisible(false);
      navigation.navigate('Exhibit', { step: 4 });
    }
  };

  return (
    <Container>
      <TitleSubtitle
        title="AI가 전시 이름을 만들었어요!"
        subtitle="원하는 전시 이름을 선택해 주세요"
      />
      <Icon name="sync-outline" size={20} color="#120000" />
      <ThemeScrollView horizontal showsHorizontalScrollIndicator={false}>
        {aiTitle.map((title, index) => (
          <ThemeCard
            key={index}
            onPress={() => handleTitleSelect(title)}
            selected={selectedTitle === title}
          >
            {selectedTitle === title ? (
              <GradientCard colors={['#fff', '#FDEEEE']}>
                <ThemeText>{title}</ThemeText>
              </GradientCard>
            ) : (
              <ThemeText>{title}</ThemeText>
            )}
          </ThemeCard>
        ))}
      </ThemeScrollView>
      <ReasonContainer>
        <ReasonIcon
          source={require('src/assets/images/Character/character_ai.png')}
        />
        {selectedTitle ? (
          <ReasonTextContainer>
            <ReasonTitle>추천 이유</ReasonTitle>
            <ReasonText>
              {aiTitleReason[aiTitle.indexOf(selectedTitle)]}
            </ReasonText>
          </ReasonTextContainer>
        ) : (
          <InitialReasonContainer>
            <ReasonTitle>결과를 클릭하면 추천 이유를 볼 수 있어요!</ReasonTitle>
            <InitialSubText>
              컬렉터님이 설정한 작품들로 이름을 만들었습니다:)
            </InitialSubText>
          </InitialReasonContainer>
        )}
      </ReasonContainer>
      <Btn onPress={handleComplete}>
        <BtnText>설정 완료하기</BtnText>
      </Btn>
      <CustomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={`이미 입력하신 전시 이름이 ${`\n`}있으시네요!`}
        body={`컬렉터님께서 이미 이름을 입력하셨네요!${`\n`}지금 선택하신 이름으로 변경할까요?`}
        confirmButtonText="네, 할게요"
        cancelButtonText="아니오!"
        onConfirm={handleConfirm}
      />
    </Container>
  );
};

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
  margin-bottom: 16px;
  overflow: visible;
`;

const ThemeCard = styled.TouchableOpacity<{ selected: boolean }>`
  width: 140px;
  height: 180px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: ${theme.radius.s};
  margin: ${theme.margin.xs};
  elevation: 5;
  overflow: visible;
`;

const GradientCard = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: ${theme.radius.s};
  justify-content: center;
  align-items: center;
`;

const ThemeText = styled(ButtonText)`
  margin: 0 10px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const ReasonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 52px;
  border-radius: ${theme.radius.l};
  border: 1.7px dashed #e52c32;
`;

const ReasonIcon = styled.Image`
  width: 70px;
  height: 105px;
  margin: 0 10px;
`;

const ReasonTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: 25px;
`;

const ReasonTitle = styled(Subtitle2)`
  margin-bottom: ${theme.margin.xs};
  letter-spacing: 0.5px;
  color: ${theme.colors.grey_8};
`;

const ReasonText = styled(Caption)`
  margin-bottom: 10px;
  font-family: 'Regular';
  font-size: 12px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const InitialReasonContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`;

const InitialSubText = styled(Caption)`
  color: ${theme.colors.grey_6};
  letter-spacing: 0.5px;
`;

export default AIRecommendDescription;
