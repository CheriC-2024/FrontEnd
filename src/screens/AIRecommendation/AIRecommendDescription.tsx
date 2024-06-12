import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styled from 'styled-components/native';
import { useGlobalState } from '../../contexts/GlobalStateContext';
import { RootStackParamList } from '../../navigations/AppNavigator';
import CustomModal from '../../components/Modal';
import { LinearGradient } from 'expo-linear-gradient';

const AIRecommendDescription: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { exhibitTitle, setExhibitTitle } = useGlobalState();
  const [selectedExhibitName, setSelectedExhibitName] = useState<string | null>(
    null,
  );
  const [recommendationReason, setRecommendationReason] = useState<
    string | null
  >(null);
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

  const handleExhibitNameSelect = (name: string) => {
    setSelectedExhibitName(name);
    setRecommendationReason(
      `${name} 추천 이유: 이 전시명은 AI가 자동으로 생성한 추천 전시명입니다.`,
    );
  };

  const exhibitNames = [
    '하늘보다 더 넓은 땅',
    '넓다랗고 푸른 땅',
    'AI전시명3',
    'AI전시명4',
    'AI전시명5',
  ];

  const handleComplete = () => {
    if (!selectedExhibitName) return;

    if (exhibitTitle) {
      setIsModalVisible(true);
    } else {
      setExhibitTitle(selectedExhibitName);
      navigation.navigate('Exhibit', { step: 4 });
    }
  };

  const handleConfirm = () => {
    if (selectedExhibitName) {
      setExhibitTitle(selectedExhibitName);
      setIsModalVisible(false);
      navigation.navigate('Exhibit', { step: 4 });
    }
  };

  return (
    <Container>
      <Content>
        <Title>AI가 전시명을 만들었어요!</Title>
        <SubTitle>원하는 전시 이름을 선택해 주세요</SubTitle>
        <ThemeScrollView horizontal>
          {exhibitNames.map((name, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleExhibitNameSelect(name)}
            >
              <ThemeCard selected={selectedExhibitName === name}>
                {selectedExhibitName === name ? (
                  <GradientCard colors={['#fff', '#FDEEEE']}>
                    <ThemeText>{name}</ThemeText>
                  </GradientCard>
                ) : (
                  <ThemeText>{name}</ThemeText>
                )}
              </ThemeCard>
            </TouchableOpacity>
          ))}
        </ThemeScrollView>
        <ReasonContainer>
          <ReasonIcon
            source={require('../../assets/images/character_ai.png')}
          />
          {selectedExhibitName ? (
            <ReasonTextContainer>
              <ReasonTitle>추천 이유</ReasonTitle>
              <ReasonText multiline>
                {`${selectedExhibitName} AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다. AI가 자동으로 선택한 테마입니다.`}
              </ReasonText>
            </ReasonTextContainer>
          ) : (
            <InitialReasonContainer>
              <ReasonTitle>
                결과를 클릭하면 추천 이유를 볼 수 있어요!
              </ReasonTitle>
              <InitialSubText>
                컬렉터님이 설정한 작품들로 이름을 만들었습니다:)
              </InitialSubText>
            </InitialReasonContainer>
          )}
        </ReasonContainer>
      </Content>
      <CompleteButton onPress={handleComplete}>
        <CompleteButtonText>설정 완료하기</CompleteButtonText>
      </CompleteButton>
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

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  overflow: visible; /* 그림자가 잘리지 않도록 설정 */
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
`;

const ThemeScrollView = styled.ScrollView`
  flex-grow: 0;
  margin-bottom: 16px;
  overflow: visible; /* 그림자가 잘리지 않도록 설정 */
`;

const ThemeCard = styled.View<{ selected: boolean }>`
  width: 140px;
  height: 180px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  margin: 5px;
  elevation: 5;
  overflow: visible; /* 그림자가 잘리지 않도록 설정 */
`;

const GradientCard = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const ThemeText = styled.Text`
  margin: 0 10px;
  text-align: center;
  color: #120000;
  font-family: 'Bold';
  font-size: 14px;
  letter-spacing: 0.5px;
`;

const ReasonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-top: 50px;
  border-radius: 30px;
  border: 1.7px dashed #e52c32;
`;

const ReasonIcon = styled.Image`
  width: 65px;
  height: 120px;
  margin: 0 10px;
`;

const ReasonTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  margin-right: 25px;
`;

const ReasonTitle = styled.Text`
  margin-bottom: 10px;
  font-family: 'Bold';
  font-size: 14px;
  color: #120000;
  letter-spacing: 0.5px;
`;

const ReasonText = styled.Text`
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

const InitialSubText = styled.Text`
  font-family: 'Regular';
  font-size: 12px;
  color: #b0abab;
  letter-spacing: 0.5px;
`;

const CompleteButton = styled.TouchableOpacity`
  padding: 12px;
  background-color: #120000;
  border-radius: 30px;
  align-items: center;
  margin: 16px;
`;

const CompleteButtonText = styled.Text`
  font-family: 'Bold';
  font-size: 16px;
  color: #fff;
`;

export default AIRecommendDescription;
