// 전시 커버 설정 페이지 - 6단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface CoverSettingProps {
  goToNext: () => void;
}

const CoverSetting: React.FC = () => {
  return (
    <View>
      <Text>Cover Setting</Text>
    </View>
  );
};

export default CoverSetting;
