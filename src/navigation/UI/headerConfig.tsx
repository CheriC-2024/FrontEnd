import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BackIcon } from 'src/assets/icons/_index';
import { Subtitle1 } from 'src/styles/typography';

interface HeaderConfigOptions {
  leftButtonType?: 'text' | 'icon' | 'both';
  iconColor?: string;
  headerTitleAlign?: 'left' | 'center';
  headerRightText?: string;
  headerTitle?: string;
  nextScreenName?: string;
  headerRightDisabled?: boolean;
  onHeaderRightPress?: () => void;
  leftButtonText?: string;
  headerBackgroundColor?: string; // 추가: 헤더 배경색
  headerTitleColor?: string; // 추가: 헤더 타이틀 텍스트 색상
}

const createHeaderLeft = (
  onPress: () => void,
  options: HeaderConfigOptions = {},
) => {
  const {
    leftButtonType = 'icon',
    iconColor = '#120000',
    leftButtonText = '이전',
  } = options;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 14 }}
    >
      {leftButtonType === 'icon' && (
        <BackIcon width={22} height={22} fill={iconColor} />
      )}
      {leftButtonType === 'text' && (
        <Subtitle1 style={{ color: iconColor }}>{leftButtonText}</Subtitle1>
      )}
      {leftButtonType === 'both' && (
        <>
          <BackIcon width={22} height={22} fill={iconColor} />
          <Subtitle1 style={{ color: iconColor, marginLeft: 8 }}>
            {leftButtonText}
          </Subtitle1>
        </>
      )}
    </TouchableOpacity>
  );
};

const createHeaderRight = (
  onPress: () => void,
  options: HeaderConfigOptions = {},
) => {
  const { iconColor = '#120000', headerRightDisabled = false } = options;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={headerRightDisabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        opacity: headerRightDisabled ? 0.5 : 1,
      }}
    >
      <Subtitle1 style={{ color: iconColor }}>
        {options.headerRightText}
      </Subtitle1>
    </TouchableOpacity>
  );
};

export const headerOptions = (
  navigation?: any,
  options: HeaderConfigOptions = {},
): StackNavigationOptions => ({
  headerShown: true,
  headerLeft: () => createHeaderLeft(() => navigation.goBack(), options),
  headerRight: options.headerRightText
    ? () =>
        createHeaderRight(() => {
          if (!options.headerRightDisabled && options.onHeaderRightPress) {
            options.onHeaderRightPress();
          } else if (!options.headerRightDisabled && options.nextScreenName) {
            navigation.navigate(options.nextScreenName);
          }
        }, options)
    : undefined,
  headerTitle: options.headerTitle || ' ',
  headerTitleAlign: options.headerTitleAlign,
  headerStyle: {
    backgroundColor: options.headerBackgroundColor || '#FCFCFC', // 헤더 배경색 설정
  },
  headerTitleStyle: {
    fontSize: 16,
    fontFamily: 'PretendardBold',
    color: options.headerTitleColor || options.iconColor, // 헤더 타이틀 색상 설정
  },
});
