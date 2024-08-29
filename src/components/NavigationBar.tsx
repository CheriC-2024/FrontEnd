import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import HomeIcon from '../assets/icons/nav-home.svg';
import SearchIcon from '../assets/icons/nav-search.svg';
import PlusIcon from '../assets/icons/nav-plus.svg';
import CollectingIcon from '../assets/icons/nav-collecting.svg';
import MyChericIcon from '../assets/icons/nav-mycheric.svg';
import { theme } from 'src/styles/theme';
import { Caption } from 'src/styles/typography';

const { width } = Dimensions.get('window');
const itemWidth = width / 5;

const NavigationContainer = styled.View`
  flex-direction: row;
  height: 70px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.grey_4};
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const NavItem = styled.TouchableOpacity`
  width: ${itemWidth}px;
  justify-content: center;
  align-items: center;
`;

const CenterButtonContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: ${width / 2 - 35}px;
  align-items: center;
  justify-content: center;
`;

const CenterButtonWrapper = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.cherryRed_10};
  justify-content: center;
  align-items: center;
  elevation: 10;
`;

const CenterButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
`;

const LabelText = styled(Caption)<{ isFocused: boolean }>`
  color: ${({ isFocused, theme }) =>
    isFocused ? theme.colors.cherryRed_10 : theme.colors.grey_8};
`;

const IconWrapper = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.s2};
`;

const NavigationBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const handleClick = () => {
    navigation.navigate('Exhibit', { step: 0 });
  };

  const activeRouteName = state.routeNames[state.index];

  const getIcon = (name: string, isFocused: boolean) => {
    const color = isFocused ? theme.colors.cherryRed_10 : theme.colors.redBlack;
    const size = 26;

    switch (name) {
      case 'Home':
        return <HomeIcon fill={color} width={size} height={size} />;
      case 'Search':
        return <SearchIcon fill={color} width={size} height={size} />;
      case 'Collecting':
        return <CollectingIcon fill={color} width={size} height={size} />;
      case 'My CheriC':
        return <MyChericIcon fill={color} width={40} height={size} />;
      default:
        return null;
    }
  };

  const getLabel = (name: string) => {
    switch (name) {
      case 'Home':
        return '홈';
      case 'Search':
        return '검색';
      case 'Exhibit':
        return '';
      case 'Collecting':
        return '컬렉팅';
      case 'My CheriC':
        return '마이체리시';
      default:
        return name;
    }
  };

  return (
    <NavigationContainer
      style={{ display: activeRouteName === 'Exhibit' ? 'none' : 'flex' }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <NavItem key={route.key} onPress={onPress}>
            <IconWrapper>{getIcon(route.name, isFocused)}</IconWrapper>
            <LabelText isFocused={isFocused}>{getLabel(route.name)}</LabelText>
          </NavItem>
        );
      })}

      <CenterButtonContainer>
        <CenterButtonWrapper onPress={handleClick}>
          <PlusIcon width={18} height={18} />
        </CenterButtonWrapper>
      </CenterButtonContainer>
    </NavigationContainer>
  );
};

export default NavigationBar;
