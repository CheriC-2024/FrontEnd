// 전시에 올릴 작품 선택 페이지 - 2단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface ArtworkSelectProps {
  goToNext: () => void;
}

const ArtworkSelect: React.FC = () => {
  return (
    <View>
      <Text>Artwork Select</Text>
    </View>
  );
};

export default ArtworkSelect;
