import React from 'react';
import { View, Text, Button } from 'react-native';

interface FinishSettingProps {
  goToHome: () => void;
}

const FinishSetting: React.FC<FinishSettingProps> = ({ goToHome }) => {
  return (
    <View>
      <Text>Finish Setting</Text>
      <Button title="Go to Home" onPress={goToHome} />
    </View>
  );
};

export default FinishSetting;
