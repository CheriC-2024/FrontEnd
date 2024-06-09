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
import Icon from 'react-native-vector-icons/Ionicons'; // 아이콘 라이브러리 추가
import CollectionSelect from './Exhibit/CollectionSelect';
import ArtworkSelect from './Exhibit/ArtworkSelect';
import ThemeSetting from './Exhibit/ThemeSetting';
import ArtworkInfoSetting from './Exhibit/ArtworkInfoSetting';
import DescriptionSetting from './Exhibit/DescriptionSetting';
import CoverSetting from './Exhibit/CoverSetting';
import FinishSetting from './Exhibit/FinishSetting';
import { useProgressBar } from '../components/ProgressBarContext';
import { RootStackParamList } from '../navigations/AppNavigator';
import CustomModal from '../components/Modal'; // 모달 컴포넌트 임포트
import ArtworkSelectModal from '../components/Modals/ArtworkSelectModal'; // 추가된 모달 컴포넌트 임포트
import { useGlobalState } from '../contexts/GlobalStateContext'; // 상태 불러오기

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
  const {
    collections,
    selectedCollections,
    userCherries,
    selectedArtworks,
    setSelectedArtworks,
  } = useGlobalState(); // 상태 추가
  const [step, setLocalStep] = useState(route.params?.step || 0);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [isCollectionSelected, setIsCollectionSelected] = useState(false); // 선택된 컬렉션의 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [isArtworkModalVisible, setIsArtworkModalVisible] = useState(false); // 추가된 모달 상태
  const [cherryDetails, setCherryDetails] = useState({
    totalRequiredCherries: 0,
    cherryCount: 0,
  });

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
      headerRight: () => (
        <TouchableOpacity
          onPress={step === 6 ? showConfirmModal : goToNext} // FinishSetting 모달
          disabled={
            (step === 0 && !isCollectionSelected) ||
            (step === 1 && selectedArtworks.length === 0) || // 추가된 조건
            (step === 4 && !isDescriptionValid)
          }
        >
          <Text
            style={{
              marginRight: 16,
              color:
                (step === 0 && !isCollectionSelected) ||
                (step === 1 && selectedArtworks.length === 0) || // 추가된 조건
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
    isDescriptionValid,
    isCollectionSelected,
    selectedArtworks,
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
      const newCherryDetails = selectedArtworks.reduce(
        (acc, artworkId) => {
          const artwork = collections
            .flatMap((collection) => collection.artworks)
            .find((art) => art.id === artworkId);
          if (artwork && artwork.cherry && artwork.cherry > 0) {
            return {
              totalRequiredCherries: acc.totalRequiredCherries + artwork.cherry,
              cherryCount: acc.cherryCount + 1,
            };
          }
          return acc;
        },
        { totalRequiredCherries: 0, cherryCount: 0 },
      );

      setCherryDetails(newCherryDetails);

      if (
        newCherryDetails.totalRequiredCherries > userCherries &&
        newCherryDetails.totalRequiredCherries > 0
      ) {
        setIsArtworkModalVisible(true);
        return;
      } else if (newCherryDetails.totalRequiredCherries > 0) {
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
        return (
          <CollectionSelect
            onSelectionChange={(count) => setIsCollectionSelected(count > 0)}
          />
        );
      case 1:
        return <ArtworkSelect onSelectionChange={setSelectedArtworks} />;
      case 2:
        return <ThemeSetting />;
      case 3:
        return <ArtworkInfoSetting />;
      case 4:
        return <DescriptionSetting onFieldsFilled={setIsDescriptionValid} />;
      case 5:
        return <CoverSetting />;
      case 6:
        return <FinishSetting />;
      default:
        return (
          <CollectionSelect
            onSelectionChange={(count) => setIsCollectionSelected(count > 0)}
          />
        );
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
              <Text style={{ color: '#E57373', fontWeight: 'bold' }}>5</Text>
            </Text>
            <Text style={{ color: '#120000', fontSize: 16 }}>
              보유중인 체리{' '}
              <Text style={{ color: '#E57373', fontWeight: 'bold' }}>10</Text>
            </Text>
          </View>
        }
        confirmButtonText="확인했습니다"
      />
      {isArtworkModalVisible && cherryDetails.totalRequiredCherries > 0 && (
        <ArtworkSelectModal
          visible={isArtworkModalVisible}
          requiredCherries={cherryDetails.totalRequiredCherries}
          cherryCount={cherryDetails.cherryCount} // 추가된 체리 카운트
          userCherries={userCherries}
          onClose={() => setIsArtworkModalVisible(false)}
          onBuyCherries={() => {
            // Handle buying cherries
            setIsArtworkModalVisible(false);
          }}
          onConfirm={() => {
            setLocalStep(2);
            setStep(2);
            setIsArtworkModalVisible(false);
          }} // step 2로 이동하는 콜백 함수
        />
      )}
    </Container>
  );
};

export default ExhibitScreen;
