// 작품 정보 입력 페이지 - 4단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface ArtworkInfoSettingProps {
  goToNext: () => void;
}

const ArtworkInfoSetting: React.FC = () => {
  return (
    <View>
      <Text>Artwork Info Setting</Text>
    </View>
  );
};

export default ArtworkInfoSetting;
