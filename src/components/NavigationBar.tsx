// src/components/NavigationBar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // 임시 아이콘 사용

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    height: 70, // 높이를 조정하여 원 버튼이 포함되도록 함
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 15, // 원 버튼을 네비게이션 바에 포함되도록 약간 위로 올림
    left: '50%',
    transform: [{ translateX: -35 }],
    zIndex: 1, // 버튼을 다른 요소 위에 표시
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
  const isExhibitScreen = state.routes[state.index].name === 'Exhibit';

  return (
    <>
      {!isExhibitScreen && (
        <>
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
          </View>
          <View style={styles.centerButtonContainer}>
            <TouchableOpacity
              style={styles.centerButtonWrapper}
              onPress={() => navigation.navigate('Exhibit')}
            >
              <Text style={styles.centerButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default NavigationBar;
