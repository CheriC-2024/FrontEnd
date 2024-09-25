// 디자인 시스템
export const theme = {
  colors: {
    cherryRed_10: '#E52C32',
    cherryRed_8: '#EA464B',
    cherryRed_6: '#EF696D',
    cherryRed_4: '#FFC3C5',
    cherryRed_2: '#FFE3E4',
    redBlack: '#120000',
    grey_8: '#413333',
    grey_6: '#B0ABAB',
    grey_4: '#F7F5F5',
    white: '#FFFFFF',
    bg: '#FCFCFC',
    redBlack_alpha80: 'rgba(18, 0, 0, 0.8)',
    redBlack_alpha50: 'rgba(18, 0, 0, 0.5)',
    redBlack_alpha40: 'rgba(18, 0, 0, 0.4)',
    redBlack_alpha20: 'rgba(18, 0, 0, 0.2)',
    redBlack_alpha10: 'rgba(18, 0, 0, 0.1)',
    cherryRed_alpha80: 'rgba(229, 44, 50, 0.8)',
    cherryRed_alpha50: 'rgba(229, 44, 50, 0.5)',
    cherryRed_alpha40: 'rgba(229, 44, 50, 0.4)',
    cherryRed_alpha20: 'rgba(229, 44, 50, 0.2)',
    cherryRed_alpha10: 'rgba(229, 44, 50, 0.1)',
  },
  fonts: {
    regular: 'PretendardRegular',
    bold: 'PretendardBold',
  },
  fontSizes: {
    h1: '48px',
    h2: '40px',
    h3: '36px',
    h4: '24px',
    h5: '20px',
    h6: '18px',
    subtitle1: '16px',
    subtitle2: '14px',
    body1: '16px',
    body2: '14px',
    button: '14px',
    caption: '12px',
  },
  // lineHeight = fontSize * (lineHeight 비율 / 100)
  lineHeights: {
    h1: '60px',
    h2: '50px',
    h3: '45px',
    h4: '30px',
    h5: '25px',
    h6: '22px',
    subtitle1: '24px',
    subtitle2: '21px',
    body1: '28px',
    body2: '25px',
    button: '20px',
    caption: '16px',
  },
  spacing: {
    s1: '4px',
    s2: '8px',
    s3: '12px',
    s4: '16px',
    s5: '20px',
    s6: '24px',
    s7: '28px',
    s8: '32px',
    s9: '36px',
    s10: '40px',
    s11: '44px',
    s12: '48px',
  },
  radius: {
    xs: '8px',
    s: '16px',
    m: '24px',
    l: '32px',
  },
  padding: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
  },
  margin: {
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '40px',
    xxl: '80px',
  },
};

export type ThemeType = typeof theme;
