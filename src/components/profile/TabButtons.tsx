import React, { useEffect, useRef, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  LayoutChangeEvent,
} from 'react-native';
import styled from 'styled-components/native';

interface TabButtonsProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const [tabWidth, setTabWidth] = useState(0);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animationValue, {
      toValue: activeTab * tabWidth,
      speed: 20, // 속도
      bounciness: 10, // 반응력
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const calculatedTabWidth = width / tabs.length;
    setTabWidth(calculatedTabWidth);
    animationValue.setValue(activeTab * calculatedTabWidth); // 초기값 설정
  };

  return (
    <TabWrapper onLayout={handleLayout}>
      {tabs.map((tab, index) => (
        <TabButton
          key={index}
          onPress={() => onTabPress(index)}
          active={activeTab === index}
        >
          <TabButtonText active={activeTab === index}>{tab}</TabButtonText>
        </TabButton>
      ))}
      <AnimatedUnderline
        style={{
          width: tabWidth,
          transform: [
            {
              translateX: animationValue,
            },
          ],
        }}
      />
    </TabWrapper>
  );
};

export default TabButtons;

const TabWrapper = styled.View`
  flex-direction: row;
  position: relative;
  background-color: #fcfcfc;
`;

const TabButton = styled(TouchableOpacity)<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding: 12px 0;
`;

const TabButtonText = styled(Text)<{ active: boolean }>`
  color: ${({ active }) => (active ? '#120000' : '#B0ABAB')};
  font-family: ${({ active, theme }) =>
    active ? theme.fonts.bold : theme.fonts.regular};
`;

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.redBlack};
`;
