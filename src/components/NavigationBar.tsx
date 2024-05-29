// src/components/NavigationBar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // 임시 아이콘 사용

const { width } = Dimensions.get('window');
const itemWidth = width / 5;

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navItem: {
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: width / 2 - 35, // 중앙에 배치하기 위해 너비의 절반에서 버튼의 절반을 뺍니다.
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ff6347',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10, // 안드로이드용 그림자
  },
  centerButtonText: {
    color: '#fff',
    fontSize: 32,
  },
});

const NavigationBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.navigationContainer}>
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
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={onPress}
          >
            <FontAwesome5
              name={
                route.name === 'Home'
                  ? 'home'
                  : route.name === 'Search'
                    ? 'search'
                    : route.name === 'Collecting'
                      ? 'th-large'
                      : route.name === 'My CheriC'
                        ? 'user'
                        : ''
              }
              size={24}
              color={isFocused ? '#ff6347' : '#222'}
            />
            <Text style={{ color: isFocused ? '#ff6347' : '#222' }}>
              {getLabel(route.name)}
            </Text>
          </TouchableOpacity>
        );
      })}

      <View style={styles.centerButtonContainer}>
        <TouchableOpacity
          style={styles.centerButtonWrapper}
          onPress={() => navigation.navigate('Exhibit')}
        >
          <Text style={styles.centerButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavigationBar;
