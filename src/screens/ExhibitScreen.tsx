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
  const dispatch = useDispatch();
  // 리덕스 상태 가져오기
  const selectedCollections = useSelector(
    (state: RootState) => state.collection.selectedCollections,
  );
  // 로컬 상태 관리
  const {
    userCherries,
    selectedArtworks,
    setSelectedArtworks,
    artworkInfoInput,
    selectedThemes,
  } = useGlobalState();
  const [step, setLocalStep] = useState(route.params?.step || 0);
  const [isArtworkDescriptionValid, setIsArtworkDescriptionValid] =
    useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false); // Separate state for other descriptions
  const [modalVisible, setModalVisible] = useState(false);
  const [isArtworkModalVisible, setIsArtworkModalVisible] = useState(false);
  const [totalRequiredCherries, setTotalRequiredCherries] = useState(0);
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleSave}>
              <Icon
                name="chevron-back"
                size={24}
                color="#120000"
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#120000',
                fontFamily: 'Bold',
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              전시 이름, 설명 수정하기
            </Text>
          </View>
        ) : (
          <TouchableOpacity onPress={goToPrev}>
            {step === 0 ? (
              <Icon
                name="chevron-back"
                size={24}
                color="#120000"
                style={{ marginLeft: 16 }}
              />
            ) : (
              <Text
                style={{
                  marginLeft: 16,
                  color: '#120000',
                  fontFamily: 'Bold',
                  fontSize: 16,
                }}
              >
                이전
              </Text>
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
            <Text
              style={{
                marginRight: 16,
                color:
                  (step === 0 && selectedCollections.length === 0) ||
                  (step === 1 && selectedArtworks.length === 0) ||
                  (step === 2 && selectedThemes.length === 0) ||
                  (step === 3 && !isArtworkDescriptionValid) ||
                  (step === 4 && !isDescriptionValid)
                    ? '#ccc'
                    : '#120000',
                fontFamily: 'Bold',
                fontSize: 16,
              }}
            >
              {step === 6 ? '완성' : '다음'}
            </Text>
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
    if (step === 1) {
      if (totalRequiredCherries > userCherries && totalRequiredCherries > 0) {
        setIsArtworkModalVisible(true);
        return;
      } else if (totalRequiredCherries > 0) {
        setIsArtworkModalVisible(true);
        return;
      }
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
      // 진짜로 나갈 건지 사용자에게 물어보는 기능 추가 예정 (나가기, 임시저장하기)
      // 나가기 누르면 전역 상태 값 다 초기화 시키기
    }
  };

  const handleSave = () => {
    // Save logic here, then exit editing mode
    setIsEditing(false);
    navigation.navigate('Exhibit', { step: 6 });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <CollectionSelect />;
      case 1:
        return (
          <ArtworkSelect
            onSelectionChange={(artworks, totalCherries) => {
              setSelectedArtworks(artworks);
              setTotalRequiredCherries(totalCherries);
            }}
          />
        );
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ marginBottom: 5, color: '#120000', fontSize: 16 }}>
              필요한 체리{' '}
              <Text style={{ color: '#E57373', fontWeight: 'bold' }}>2</Text>
            </Text>
            <Text style={{ color: '#120000', fontSize: 16 }}>
              보유중인 체리{' '}
              <Text style={{ color: '#E57373', fontWeight: 'bold' }}>
                {userCherries}
              </Text>
            </Text>
          </View>
        }
        confirmButtonText="확인했습니다"
        cancelButtonText={'이전으로'}
      />
      {isArtworkModalVisible && totalRequiredCherries > 0 && (
        <ArtworkSelectModal
          visible={isArtworkModalVisible}
          requiredCherries={totalRequiredCherries}
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

const SaveButtonContainer = styled.View`
  background-color: transparent;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #120000;
  padding: 15px;
  border-radius: 30px;
  align-items: center;
  margin: 20px;
`;

const SaveButtonText = styled.Text`
  font-size: 16px;
  font-family: 'Bold';
  color: #fff;
`;

export default ExhibitScreen;
