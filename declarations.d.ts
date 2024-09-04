declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

import 'styled-components';
import { ThemeType } from 'src/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
