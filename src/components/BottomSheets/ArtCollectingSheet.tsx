import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { Body2, ButtonText, H4, Subtitle2 } from 'src/styles/typography';
import styled from 'styled-components/native';

interface BottomSheetProps {
  onSelect: (mode: 'image' | 'artist' | 'both') => void;
  onClose: () => void;
  selectedOption: 'image' | 'artist' | 'both'; // 선택된 상태를 부모로부터 전달받음
}

const ArtCollectingSheet: React.FC<BottomSheetProps> = ({
  onSelect,
  onClose,
  selectedOption, // 부모로부터 선택된 옵션을 받음
}) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // 모달의 초기 위치를 설정 (화면 아래)

  useEffect(() => {
    // 모달이 나타날 때 애니메이션 시작
    Animated.timing(slideAnim, {
      toValue: 0, // 화면 위로 이동
      duration: 300, // 애니메이션 지속 시간 (밀리초)
      easing: Easing.out(Easing.ease), // 부드러운 애니메이션을 위한 이징 함수
      useNativeDriver: true,
    }).start();
  }, []);

  const animateClose = (callback?: () => void) => {
    // 모달이 사라질 때 애니메이션 실행
    Animated.timing(slideAnim, {
      toValue: 330, // 다시 화면 아래로 이동
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (callback) {
        callback();
      }
    });
  };

  const handleClose = () => {
    animateClose(() => {
      onClose(); // 애니메이션이 끝난 후 onClose 호출
    });
  };

  const handleSelect = (mode: 'image' | 'artist' | 'both') => {
    onSelect(mode); // 선택된 옵션을 즉시 부모에 전달
    // 선택된 상태가 화면에 반영되도록 잠시 기다린 후 애니메이션 시작
    setTimeout(() => {
      animateClose(() => {
        onClose(); // 애니메이션이 끝난 후 onClose 호출
      });
    }, 0); // 0 밀리초 딜레이로 다음 이벤트 루프로 넘김
  };

  return (
    <Modal transparent={true} animationType='none'>
      <TouchableWithoutFeedback onPress={handleClose}>
        <SheetContainer>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Animated.View
              style={{
                transform: [{ translateY: slideAnim }],
              }}
            >
              <SheetContent>
                <View style={{ marginLeft: 8 }}>
                  <SheetTitle>정보 필터 설정하기</SheetTitle>
                  <SheetDescription>
                    현재 보여지는 정보를 필터로 설정할 수 있어요!
                  </SheetDescription>
                </View>

                {/* 각 옵션 버튼의 배경색을 선택된 상태에 따라 변경 */}
                <OptionButton
                  selected={selectedOption === 'image'}
                  onPress={() => handleSelect('image')}
                >
                  <OptionText selected={selectedOption === 'image'}>
                    이미지만 보기
                  </OptionText>
                </OptionButton>

                <OptionButton
                  selected={selectedOption === 'artist'}
                  onPress={() => handleSelect('artist')}
                >
                  <OptionText selected={selectedOption === 'artist'}>
                    작가만 보기
                  </OptionText>
                </OptionButton>

                <OptionButton
                  selected={selectedOption === 'both'}
                  onPress={() => handleSelect('both')}
                >
                  <OptionText selected={selectedOption === 'both'}>
                    작가와 작품명까지 보기
                  </OptionText>
                </OptionButton>
              </SheetContent>
            </Animated.View>
          </TouchableWithoutFeedback>
        </SheetContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ArtCollectingSheet;

const SheetContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.redBlack_alpha50};
`;

const SheetContent = styled.View`
  background-color: white;
  padding: 20px;
  border-top-left-radius: ${({ theme }) => theme.radius.l};
  border-top-right-radius: ${({ theme }) => theme.radius.l};
  elevation: 5;
`;

const SheetTitle = styled(H4)`
  padding-top: 10px;
`;

const SheetDescription = styled(ButtonText)`
  padding-bottom: ${({ theme }) => theme.padding.l};
  color: ${({ theme }) => theme.colors.grey_8};
`;

const OptionButton = styled.TouchableOpacity<{ selected: boolean }>`
  width: 100%;
  padding: 15px 0;
  margin-bottom: ${({ theme }) => theme.margin.m};
  border-radius: ${({ theme }) => theme.radius.l};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.redBlack : theme.colors.grey_4};
`;

const OptionText = styled(Body2)<{ selected: boolean }>`
  text-align: center;
  color: ${({ selected }) => (selected ? '#fff' : '#B0ABAB')};
`;
