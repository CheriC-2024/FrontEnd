import { useRef, useEffect } from 'react';
import {
  Animated,
  ImageBackground,
  PanResponder,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Body1, ButtonText, Caption, Subtitle1 } from 'src/styles/typography';
import {
  CommentIcon,
  MenuIcon,
  ThumbsUpIcon,
  ThumbsUpIconFilled,
} from 'src/assets/icons/_index';
import { useCommentsList } from 'src/api/hooks/useExhibitQueries';

const ExhibitComments: React.FC = () => {
  const route = useRoute();
  const { exhibitId } = route.params || {}; // 전시 ID 가져오기
  const navigation = useNavigation();
  const {
    data: comments = [],
    isLoading,
    error,
  } = useCommentsList({
    exhibitId,
    page: 0,
    size: 10,
  });

  // 댓글 배열을 절반으로 나누기
  const middleIndex = Math.ceil(comments.length / 2); // 중간 인덱스 계산
  const firstRowComments = comments.slice(0, middleIndex); // 첫 절반
  const secondRowComments = comments.slice(middleIndex); // 나머지 절반

  const sensitivity = 0.1; // 민감도
  const movementLimit =
    180 * Math.max(firstRowComments.length, secondRowComments.length);
  const animationDuration = 10000; // 애니메이션 재생시간

  const row1Anim = useRef(new Animated.Value(10)).current;
  const row2Anim = useRef(new Animated.Value(-movementLimit + 200)).current; // 두번째 줄

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#120000',
        rightButtonType: 'text',
        headerRightText: '전시 나가기',
        onHeaderRightPress: () => {
          navigation.replace('Tabs', {
            screen: 'Home',
          });
        },
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  const animateRow1 = () => {
    Animated.loop(
      Animated.timing(row1Anim, {
        toValue: -movementLimit, // 좌측 이동
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ).start();
  };

  const animateRow2 = () => {
    Animated.loop(
      Animated.timing(row2Anim, {
        toValue: 0, // 우측 이동
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    animateRow1();
    animateRow2();
  }, []);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const panResponderRow1 = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      row1Anim.stopAnimation(); // 사용자 인터랙션 시 애니메이션 멈추기
    },
    onPanResponderMove: (event, gestureState) => {
      const newValue = row1Anim._value + gestureState.dx * sensitivity;
      row1Anim.setValue(clamp(newValue, -movementLimit, movementLimit));
    },
  });

  const panResponderRow2 = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      row2Anim.stopAnimation(); // 사용자 인터랙션 시 애니메이션 멈추기
    },
    onPanResponderMove: (event, gestureState) => {
      const newValue = row2Anim._value + gestureState.dx * sensitivity;
      row2Anim.setValue(clamp(newValue, -movementLimit, movementLimit));
    },
  });

  const handleCardPress = (commentId: string) => {
    const selectedComment = comments.find((c) => c.id === commentId);
    console.log(selectedComment.id);
    if (selectedComment) {
      navigation.navigate('ExhibitCommentsDetail', {
        exhibitId: exhibitId,
        commentId: selectedComment.id,
      });
    }
  };

  const handleAddCommentPress = () => {
    navigation.navigate('ExhibitCommentsWrite', { exhibitId: exhibitId });
  };

  return (
    <Container>
      <BackgroundCover
        source={{
          uri: 'https://i.ibb.co/yhqhcZ8/2-image-0.png',
        }}
        resizeMode='cover'
      />
      <Overlay />
      <TitleSubtitle
        titleLarge='전시는 즐거우셨나요?'
        subtitle='관람하신 컬렉션 전시에 대한 후기를 남겨주세요!'
        style={{ marginTop: 90, marginLeft: 16 }}
      />
      {isLoading && (
        <LoadingMessage>댓글을 불러오는 중입니다...</LoadingMessage>
      )}
      {error && <ErrorMessage>댓글을 불러오는 데 실패했습니다.</ErrorMessage>}
      {!isLoading && !error && (!comments || comments.length === 0) && (
        <EmptyMessage>
          아직 방명록이 없습니다.{`\n`}가장 첫번째로 남겨보세요!
        </EmptyMessage>
      )}
      {!isLoading && comments && comments.length > 0 && (
        <>
          <RowContainer {...panResponderRow1.panHandlers}>
            <AnimatedRow style={{ transform: [{ translateX: row1Anim }] }}>
              {firstRowComments.map((comment) => (
                <TouchableOpacity
                  key={comment.id}
                  onPress={() => handleCardPress(comment.id)}
                >
                  <CommentCard>
                    <TruncatedText numberOfLines={5} ellipsizeMode='tail'>
                      {comment.review}
                    </TruncatedText>
                    <CommentIconsContainer>
                      <IconWrapper>
                        <CommentIcon />
                        <IconText>{comment.replyCount}</IconText>
                      </IconWrapper>
                      <IconWrapper>
                        <View style={{ paddingBottom: 4 }}>
                          <ThumbsUpIcon />
                        </View>
                        <IconText>{comment.heartCount}</IconText>
                      </IconWrapper>
                      <IconWrapper style={{ marginLeft: 0 }}>
                        <MenuIcon fill={'#B0ABAB'} />
                      </IconWrapper>
                    </CommentIconsContainer>
                  </CommentCard>
                </TouchableOpacity>
              ))}
            </AnimatedRow>
          </RowContainer>
          <RowContainer {...panResponderRow2.panHandlers}>
            <AnimatedRow style={{ transform: [{ translateX: row2Anim }] }}>
              {secondRowComments.map((comment) => (
                <TouchableOpacity
                  key={comment.id}
                  onPress={() => handleCardPress(comment.id)}
                >
                  <CommentCard>
                    <TruncatedText numberOfLines={5} ellipsizeMode='tail'>
                      {comment.review}
                    </TruncatedText>
                    <CommentIconsContainer>
                      <IconWrapper>
                        <CommentIcon />
                        <IconText>{comment.replyCount}</IconText>
                      </IconWrapper>
                      <IconWrapper>
                        <View style={{ paddingBottom: 4 }}>
                          <ThumbsUpIcon />
                        </View>
                        <IconText>{comment.heartCount}</IconText>
                      </IconWrapper>
                      <IconWrapper style={{ marginLeft: 0 }}>
                        <MenuIcon fill={'#B0ABAB'} />
                      </IconWrapper>
                    </CommentIconsContainer>
                  </CommentCard>
                </TouchableOpacity>
              ))}
            </AnimatedRow>
          </RowContainer>
        </>
      )}
      <CharacterImage
        source={require('src/assets/images/Character/back.png')}
      />
      <FloatingButton onPress={handleAddCommentPress}>
        <GuestbookText>방명록 남기기</GuestbookText>
      </FloatingButton>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const BackgroundCover = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(252, 252, 252, 0.6);
`;

const RowContainer = styled.View`
  height: 200px;
  overflow: hidden;
  width: 100%;
  margin-top: 28px;
  padding: 0 28px;
`;

const AnimatedRow = styled(Animated.View)`
  flex-direction: row;
`;

const CommentCard = styled.View`
  width: 200px;
  height: 200px;
  margin: 0 14px;
  padding: 16px;
  background-color: white;
  justify-content: center;
  align-items: center;
  elevation: 3;
  position: relative;
`;

const CommentIconsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute; /* Position icons at the bottom */
  bottom: 16px; /* Adjust as needed for spacing */
  width: 110%; /* Adjust width to control icon spacing */
`;

const TruncatedText = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.redBlack};
  text-align: center; /* Center the text inside the card */
  margin-bottom: 24px; /* Add space between text and icons */
  line-height: 22px;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px; /* Add spacing between each icon group */
`;

const IconText = styled(Caption)`
  color: ${({ theme }) => theme.colors.grey_6}; /* Set text color */
  margin-left: 4px; /* Space between icon and number */
`;

const FloatingButton = styled.TouchableOpacity`
  align-items: center;
  position: absolute;
  bottom: 38px;
  right: 35%;
  padding: 8px 12px;
  border-radius: 24px;
  background-color: #fff;
`;

const GuestbookText = styled(Body1)`
  color: ${({ theme }) => theme.colors.redBlack};
`;

const CharacterImage = styled.Image`
  align-items: center;
  position: absolute;
  bottom: 84px;
  right: 33%;
  width: 118px;
  height: 146px;
`;

const EmptyMessage = styled(Subtitle1)`
  color: ${({ theme }) => theme.colors.redBlack};
  text-align: center;
  margin-top: 260px;
`;

const LoadingMessage = styled.Text`
  color: ${({ theme }) => theme.colors.grey_6};
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
`;

const ErrorMessage = styled.Text`
  color: ${({ theme }) => theme.colors.redBlack};
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
`;

export default ExhibitComments;
