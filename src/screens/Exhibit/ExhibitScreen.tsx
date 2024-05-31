import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CollectionSelect from './CollectionSelect';
import ArtworkSelect from './ArtworkSelect';
import ThemeSetting from './ThemeSetting';
import ArtworkInfoSetting from './ArtworkInfoSetting';
import DescriptionSetting from './DescriptionSetting';
import CoverSetting from './CoverSetting';
import FinishSetting from './FinishSetting';

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
  const [step, setStep] = useState(route.params?.step || 0);
  const [selectedThemes, setSelectedThemes] = useState<string[]>(
    route.params?.selectedThemes || [],
  );

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

  useEffect(() => {
    if (route.params?.selectedThemes) {
      setSelectedThemes(route.params.selectedThemes);
    }
  }, [route.params?.selectedThemes]);

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
      navigation.navigate('MainTabs');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CollectionSelect />;
      case 1:
        return <ArtworkSelect />;
      case 2:
        return (
          <ThemeSetting
            selectedThemes={selectedThemes}
            setSelectedThemes={setSelectedThemes}
            goToNext={goToNext}
          />
        );
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
