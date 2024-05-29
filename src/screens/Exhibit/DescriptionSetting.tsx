// 전시 이름, 설명 입력 페이지 - 5단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface DescriptionSettingProps {
  goToNext: () => void;
}

const DescriptionSetting: React.FC = () => {
  return (
    <View>
      <Text>Description Setting</Text>
    </View>
  );
};

export default DescriptionSetting;
