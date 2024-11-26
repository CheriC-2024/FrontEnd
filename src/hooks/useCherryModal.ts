import { useState } from 'react';

const useCherryModal = (
  userCherries: number,
  selectedCherries: number,
  selectedArtworks: number,
  onAction: () => void,
) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const handleNext = () => {
    if (selectedCherries === 0) {
      onAction();
    } else if (userCherries >= selectedCherries) {
      setModalProps({
        title: `전시 완료 시점에 체리 ${selectedCherries}개가\n사용돼요!`,
        message: `선택하신 작품 중 ${selectedArtworks}점은, 작가님이 설정한\n갯수만큼 체리가 필요해요\n우리 작품의 저작권을 함께 지켜요!`,
        userCherries: userCherries,
        buttonText: '확인했어요!',
        onAction: () => {
          setModalVisible(false);
          onAction();
        },
      });
    } else {
      setModalProps({
        title: '앗 체리가 부족해요!',
        message: `선택하신 작품 중 ${selectedArtworks}점은 전시를 위해 체리 ${selectedCherries}개가 필요해요\n체리를 더 구매하셔야 될 것 같아요!`,
        userCherries: userCherries,
        buttonText: '체리 구매하기',
        onAction: () => {
          setModalVisible(false);
          // 체리 구매 화면으로 이동하는 로직을 추가할 수 있음
        },
        secondaryButtonText: '뒤로가기',
        onSecondaryAction: () => setModalVisible(false),
      });
    }
    setModalVisible(true);
  };

  return {
    isModalVisible,
    modalProps,
    setModalVisible,
    handleNext,
  };
};

export default useCherryModal;
