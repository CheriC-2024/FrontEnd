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
    const unsubscribe = navigation.addListener('focus', () => {
      const currentStep = route.params?.step || 0;
      setStep(currentStep);
    });

    return unsubscribe;
  }, [navigation, route.params?.step]);

  useEffect(() => {
    navigation.setParams({ step });
  }, [step]);

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
