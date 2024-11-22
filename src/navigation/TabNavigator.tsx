import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
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
  SettingIcon,
} from '../assets/icons/_index';
import ExhibitStack from './ExhibitStack';
import { CenterNavButton } from './UI/CenterNavButton';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<TabParamList>();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: '',
        headerTitleAlign: 'left',
        headerRight: () =>
          route.name === 'MyCheric' ? (
            <TouchableOpacity
              onPress={() => {
                // 설정 버튼
              }}
              style={{ marginRight: 16 }}
            >
              <SettingIcon fill={'#120000'} width={22} height={22} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                // 알림 버튼
              }}
              style={{ marginRight: 16 }}
            >
              <NoticeIcon />
            </TouchableOpacity>
          ),
        headerStyle: { backgroundColor: theme.colors.bg },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: theme.fonts.bold,
        },
        tabBarActiveTintColor: theme.colors.cherryRed_10,
        tabBarInactiveTintColor: theme.colors.redBlack,
        tabBarLabelStyle: { fontSize: 10, fontFamily: theme.fonts.regular },
        tabBarStyle: {
          height: 86,
          paddingBottom: 20,
          paddingTop: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
      })}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTransparent: true,
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
        name='MyCheric'
        component={MyCheriCScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MyChericIcon stroke={color} fill={color} width={32} height={28} />
          ),
          tabBarLabel: '마이체리시',
        }}
      />
    </Tab.Navigator>
  );
};

const HeaderButton = styled.TouchableOpacity`
  padding: 8px;
  margin-right: 16px;
`;

export default TabNavigator;
