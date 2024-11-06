import { TouchableOpacity, Text, Animated } from 'react-native';
import styled from 'styled-components/native';

interface TabButtonsProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
  animationValue: Animated.Value;
}

const TabButtons: React.FC<TabButtonsProps> = ({
  tabs,
  activeTab,
  onTabPress,
  animationValue,
}) => (
  <TabWrapper>
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
        width: `${100 / tabs.length}%`,
        transform: [{ translateX: animationValue }],
      }}
    />
  </TabWrapper>
);

export default TabButtons;

const TabWrapper = styled.View`
  flex-direction: row;
  position: relative;
  background-color: #f7f5f5;
`;

const TabButton = styled(TouchableOpacity)<{ active: boolean }>`
  flex: 1;
  align-items: center;
  padding: 12px 0;
`;

const TabButtonText = styled(Text)<{ active: boolean }>`
  color: ${({ active }) => (active ? '#120000' : '#B0ABAB')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;

const AnimatedUnderline = styled(Animated.View)`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: black;
`;
