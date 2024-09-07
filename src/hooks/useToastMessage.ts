import { useState } from 'react';

const useToastMessage = (initialMessage: string = '') => {
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>(initialMessage);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  return { toastVisible, toastMessage, showToast };
};

export default useToastMessage;
