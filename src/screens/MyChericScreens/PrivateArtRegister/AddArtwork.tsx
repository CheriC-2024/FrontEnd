import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { InfoBlock, ProgressBar, TitleSubtitle } from 'src/components/_index';
import { Container } from 'src/styles/layout';
import { Subtitle2 } from 'src/styles/typography';
import { PlusIcon, XIcon } from 'src/assets/icons/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';

const AddArtwork: React.FC = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [privateArtName, setPrivateArtName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled = privateArtName.trim().length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        headerRightText: '다음',
        nextScreenName: 'AddArtworkInfo',
        headerRightDisabled: !isNextEnabled,
      }),
    );
  }, [navigation, privateArtName]);

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
      const newImages = [...images];
      newImages[index] = result.assets[0].uri; // 해당 인덱스에 이미지를 추가
      setImages(newImages);

      // 대표 이미지 설정
      if (images.length === 0) {
        setSelectedImage(index); // 첫 이미지가 대표 이미지로 자동 설정
      }
    }
  };

  // 이미지 삭제
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1); // 해당 이미지를 삭제
    setImages(newImages);

    if (selectedImage === index) {
      // 대표 이미지가 삭제되었을 경우
      setSelectedImage(newImages.length > 0 ? 0 : -1); // 남은 첫 이미지를 대표 이미지로 설정
    } else if (selectedImage > index) {
      setSelectedImage(selectedImage - 1); // 삭제 후 인덱스 조정
    }
  };

  // 대표 이미지 설정
  const handleSelectAsMain = (index: number) => {
    setSelectedImage(index);
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
                  {images[index] ? (
                    <TouchableOpacity onPress={() => handleSelectAsMain(index)}>
                      <UploadedImageWrapper>
                        <UploadedImage source={{ uri: images[index] }} />
                        <Overlay />
                        {selectedImage === index && (
                          <MainImageLabel>대표 사진</MainImageLabel>
                        )}
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
          value={privateArtName}
          onChangeText={setPrivateArtName}
          required
          style={{ marginTop: 24, paddingHorizontal: 16 }}
        />
        <InfoBlock
          label={'작품 소개'}
          placeholder={
            '컬렉터님만의 소장 작품 소개를 작성해주세요\nex) 이 작품은 작가님의 꿈을 펼친다는 의미가 담겨있는 스토리가 숨어있는 재밌는 작품이에요!'
          }
          maxLength={300}
          value={description}
          onChangeText={setDescription}
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
