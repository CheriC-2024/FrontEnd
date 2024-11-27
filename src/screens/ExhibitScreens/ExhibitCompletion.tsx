import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { preparePostData } from 'src/utils/postExhibitUtils';
import { postExhibition } from 'src/api/exhibitApi';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Container } from 'src/styles/layout';
import { Btn, BtnText } from 'src/components/Button';
import { Caption, H4 } from 'src/styles/typography';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { OwnArtCheck } from 'src/assets/images/MyCheric/_index';
import { RootState } from 'src/store';
import { resetExhibitState } from 'src/slices/exhibitSlice';
import { resetCoverState } from 'src/slices/coverSlice';
import { resetThemeState } from 'src/slices/themeSlice';
import { resetSelectedArtworks } from 'src/slices/artworkSlice';
import { clearSelectedCollections } from 'src/slices/collectionSlice';

const ExhibitCompletion: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [postSuccess, setPostSuccess] = useState(false);

  const { exhibitTitle, exhibitDescription, selectedFont } = useSelector(
    (state: RootState) => state.exhibit,
  );
  const { selectedCoverImage, selectedGradientConfig } = useSelector(
    (state: RootState) => state.cover,
  );
  const { selectedThemes } = useSelector((state: RootState) => state.theme);
  const { selectedArtworks, artworkInfoInput } = useSelector(
    (state: RootState) => state.artwork,
  );

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        leftButtonText: ' ',
        headerRightText: '나가기',
        onHeaderRightPress: handleNext,
        headerRightDisabled: loading,
      }),
    );
  }, [loading, navigation]);

  // 네비게이션 핸들러
  const handleNext = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
    });
  };

  // POST API 호출
  const handleUploadAndPost = async () => {
    try {
      // POST 데이터 구성
      const postData = preparePostData({
        exhibitTitle,
        exhibitDescription,
        selectedFont,
        selectedThemes,
        selectedArtworks,
        artworkInfoInput,
        selectedCoverImage,
        selectedGradientConfig,
      });

      console.log('POST 데이터:', postData);

      // API 요청
      await postExhibition(postData);
      console.log('POST 성공');

      setPostSuccess(true); // 성공 상태 업데이트
      // Redux 상태 초기화 -> 에러
      // dispatch(resetExhibitState());
      // dispatch(resetCoverState());
      // dispatch(resetThemeState());
      // dispatch(resetSelectedArtworks());
      // dispatch(clearSelectedCollections());
    } catch (error) {
      console.error('POST 실패:', error);
      Alert.alert('에러', '업로드 또는 등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 페이지 로드 시 API 호출
  useEffect(() => {
    handleUploadAndPost();
  }, []);

  // 로딩 화면
  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='large' color='#E52C32' />
      </LoadingContainer>
    );
  }

  // 성공 화면
  if (postSuccess) {
    return (
      <Container>
        <TitleSubtitle
          titleLarge={'전시 제작이 완료되었습니다!'}
          subtitle={'등록된 전시 정보를 확인해주세요.'}
        />
        <InfoContainer>
          <OwnArtCheck />
          <H4>{exhibitTitle}</H4>
          <H4>전시 제작 완료!</H4>
          <Caption style={{ textAlign: 'center', marginTop: 8 }}>
            전시 정보가 성공적으로 등록되었습니다.{`\n`}
            감사합니다!
          </Caption>
        </InfoContainer>
        <Btn
          onPress={handleNext}
          style={{ marginHorizontal: 16, marginBottom: 60 }}
        >
          <BtnText>메인으로 이동</BtnText>
        </Btn>
      </Container>
    );
  }

  // 에러 화면
  return (
    <ErrorContainer>
      <ErrorMessage>업로드 또는 등록 중 오류가 발생했습니다.</ErrorMessage>
      <Btn onPress={handleUploadAndPost} style={{ marginTop: 20 }}>
        <BtnText>다시 시도</BtnText>
      </Btn>
    </ErrorContainer>
  );
};

export default ExhibitCompletion;

// 스타일 컴포넌트
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const InfoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const ErrorMessage = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #e52c32;
  text-align: center;
`;
