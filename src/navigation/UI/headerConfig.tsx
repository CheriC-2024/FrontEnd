import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { BackIcon } from 'src/assets/icons/_index';
import { Subtitle1 } from 'src/styles/typography';

interface HeaderConfigOptions {
  buttonType?: 'text' | 'icon';
  iconColor?: string;
  headerTitleAlign?: 'left' | 'center';
  headerRightText?: string;
  headerTitle?: string;
  nextScreenName?: string;
  headerRightDisabled?: boolean;
  onHeaderRightPress?: () => void; // 헤더 오른쪽 버튼 커스텀 동작
}

const createHeaderLeft = (
  onPress: () => void,
  options: HeaderConfigOptions = {},
) => {
  const { buttonType = 'icon', iconColor = '#120000' } = options;

  return () => (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 14 }}
    >
      {buttonType === 'icon' ? (
        <BackIcon width={22} height={22} fill={iconColor} />
      ) : (
        <Subtitle1 style={{ color: iconColor }}>이전</Subtitle1>
      )}
    </TouchableOpacity>
  );
};

const createHeaderRight = (
  onPress: () => void,
  options: HeaderConfigOptions = {},
) => {
  const { iconColor = '#120000', headerRightDisabled = false } = options;

  return () => (
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
  navigation: any,
  options: HeaderConfigOptions = {},
): StackNavigationOptions => ({
  headerTitle: options.headerTitle || ' ',
  headerLeft: createHeaderLeft(() => navigation.goBack(), options),
  headerRight: options.headerRightText
    ? createHeaderRight(() => {
        if (!options.headerRightDisabled && options.onHeaderRightPress) {
          // 커스텀 onPress가 있으면 실행
          options.onHeaderRightPress();
        } else if (!options.headerRightDisabled && options.nextScreenName) {
          // 기본적으로 다음 화면으로 이동
          navigation.navigate(options.nextScreenName);
        }
      }, options)
    : undefined,
  headerTitleAlign: options.headerTitleAlign || 'center',
});
