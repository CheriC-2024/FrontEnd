import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import CollectionSelect from './CollectionSelect';
import ArtworkSelect from './ArtworkSelect';
import ThemeSetting from './ThemeSetting';
import ArtworkInfoSetting from './ArtworkInfoSetting';
import DescriptionSetting from './DescriptionSetting';
import CoverSetting from './CoverSetting';
import FinishSetting from './FinishSetting';
import { StackScreenProps } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';

const Container = styled.View`
  flex: 1;
`;

type RootStackParamList = {
  Exhibit: { step: number };
  MainTabs: undefined;
};

type ExhibitScreenProps = StackScreenProps<RootStackParamList, 'Exhibit'>;

const ExhibitScreen: React.FC<ExhibitScreenProps> = ({ navigation, route }) => {
  const [step, setStep] = useState(route.params?.step || 0);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={goToPrev}>
          <Text style={{ marginLeft: 16, color: '#007AFF' }}>이전</Text>
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
      setStep(step + 1);
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const goToPrev = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigation.goBack();
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
