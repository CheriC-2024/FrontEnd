import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {
  HomeScreen,
  SearchScreen,
  CollectingScreen,
  MyCheriCScreen,
} from '../screens/_index';
import {
  NoticeIcon,
  HomeIcon,
  SearchIcon,
  CollectingIcon,
  MyChericIcon,
} from '../assets/icons/_index';
import ExhibitStack from './ExhibitStack';
import { CenterNavButton } from './UI/CenterNavButton';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<TabParamList>();

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // 알림 컴포넌트 자리
        }}
        style={{ marginRight: 16 }}
      >
        <NoticeIcon />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={() => ({
        headerTitle: 'CheriC',
        headerTitleAlign: 'center',
        headerRight: () => renderHeaderRight(),
        tabBarActiveTintColor: theme.colors.cherryRed_10,
        tabBarInactiveTintColor: theme.colors.redBlack,
        tabBarLabelStyle: { fontSize: 10, fontFamily: theme.fonts.regular },
        tabBarStyle: {
          height: 70, // 네비게이션 바의 높이
          paddingBottom: 12, // 바텀 패딩
          paddingTop: 12, // 탑 패딩
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <SearchIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: '검색',
        }}
      />
      <Tab.Screen
        name='Exhibit'
        component={ExhibitStack}
        options={{
          headerShown: false,
          tabBarButton: () => (
            // @ts-ignore
            <CenterNavButton onPress={() => navigation.navigate('Exhibit')} />
          ),
          tabBarStyle: { display: 'none' }, // TabBar 숨김
        }}
      />
      <Tab.Screen
        name='Collecting'
        component={CollectingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <CollectingIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: '컬렉팅',
        }}
      />
      <Tab.Screen
        name='MyCheriC'
        component={MyCheriCScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MyChericIcon stroke={color} fill={color} width={30} height={24} />
          ),
          tabBarLabel: '마이체리시',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
