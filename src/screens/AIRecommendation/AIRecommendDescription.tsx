import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootState } from 'src/store';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitTitle } from 'src/slices/exhibitSlice';
import { Container } from 'src/styles/layout';
import CustomModal from '../../components/Modal';
import { TitleSubtitle } from 'src/components/_index';
import { Btn, BtnText } from 'src/components/Button';
import {
  ButtonText,
  Caption,
  Subtitle1,
  Subtitle2,
} from 'src/styles/typography';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { RefreshIcon } from 'src/assets/icons/_index';
import { View } from 'react-native';

const AIRecommendDescription: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { exhibitTitle } = useSelector((state: RootState) => state.exhibit);
  const { aiTitles, aiTitleReason } = useSelector(
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
      <HeaderText>전시 테마 AI 추천</HeaderText>
      <TitleSubtitle
        titleLarge='AI가 만든 전시 이름'
        subtitle='원하는 전시 이름을 선택해 주세요'
        style={{ marginBottom: 12 }}
      />
      <RefreshIcon />
      <View style={{ marginBottom: 27 }} />
      <ThemeScrollView horizontal showsHorizontalScrollIndicator={false}>
        {aiTitles.map((title, index) => (
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
              {aiTitleReason[aiTitles.indexOf(selectedTitle)]}
            </ReasonText>
          </ReasonTextContainer>
        ) : (
          <InitialReasonContainer>
            <ReasonTitle>테마를 클릭하고 추천 이유 보기</ReasonTitle>
            <InitialSubText>
              컬렉터님이 선택한 작품들로 테마를 만들었어요!
            </InitialSubText>
          </InitialReasonContainer>
        )}
      </ReasonContainer>
      <Btn onPress={handleComplete} style={{ marginHorizontal: 16 }}>
        <BtnText>설정 완료하기</BtnText>
      </Btn>
      <CustomModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={`이미 입력하신 전시 이름이 ${`\n`}있으시네요!`}
        body={`컬렉터님께서 이미 이름을 입력하셨네요!${`\n`}지금 선택하신 이름으로 변경할까요?`}
        confirmButtonText='네, 할게요'
        cancelButtonText='아니오!'
        onConfirm={handleConfirm}
      />
    </Container>
  );
};

const HeaderText = styled(Subtitle1)`
  margin: 16px 0;
`;

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
  border-radius: ${({ theme }) => theme.radius.s};
  margin: ${({ theme }) => theme.margin.xs};
  elevation: 5;
  overflow: visible;
`;

const GradientCard = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.s};
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
  border-radius: ${({ theme }) => theme.radius.l};
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
  margin-bottom: ${({ theme }) => theme.margin.xs};
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.grey_8};
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
  color: ${({ theme }) => theme.colors.grey_6};
  letter-spacing: 0.5px;
`;

export default AIRecommendDescription;
