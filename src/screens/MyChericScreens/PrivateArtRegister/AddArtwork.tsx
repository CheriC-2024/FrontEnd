import { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { InfoBlock, ProgressBar, TitleSubtitle } from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { Subtitle2 } from 'src/styles/typography';
import { PlusIcon, XIcon } from 'src/assets/icons/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store';
import {
  setImgUrls,
  updateArtBasicInfo,
} from 'src/slices/registerPrivateArtworkSlice';

const AddArtwork: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { artBasicInfo, imgUrls } = useSelector(
    (state: RootState) => state.registerPrivateArtwork,
  );

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled = artBasicInfo.name.trim().length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        headerRightText: '다음',
        nextScreenName: 'AddArtworkInfo',
        headerRightDisabled: !isNextEnabled,
      }),
    );
    console.log('현재 Redux 상태:', artBasicInfo, imgUrls);
  }, [navigation, artBasicInfo, imgUrls]);

  const handleNameChange = (name: string) => {
    dispatch(updateArtBasicInfo({ name }));
  };

  const handleDescriptionChange = (description: string) => {
    dispatch(updateArtBasicInfo({ description }));
  };

  const handleAddImage = async (index: number) => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('이미지 업로드를 위해 갤러리 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImageUri = result.assets[0].uri;

      if (index === 0 && !artBasicInfo.imgUrl) {
        // 첫 번째 이미지 업로드 -> 대표 이미지 설정
        dispatch(updateArtBasicInfo({ imgUrl: newImageUri }));
      } else {
        // 나머지 이미지 추가
        const updatedImgUrls = [...imgUrls];
        updatedImgUrls[index - 1] = newImageUri;
        dispatch(setImgUrls(updatedImgUrls));
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    if (index === 0) {
      // 대표 이미지 삭제
      if (imgUrls.length > 0) {
        // 나머지 이미지 중 첫 번째를 대표 이미지로 설정
        const [nextMainImage, ...remainingImages] = imgUrls;
        dispatch(updateArtBasicInfo({ imgUrl: nextMainImage }));
        dispatch(setImgUrls(remainingImages));
      } else {
        // 모든 이미지가 삭제될 경우
        dispatch(updateArtBasicInfo({ imgUrl: '' }));
        dispatch(setImgUrls([]));
      }
    } else {
      // 나머지 이미지 삭제
      const updatedImages = imgUrls.filter((_, i) => i !== index - 1);
      dispatch(setImgUrls(updatedImages));
    }
  };

  const handleSelectAsMain = (index: number) => {
    if (index === 0 || !imgUrls[index - 1]) return;

    const selectedImage = imgUrls[index - 1];
    const remainingImages = imgUrls.filter((_, i) => i !== index - 1);

    // 대표 이미지 변경
    const previousMainImage = artBasicInfo.imgUrl;
    dispatch(updateArtBasicInfo({ imgUrl: selectedImage }));
    if (previousMainImage) {
      remainingImages.unshift(previousMainImage); // 이전 대표 이미지를 나머지 배열로 이동
    }

    dispatch(setImgUrls(remainingImages));
  };

  return (
    <Container removePadding>
      <ScrollView>
        <ProgressBar currentStep={1} totalSteps={3} />
        <TitleSubtitle
          titleLarge={'소장 작품 등록하기'}
          subtitle={'CheriC가 정보를 확인한 후에 소장 작품으로 인증해드려요!'}
          style={{ paddingHorizontal: 16 }}
        />
        <ArtworkInputContainer>
          <ArtworkInputTitle>작품의 실물 이미지(최대 3장)</ArtworkInputTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ImageContainer>
              {Array.from({ length: 3 }).map((_, index) => (
                <ImageWrapper key={index}>
                  {index === 0 && artBasicInfo.imgUrl ? (
                    <TouchableOpacity onPress={() => handleSelectAsMain(index)}>
                      <UploadedImageWrapper>
                        <UploadedImage source={{ uri: artBasicInfo.imgUrl }} />
                        <Overlay />
                        <MainImageLabel>대표 사진</MainImageLabel>
                        <RemoveButton onPress={() => handleRemoveImage(index)}>
                          <XIcon fill={'#fff'} width={14} height={14} />
                        </RemoveButton>
                      </UploadedImageWrapper>
                    </TouchableOpacity>
                  ) : imgUrls[index - 1] ? (
                    <TouchableOpacity onPress={() => handleSelectAsMain(index)}>
                      <UploadedImageWrapper>
                        <UploadedImage source={{ uri: imgUrls[index - 1] }} />
                        <Overlay />
                        <RemoveButton onPress={() => handleRemoveImage(index)}>
                          <XIcon fill={'#fff'} width={14} height={14} />
                        </RemoveButton>
                      </UploadedImageWrapper>
                    </TouchableOpacity>
                  ) : (
                    <AddImageButton onPress={() => handleAddImage(index)}>
                      <PlusIcon fill={'#B0ABAB'} width={22} height={22} />
                    </AddImageButton>
                  )}
                </ImageWrapper>
              ))}
            </ImageContainer>
          </ScrollView>
        </ArtworkInputContainer>
        <InfoBlock
          label={'소장 작품의 이름'}
          placeholder={'소장하신 작품의 이름을 입력해주세요'}
          maxLength={50}
          value={artBasicInfo.name}
          onChangeText={handleNameChange}
          required
          style={{ marginTop: 24, paddingHorizontal: 16 }}
        />
        <InfoBlock
          label={'작품 소개'}
          placeholder={
            '컬렉터님만의 소장 작품 소개를 작성해주세요\nex) 이 작품은 작가님의 꿈을 펼친다는 의미가 담겨있는 스토리가 숨어있는 재밌는 작품이에요!'
          }
          maxLength={300}
          value={artBasicInfo.description}
          onChangeText={handleDescriptionChange}
          style={{ marginTop: 24, paddingBottom: 20, paddingHorizontal: 16 }}
        />
      </ScrollView>
    </Container>
  );
};

export default AddArtwork;

const ArtworkInputContainer = styled.View`
  padding-left: 16px;
  margin-top: 24px;
`;

const ArtworkInputTitle = styled(Subtitle2)``;

const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ImageWrapper = styled.View`
  position: relative;
  width: 143px;
  height: 160px;
  margin-right: 8px;
`;

const UploadedImageWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 100%;
`;

const UploadedImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Overlay = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

const MainImageLabel = styled(Subtitle2)`
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  z-index: 10;
`;

const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  justify-content: center;
  align-items: center;
`;

const AddImageButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  background-color: #ebebeb;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;
