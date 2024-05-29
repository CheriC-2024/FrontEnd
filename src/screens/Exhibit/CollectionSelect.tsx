//컬렉션 선택 페이지 - 1단계
import React from 'react';
import { View, Text, Button } from 'react-native';

interface CollectionSelectProps {
  goToNext: () => void;
}

const CollectionSelect: React.FC = () => {
  return (
    <View>
      <Text>Collection Select</Text>
    </View>
  );
};

export default CollectionSelect;
