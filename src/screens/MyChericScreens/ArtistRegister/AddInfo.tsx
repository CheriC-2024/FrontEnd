import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArtworkCategory,
  InfoBlock,
  ProgressBar,
  TitleSubtitle,
} from 'src/components/_index';
import { RootState } from 'src/store';
import { Container } from 'src/styles/layout';
import styled from 'styled-components/native';
import { Subtitle2 } from 'src/styles/typography';
import { PlusIcon } from 'src/assets/icons/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { useNavigation } from '@react-navigation/native';
import { updateArtistBasicReq } from 'src/slices/registerArtistSlice';

const AddInfo: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { artistBasicReq } = useSelector(
    (state: RootState) => state.registerArtist,
  );

  // 헤더 설정
  useEffect(() => {
    const isNextEnabled = artistBasicReq.name.trim().length > 0;
    navigation.setOptions(
      headerOptions(navigation, {
        headerRightText: '다음',
        nextScreenName: 'AddResume',
        headerRightDisabled: !isNextEnabled,
      }),
    );
    console.log('작가 인증 리덕스', artistBasicReq);
  }, [navigation, artistBasicReq]);

  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'You need to grant gallery access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      dispatch(updateArtistBasicReq({ profileImgUrl: uri }));
    }
  };

  const handleNameChange = (name: string) => {
    dispatch(updateArtistBasicReq({ name }));
  };

  const handleIntroChange = (info: string) => {
    dispatch(updateArtistBasicReq({ info }));
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar currentStep={1} totalSteps={3} />
        <TitleSubtitle
          titleLarge={'작가로 인증하기'}
          subtitle={'CheriC가 정보를 확인한 후에 작가님으로 인증해드려요!'}
        />
        <LabelWrapper>
          <LabelText>작가명</LabelText>
          <RequiredMark>*</RequiredMark>
        </LabelWrapper>
        <InputField
          placeholder='작가로 활동하실 필명(이름)을 입력해주세요'
          value={artistBasicReq.name}
          onChangeText={handleNameChange}
        />
        <InfoBlock
          label={'자기소개'}
          placeholder={'작가님만의 자기소개로 변경해주세요'}
          maxLength={100}
          value={artistBasicReq.info}
          onChangeText={handleIntroChange}
        />
        <ImagePickerContainer>
          <LabelText>프로필 이미지</LabelText>
          <TouchableOpacity onPress={handleImagePick}>
            <ImageBox>
              {artistBasicReq.profileImgUrl ? (
                <StyledImage source={{ uri: artistBasicReq.profileImgUrl }} />
              ) : (
                <PlusIcon fill={'#B0ABAB'} width={40} height={40} />
              )}
            </ImageBox>
          </TouchableOpacity>
        </ImagePickerContainer>
        <ArtworkCategory
          label='작가 활동 분야'
          selectedCategories={artistBasicReq.userPartRequests}
          onSelect={(categories) =>
            dispatch(updateArtistBasicReq({ userPartRequests: categories }))
          }
          required={true}
          style={{ marginBottom: 80 }}
        />
      </ScrollView>
    </Container>
  );
};

export default AddInfo;

const InputField = styled.TextInput`
  flex: 1;
  margin-bottom: 24px;
  padding-top: ${({ theme }) => theme.spacing.s2};
  padding-left: ${({ theme }) => theme.spacing.s4};
  padding-bottom: ${({ theme }) => theme.spacing.s2};
  border-radius: ${({ theme }) => theme.radius.m};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSizes.body2};
  background-color: ${({ theme }) => theme.colors.grey_4};
`;

const ImagePickerContainer = styled.View`
  margin: 24px 0;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

const RequiredMark = styled(Subtitle2)`
  margin-left: 2px;
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const LabelText = styled(Subtitle2)`
  margin-bottom: 4px;
  margin-left: 4px;
`;

const ImageBox = styled.View`
  width: 100%;
  height: 200px;
  border-radius: ${({ theme }) => theme.radius.m};
  background-color: #ebebeb;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.radius.m};
`;
