import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import usePresignedUpload from 'src/api/hooks/usePresignedUpload';
import { postPrivateArtwork } from 'src/api/artworkApi';
import { OwnArtCheck } from 'src/assets/images/MyCheric/_index';
import { Btn, BtnText } from 'src/components/Button';
import { Container } from 'src/styles/layout';
import { Caption, H4 } from 'src/styles/typography';

const RegisterCompletion: React.FC = () => {
  const { uploadFiles } = usePresignedUpload();
  const [loading, setLoading] = useState(true);
  const [postSuccess, setPostSuccess] = useState(false);

  const { artBasicInfo, imgUrls, artistName, price, isPriceOpen, fileUrl } =
    useSelector((state: RootState) => state.registerPrivateArtwork);

  const handleUploadAndPost = async () => {
    try {
      const allUploadedUrls: string[] = [];

      // 대표 이미지 업로드 처리
      if (artBasicInfo.imgUrl) {
        const fileName =
          artBasicInfo.imgUrl.split('/').pop() || 'art-image.jpeg';
        const response = await fetch(artBasicInfo.imgUrl);
        const blob = await response.blob();

        const singleFile = {
          uri: artBasicInfo.imgUrl,
          name: fileName,
          size: blob.size, // 실제 파일 크기
        };

        const artPath = 'OWN_ART_IMG';
        const [artImageUrl] = await uploadFiles([singleFile], artPath);
        allUploadedUrls.push(artImageUrl);
      }

      // 기타 이미지 업로드 처리
      if (imgUrls.length > 0) {
        const fileList = await Promise.all(
          imgUrls.map(async (fileUri, index) => {
            const fileName =
              fileUri.split('/').pop() || `image-${index + 1}.jpeg`;
            const response = await fetch(fileUri);
            const blob = await response.blob();
            return {
              uri: fileUri,
              name: fileName,
              size: blob.size,
            };
          }),
        );

        const filesPath = 'OWN_ART_IMG';
        const uploadedFileUrls = await uploadFiles(fileList, filesPath);
        allUploadedUrls.push(...uploadedFileUrls);
      }

      // Presigned URL에서 ? 제거
      const cleanedUrls = allUploadedUrls.map((url) => url.split('?')[0]);

      // POST 데이터 구성
      const postData = {
        artBasicInfo: {
          ...artBasicInfo,
          imgUrl: cleanedUrls[0], // 단일 대표 이미지 URL
        },
        artistName: artistName,
        price: price,
        isPriceOpen: isPriceOpen,
        fileUrl: fileUrl,
        imgUrl: cleanedUrls, // 모든 업로드된 이미지 URL
      };

      console.log('POST 데이터:', postData);

      // API 요청
      const response = await postPrivateArtwork(postData);
      console.log('POST 응답:', response);

      setPostSuccess(true);
    } catch (error) {
      console.error('업로드 또는 POST 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUploadAndPost();
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size='large' color='#E52C32' />
      </LoadingContainer>
    );
  }

  if (postSuccess) {
    return (
      <Container>
        <OwnArtCheck />
        <H4>{artBasicInfo.name}</H4>
        <H4>소장 작품 정보를</H4>
        <H4>확인하고 있어요!</H4>
        <Caption>
          소장 인증이 완료되면{`\n`}컬렉터님께 알림으로 알려드릴게요!{`\n`}
          *영업일 기준 하루~5일 가량 소요됩니다
        </Caption>
        <Btn style={{ marginHorizontal: 16, marginBottom: 60 }}>
          <BtnText>네, 알겠어요!</BtnText>
        </Btn>
      </Container>
    );
  }

  return (
    <ErrorContainer>
      <ErrorMessage>업로드 또는 등록 중 오류가 발생했습니다.</ErrorMessage>
    </ErrorContainer>
  );
};

export default RegisterCompletion;

// Styled components
const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const SuccessContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const SuccessMessage = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
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
  color: red;
  text-align: center;
`;
