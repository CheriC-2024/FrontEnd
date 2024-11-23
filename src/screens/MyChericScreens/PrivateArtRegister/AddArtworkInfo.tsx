import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArtworkCategory,
  ArtworkSizeInput,
  InfoBlock,
  InputBlock,
  ProgressBar,
  RadioBtnSelect,
  TitleSubtitle,
  ToastMessage,
} from 'src/components/_index';
import { useToastMessage } from 'src/hooks/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import {
  setArtistName,
  setIsPriceOpen,
  setPrice,
  updateArtBasicInfo,
} from 'src/slices/registerPrivateArtworkSlice';
import { AppDispatch, RootState } from 'src/store';
import { Container } from 'src/styles/layout';

const AddArtworkInfo: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { artBasicInfo, artistName, price, isPriceOpen } = useSelector(
    (state: RootState) => state.registerPrivateArtwork,
  );
  const { toastVisible, toastMessage, showToast } = useToastMessage();

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled =
      artistName.trim() !== '' &&
      artBasicInfo.madeAt > 0 &&
      artBasicInfo.artTypes.length > 0 &&
      artBasicInfo.horizontalSize > 0 &&
      artBasicInfo.verticalSize > 0 &&
      price > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '다음',
        nextScreenName: 'AddDocs',
        headerRightDisabled: !isNextEnabled,
      }),
    );
    console.log(
      '현재 Redux 상태:',
      artBasicInfo,
      artistName,
      price,
      isPriceOpen,
    );
  }, [navigation, artBasicInfo, artistName, price, isPriceOpen]);

  const handleNameChange = (name: string) => {
    dispatch(setArtistName(name));
  };

  const handleSeriesChange = (series: string) => {
    dispatch(updateArtBasicInfo({ series }));
  };

  const handleMaterialChange = (material: string) => {
    dispatch(updateArtBasicInfo({ material }));
  };

  const handleYearChange = (madeAt: number) => {
    dispatch(updateArtBasicInfo({ madeAt }));
  };

  const handlePriceChange = (price: number) => {
    dispatch(setPrice(price));
  };

  const handleArtTypeChange = (selectedTypes: string[]) => {
    if (selectedTypes.length > 2) {
      console.log('Show toast called');
      showToast('최대 2개의 항목만 선택할 수 있습니다.');
      return;
    }

    dispatch(updateArtBasicInfo({ artTypes: selectedTypes }));
  };

  const handlePriceVisibilityChange = (value: boolean) => {
    dispatch(setIsPriceOpen(value));
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar currentStep={2} totalSteps={3} />
        <TitleSubtitle
          titleLarge={'소장 작품 등록하기'}
          subtitle={'CheriC가 정보를 확인한 후에 소장 작품으로 인증해드려요!'}
        />
        <InfoBlock
          label={'작품의 저작권자(작가)'}
          placeholder={'작품의 저작권자(작가)의 이름을 입력해주세요'}
          maxLength={30}
          value={artistName}
          onChangeText={handleNameChange}
          required
          style={{ marginTop: 24 }}
        />
        <InfoBlock
          label={'작품이 소속된 시리즈 이름'}
          placeholder={'작품이 소속된 시리즈가 있다면 입력해주세요'}
          maxLength={30}
          value={artBasicInfo.series}
          onChangeText={handleSeriesChange}
          style={{ marginTop: 24 }}
        />
        <ArtworkSizeInput
          width={artBasicInfo.horizontalSize}
          height={artBasicInfo.verticalSize}
          onWidthChange={(width) =>
            dispatch(updateArtBasicInfo({ horizontalSize: width }))
          }
          onHeightChange={(height) =>
            dispatch(updateArtBasicInfo({ verticalSize: height }))
          }
          required={true}
          style={{ marginTop: 24 }}
        />
        <InfoBlock
          label={'작품에 사용된 재료'}
          placeholder={'작품에 사용된 재료(재질)을 알려주세요'}
          maxLength={50}
          value={artBasicInfo.material}
          onChangeText={handleMaterialChange}
          style={{ marginTop: 24 }}
        />
        <InputBlock
          label='작품의 제작 시기'
          placeholder='작품의 제작 연도'
          unit='년도'
          required={true}
          value={artBasicInfo.madeAt}
          onChangeText={handleYearChange}
          style={{ marginTop: 24 }}
        />
        <ArtworkCategory
          selectedCategories={artBasicInfo.artTypes}
          onSelect={handleArtTypeChange}
          required={true}
          style={{ marginTop: 24 }}
        />
        <InputBlock
          label='작품의 구매가'
          placeholder='작품 소장에 소요된 비용'
          unit='원'
          required={true}
          value={price}
          onChangeText={handlePriceChange}
          style={{ marginTop: 24 }}
        />
        <RadioBtnSelect
          label='작품 구매가 공개 여부'
          selectedValue={isPriceOpen}
          onValueChange={handlePriceVisibilityChange}
          required={true}
          style={{ marginTop: 24 }}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
      <ToastMessage message={toastMessage} visible={toastVisible} />
    </Container>
  );
};

export default AddArtworkInfo;
