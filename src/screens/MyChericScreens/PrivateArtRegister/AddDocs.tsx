import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { PlusIcon } from 'src/assets/icons/_index';
import { ProgressBar, TitleSubtitle } from 'src/components/_index';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import { Container } from 'src/styles/layout';
import { Caption, H6, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

const AddDocs: React.FC = () => {
  const navigation = useNavigation();

  // 헤더 설정 -> 파일 업로드 구현시 연결
  useEffect(() => {
    // const isNextEnabled =
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'text',
        headerRightText: '완료',
        nextScreenName: 'RegisterCompletion',
        //headerRightDisabled: !isNextEnabled,
      }),
    );
  }, [navigation]);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar currentStep={3} totalSteps={3} />
        <TitleSubtitle
          titleLarge={'인증 서류를 등록해주세요'}
          subtitle={'CheriC가 정보를 확인한 후에 소장 작품으로 인증해드려요!'}
        />
        <LabelWrapper>
          <Subtitle2>작품 소장 인증 서류</Subtitle2>
          <RequireMark>*</RequireMark>
        </LabelWrapper>
        <UploadFileContainer>
          <PlusIcon fill={'#B0ABAB'} width={35} height={35} />
        </UploadFileContainer>
        <Title>작품 소장 인증 서류란?</Title>
        <DescriptionBox>
          <Description>
            작품을 소장하셨다는 사실을 확인할 수 있는 서류를 말해요! 아래 항목
            중 1개 이상을 첨부해주세요!
          </Description>
          <List>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>작품 보증서 (원본 혹은 사진)</ListItemText>
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>구매 계약서 (원본 혹은 사진)</ListItemText>
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>
                작품 구매 인증 증빙 자료: 영수증 등 (원본 혹은 사진)
              </ListItemText>
            </ListItem>
          </List>
        </DescriptionBox>

        <Title>소장 인증 시스템이란?</Title>
        <DescriptionBox>
          <List>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>
                CheriC에서는 컬렉터님의 소장 작품을 공식적으로 인증하기 위해,
                ‘소장 인증 시스템’을 시행하고 있습니다.
              </ListItemText>
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>
                CheriC에서 오프라인으로 직접 검수과정을 거친 후, 컬렉터님의 소장
                작품을 등록 완료해드립니다.
              </ListItemText>
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>
                따라서 소장 인증에 소요 기간은 영업일 기준 하루~5일 가량 소요될
                수 있습니다.
              </ListItemText>
            </ListItem>
            <ListItem>
              <Bullet>•</Bullet>
              <ListItemText>
                소장 인증이 완료되면 컬렉터님께 알림으로 알려드립니다!
              </ListItemText>
            </ListItem>
          </List>
        </DescriptionBox>
        <View style={{ height: 80 }} />
      </ScrollView>
    </Container>
  );
};

export default AddDocs;

const LabelWrapper = styled.View`
  flex-direction: row;
  margin: 24px 2px 4px 4px;
`;

const RequireMark = styled(Subtitle2)`
  color: ${({ theme }) => theme.colors.cherryRed_10};
`;

const UploadFileContainer = styled.TouchableOpacity`
  width: 100%;
  height: 180px;
  margin-bottom: 8px;
  background-color: #ebebeb;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(H6)`
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DescriptionBox = styled.View`
  padding: 24px 18px;
  border: 1.5px solid ${({ theme }) => theme.colors.grey_4 || '#ddd'};
  border-radius: 24px;
`;

const Description = styled(Caption)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey_8};
  line-height: 20px;
`;

const List = styled.View`
  margin-top: 4px;
  margin-left: 8px;
  margin-bottom: 8px;
`;

const ListItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const Bullet = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey_8};
  margin-right: 8px;
`;

const ListItemText = styled(Description)`
  flex: 1;
`;
