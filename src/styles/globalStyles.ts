import createGlobalStyle from 'styled-components/native';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Thin.otf') format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-ExtraLight.otf') format('opentype');
    font-weight: 200;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Light.otf') format('opentype');
    font-weight: 300;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Regular.otf') format('opentype');
    font-weight: 400;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Medium.otf') format('opentype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-SemiBold.otf') format('opentype');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Bold.otf') format('opentype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-ExtraBold.otf') format('opentype');
    font-weight: 800;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/Pretendard/Pretendard-Black.otf') format('opentype');
    font-weight: 900;
  }

  :root {
    --color-CherryRed: #E52C32;
    --color-RedBlack: #120000;
    --color-BrownBlack: #413333;
    --color-Grey: #B0ABAB;
    --color-LightGrey: #F7F5F5;
    --font-main: 'Pretendard';
    --font--weight-thin: 100;
    --font--weight-extraLight: 200;
    --font--weight-light: 300;
    --font-weight-regular: 400;
    --font--weight-medium: 500;
    --font--weight-semiBold: 600;
    --font--weight-bold: 700;
    --font--weight-extraBold: 800;
    --font--weight-black: 900;
  }
  * {
    font-family: var(--font-main);
    font-weight: var(--font-weight-regular);
    color: var(--color-RedBlack);
  }
`;

export default GlobalStyle;
