import { useEffect } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';

const useImmersiveMode = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      // 상태바와 네비게이션 바 숨기기
      StatusBar.setHidden(true); // 상단 상태바 숨기기
      ImmersiveMode.setBarMode('BottomSticky'); // 상태바와 네비게이션 바 모두 숨김

      // 뒤로 가기 버튼 동작 제어
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return true; // 뒤로 가지 않음
        },
      );

      return () => {
        // 컴포넌트 언마운트 시 상태 복구
        StatusBar.setHidden(false); // 상단 상태바 복구
        ImmersiveMode.setBarMode('Normal'); // 네비게이션 바 복구
        backHandler.remove();
      };
    }
  }, [enabled]);
};

export default useImmersiveMode;
