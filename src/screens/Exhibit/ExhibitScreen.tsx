import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CollectionSelect from './CollectionSelect';
import ArtworkSelect from './ArtworkSelect';
import ThemeSetting from './ThemeSetting';
import ArtworkInfoSetting from './ArtworkInfoSetting';
import DescriptionSetting from './DescriptionSetting';
import CoverSetting from './CoverSetting';
import FinishSetting from './FinishSetting';
import { useProgressBar } from '../../components/ProgressBarContext';

type RootStackParamList = {
  MainTabs: undefined;
  Exhibit: { step: number; selectedThemes?: string[] };
  ThemeSetting: { selectedThemes: string[] };
};

type ExhibitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Exhibit'
>;
type ExhibitScreenRouteProp = RouteProp<RootStackParamList, 'Exhibit'>;

const Container = styled.View`
  flex: 1;
`;

const ExhibitScreen: React.FC = () => {
  const navigation = useNavigation<ExhibitScreenNavigationProp>();
  const route = useRoute<ExhibitScreenRouteProp>();
  const { setStep } = useProgressBar();
  const [step, setLocalStep] = useState(route.params?.step || 0);

  useEffect(() => {
    if (route.params?.step !== undefined) {
      setLocalStep(route.params.step);
      setStep(route.params.step); // Ensure ProgressBar step is updated
    }
  }, [route.params?.step]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={goToPrev}>
          <Text style={{ marginLeft: 16, color: '#000' }}>이전</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={goToNext}>
          <Text style={{ marginRight: 16, color: '#007AFF' }}>다음</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, step]);

  const goToNext = () => {
    if (step < 6) {
      setLocalStep(step + 1);
      setStep(step + 1);
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const goToPrev = () => {
    if (step > 0) {
      setLocalStep(step - 1);
      setStep(step - 1);
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        }),
      );
      // 진짜로 나갈 건지 사용자에게 물어보는 기능 추가 예정 (나가기, 임시저장하기)
      // 나가기 누르면 전역 상태 값 다 초기화 시키기
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CollectionSelect />;
      case 1:
        return <ArtworkSelect />;
      case 2:
        return <ThemeSetting />;
      case 3:
        return <ArtworkInfoSetting />;
      case 4:
        return <DescriptionSetting />;
      case 5:
        return <CoverSetting />;
      case 6:
        return (
          <FinishSetting goToHome={() => navigation.navigate('MainTabs')} />
        );
      default:
        return <CollectionSelect />;
    }
  };

  return <Container>{renderStep()}</Container>;
};

export default ExhibitScreen;
