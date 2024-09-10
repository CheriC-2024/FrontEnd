import { useState } from 'react';

const useCherryFinishModal = (
  userCherries: number, // 유저가 보유한 체리
  requiredCherries: number, // 필요한 체리
  onConfirmAction: () => void, // 확인 버튼 클릭 시 동작
) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: '',
    requiredCherries: 0,
    userCherries: 0,
    onConfirm: () => {},
  });

  const handleNext = () => {
    // 필요한 체리가 없을 때 바로 실행
    if (requiredCherries === 0) {
      onConfirmAction();
    } else if (userCherries >= requiredCherries) {
      // 보유 체리가 충분한 경우
      setModalProps({
        title: '마지막으로, 전시작품의 이용료를 결제할게요!',
        requiredCherries: requiredCherries,
        userCherries: userCherries,
        onConfirm: () => {
          setModalVisible(false);
          onConfirmAction(); // POST 요청 또는 그 외 처리
        },
      });
    } else {
      // 보유 체리가 부족한 경우
      setModalProps({
        title: '체리가 부족해요!',
        requiredCherries: requiredCherries,
        userCherries: userCherries,
        onConfirm: () => {
          setModalVisible(false);
          // 체리 구매 화면으로 이동하는 로직
        },
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

export default useCherryFinishModal;
