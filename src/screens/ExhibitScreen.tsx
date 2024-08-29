import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text, View } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import CollectionSelect from './Exhibit/CollectionSelect';
import ArtworkSelect from './Exhibit/ArtworkSelect';
import ThemeSetting from './Exhibit/ThemeSetting';
import ArtworkInfoSetting from './Exhibit/ArtworkInfoSetting';
import DescriptionSetting from './Exhibit/DescriptionSetting';
import CoverSetting from './Exhibit/CoverSetting';
import FinishSetting from './Exhibit/FinishSetting';
import { useProgressBar } from '../components/ProgressBarContext';
import { RootStackParamList } from '../navigations/AppNavigator';
import CustomModal from '../components/Modal';
import ArtworkSelectModal from '../components/Modals/ArtworkSelectModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useGlobalState } from '../contexts/GlobalStateContext';
import { theme } from 'src/styles/theme';
import { Subtitle1 } from 'src/styles/typography';

type ExhibitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Exhibit'
>;
type ExhibitScreenRouteProp = RouteProp<RootStackParamList, 'Exhibit'>;

const ExhibitScreen: React.FC = () => {
  const navigation = useNavigation<ExhibitScreenNavigationProp>();
  const route = useRoute<ExhibitScreenRouteProp>();
  const { setStep } = useProgressBar();
  const dispatch = useDispatch();

  const selectedCollections = useSelector(
    (state: RootState) => state.collection.selectedCollections,
  );
  const { selectedArtworks, totalCherries } = useSelector(
    (state: RootState) => state.artwork,
  );
  const selectedThemes = useSelector(
    (state: RootState) => state.theme.selectedThemes,
  );

  const { userCherries, artworkInfoInput } = useGlobalState();
  const [step, setLocalStep] = useState(route.params?.step || 0);
  const [isArtworkDescriptionValid, setIsArtworkDescriptionValid] =
    useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isArtworkModalVisible, setIsArtworkModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params?.step !== undefined) {
      setLocalStep(route.params.step);
      setStep(route.params.step);
    }
  }, [route.params?.step]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        isEditing ? (
          <HeaderLeftContainer>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="chevron-back"
                size={24}
                color={theme.colors.redBlack}
                style={{ marginLeft: theme.spacing.s3 }}
              />
            </TouchableOpacity>
            <HeaderLeftText>전시 이름, 설명 수정하기</HeaderLeftText>
          </HeaderLeftContainer>
        ) : (
          <TouchableOpacity onPress={goToPrev}>
            {step === 0 ? (
              <Icon
                name="chevron-back"
                size={24}
                color={theme.colors.redBlack}
                style={{ marginLeft: theme.spacing.s3 }}
              />
            ) : (
              <PrevText>이전</PrevText>
            )}
          </TouchableOpacity>
        ),
      headerRight: () =>
        isEditing ? null : (
          <TouchableOpacity
            onPress={step === 6 ? showConfirmModal : goToNext}
            disabled={
              (step === 0 && selectedCollections.length === 0) ||
              (step === 1 && selectedArtworks.length === 0) ||
              (step === 2 && selectedThemes.length === 0) ||
              (step === 3 && !isArtworkDescriptionValid) ||
              (step === 4 && !isDescriptionValid)
            }
          >
            <NextText
              disabled={
                (step === 0 && selectedCollections.length === 0) ||
                (step === 1 && selectedArtworks.length === 0) ||
                (step === 2 && selectedThemes.length === 0) ||
                (step === 3 && !isArtworkDescriptionValid) ||
                (step === 4 && !isDescriptionValid)
              }
            >
              {step === 6 ? '완성' : '다음'}
            </NextText>
          </TouchableOpacity>
        ),
    });
  }, [
    navigation,
    step,
    isEditing,
    isArtworkDescriptionValid,
    isDescriptionValid,
    selectedCollections,
    selectedArtworks,
    selectedThemes,
    artworkInfoInput,
  ]);

  const showConfirmModal = () => {
    setModalVisible(true);
  };

  const closeConfirmModal = () => {
    setModalVisible(false);
  };

  const confirmCompletion = () => {
    closeConfirmModal();
    navigation.navigate('MainTabs');
  };

  const goToNext = () => {
    if (step === 1 && totalCherries > 0) {
      setIsArtworkModalVisible(true);
      return;
    }

    if (step < 6) {
      setLocalStep(step + 1);
      setStep(step + 1);
    } else {
      showConfirmModal();
    }
  };

  const goToPrev = () => {
    if (step > 0) {
      setLocalStep(step - 1);
      setStep(step - 1);
    } else {
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: 'MainTabs' }] }),
      );
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    navigation.navigate('Exhibit', { step: 6 });
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
        return (
          <ArtworkInfoSetting
            onArtworkDescriptionChange={(filled) =>
              setIsArtworkDescriptionValid(filled)
            }
          />
        );
      case 4:
        return <DescriptionSetting onFieldsFilled={setIsDescriptionValid} />;
      case 5:
        return <CoverSetting />;
      case 6:
        return <FinishSetting setIsEditing={setIsEditing} />;
      default:
        return <CollectionSelect />;
    }
  };

  return (
    <Container>
      {renderStep()}
      <CustomModal
        visible={modalVisible}
        onClose={closeConfirmModal}
        onConfirm={confirmCompletion}
        title="마지막으로, 전시작품의 이용료를 결제할게요!"
        body={
          <ModalContent>
            <Text
              style={{
                marginBottom: theme.spacing.s2,
                color: theme.colors.redBlack,
                fontSize: theme.fontSizes.subtitle1,
              }}
            >
              필요한 체리{' '}
              <Text
                style={{ color: theme.colors.cherryRed_10, fontWeight: 'bold' }}
              >
                2
              </Text>
            </Text>
            <Text
              style={{
                color: theme.colors.redBlack,
                fontSize: theme.fontSizes.subtitle1,
              }}
            >
              보유중인 체리{' '}
              <Text
                style={{ color: theme.colors.cherryRed_10, fontWeight: 'bold' }}
              >
                {userCherries}
              </Text>
            </Text>
          </ModalContent>
        }
        confirmButtonText="확인했습니다"
        cancelButtonText={'이전으로'}
      />
      {isArtworkModalVisible && totalCherries > 0 && (
        <ArtworkSelectModal
          visible={isArtworkModalVisible}
          requiredCherries={totalCherries}
          cherryCount={selectedArtworks.length}
          userCherries={userCherries}
          onClose={() => setIsArtworkModalVisible(false)}
          onBuyCherries={() => {
            setIsArtworkModalVisible(false);
          }}
          onConfirm={() => {
            setLocalStep(2);
            setStep(2);
            setIsArtworkModalVisible(false);
          }}
        />
      )}
      {isEditing && (
        <SaveButtonContainer>
          <SaveButton onPress={handleSave}>
            <SaveButtonText>수정한 내용 저장하기</SaveButtonText>
          </SaveButton>
        </SaveButtonContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const HeaderLeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderLeftText = styled.Text`
  color: ${theme.colors.redBlack};
  font-family: ${theme.fonts.bold};
  font-size: ${theme.fontSizes.body1};
  margin-left: ${theme.spacing.s2};
`;

const PrevText = styled(Subtitle1)`
  margin-left: ${theme.spacing.s1};
`;

const NextText = styled(Subtitle1)<{ disabled: boolean }>`
  margin-right: ${theme.spacing.s1};
  color: ${({ disabled }) =>
    disabled ? theme.colors.grey_6 : theme.colors.redBlack};
`;

const ModalContent = styled.View`
  align-items: center;
`;

const SaveButtonContainer = styled.View`
  background-color: transparent;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: ${theme.colors.redBlack};
  padding: ${theme.spacing.s5};
  border-radius: ${theme.radius.l};
  align-items: center;
  margin: ${theme.spacing.s6};
`;

const SaveButtonText = styled.Text`
  font-size: ${theme.fontSizes.body1};
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.white};
`;

export default ExhibitScreen;
