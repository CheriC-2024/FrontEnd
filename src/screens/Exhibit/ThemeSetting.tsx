// 테마 설정 페이지 - 3단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface ThemeSettingProps {
  goToNext: () => void;
}

const ThemeSetting: React.FC = () => {
  return (
    <View>
      <Text>Theme Setting</Text>
    </View>
  );
};

export default ThemeSetting;
