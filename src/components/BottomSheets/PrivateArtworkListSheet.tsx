import React from 'react';
import { Modal, View, TouchableWithoutFeedback, Animated } from 'react-native';
import { Body2, ButtonText, H4 } from 'src/styles/typography';
import styled from 'styled-components/native';
import useSlideAnimation from 'src/hooks/useSlideAnimation';

interface BottomSheetProps {
  onSelect: (mode: 'image' | 'collector' | 'both') => void;
  onClose: () => void;
  selectedOption: 'image' | 'collector' | 'both';
}

const PrivateArtworkListSheet: React.FC<BottomSheetProps> = ({
  onSelect,
  onClose,
  selectedOption,
}) => {
  const { slideAnim, slideOut } = useSlideAnimation();

  const handleClose = () => slideOut(onClose);

  const handleSelect = (mode: 'image' | 'collector' | 'both') => {
    onSelect(mode);
    slideOut(onClose);
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

                <OptionButton
                  selected={selectedOption === 'image'}
                  onPress={() => handleSelect('image')}
                >
                  <OptionText selected={selectedOption === 'image'}>
                    이미지만 보기
                  </OptionText>
                </OptionButton>
                <OptionButton
                  selected={selectedOption === 'collector'}
                  onPress={() => handleSelect('collector')}
                >
                  <OptionText selected={selectedOption === 'collector'}>
                    컬렉터만 보기
                  </OptionText>
                </OptionButton>
                <OptionButton
                  selected={selectedOption === 'both'}
                  onPress={() => handleSelect('both')}
                >
                  <OptionText selected={selectedOption === 'both'}>
                    컬렉터와 작품명까지 보기
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

export default PrivateArtworkListSheet;

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
