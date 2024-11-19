import { useRef, useEffect } from 'react';
import {
  Animated,
  ImageBackground,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { headerOptions } from 'src/navigation/UI/headerConfig';
import TitleSubtitle from 'src/components/TitleSubtitle';
import { Body1, ButtonText } from 'src/styles/typography';

const commentsRow1 = [
  '미술작품 보시는 센스가 돋보이는 전시였습니다. 잘봤습니다.',
  '미술작품 보시는 센스가 돋보이는 전시였습니다.',
  '전시 정말 재미있게 봤어요!',
];

const commentsRow2 = [
  '예술적 감각이 뛰어난 전시였습니다.',
  '정말 영감을 많이 받았어요!',
  '미술작품 감상하는 시간이 좋았습니다.',
];

const ExhibitComments: React.FC = () => {
  const row1Anim = useRef(new Animated.Value(0)).current;
  const row2Anim = useRef(new Animated.Value(-300)).current; // 두번째 줄

  const sensitivity = 0.1; // 민감도
  const movementLimit = 200; // 드래그 범위
  const animationDuration = 10000; // 애니메이션 재생시간
  const navigation = useNavigation();

  // 헤더 설정
  useEffect(() => {
    navigation.setOptions(
      headerOptions(navigation, {
        leftButtonType: 'icon',
        iconColor: '#120000',
        rightButtonType: 'text',
        headerRightText: '전시 나가기',
        onHeaderRightPress: () => void '',
        headerTransparent: true,
      }),
    );
  }, [navigation]);

  const animateRow1 = () => {
    Animated.loop(
      Animated.timing(row1Anim, {
        toValue: -300, // 좌측 이동
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

  // PanResponder for Row 2
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

  const handleCardPress = (comment: string) => {
    navigation.navigate('ExhibitCommentsDetail', { comment });
  };

  const handleAddCommentPress = () => {
    navigation.navigate('ExhibitCommentsWrite');
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
      <RowContainer {...panResponderRow1.panHandlers}>
        <AnimatedRow style={{ transform: [{ translateX: row1Anim }] }}>
          {commentsRow1.map((comment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(comment)}
            >
              <CommentCard>
                <CommentText>{comment}</CommentText>
              </CommentCard>
            </TouchableOpacity>
          ))}
        </AnimatedRow>
      </RowContainer>
      <RowContainer {...panResponderRow2.panHandlers}>
        <AnimatedRow style={{ transform: [{ translateX: row2Anim }] }}>
          {commentsRow2.map((comment, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(comment)}
            >
              <CommentCard>
                <CommentText>{comment}</CommentText>
              </CommentCard>
            </TouchableOpacity>
          ))}
        </AnimatedRow>
      </RowContainer>
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
  padding: 20px;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const CommentText = styled(ButtonText)`
  color: ${({ theme }) => theme.colors.redBlack};
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

export default ExhibitComments;
