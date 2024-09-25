import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { PlusIcon } from '../../assets/icons/_index.js';

export const CenterNavButton = ({ onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -5, // 탭 바 위로 떠오르게 설정
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 56,
        marginHorizontal: 10,
        borderRadius: 30,
        backgroundColor: theme.colors.cherryRed_10,
        elevation: 4,
      }}
    >
      <PlusIcon width={20} height={16} />
    </TouchableOpacity>
  );
};
