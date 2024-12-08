const fontData = [
  {
    label: '기본 시스템 폰트',
    value: 'BASIC',
    fontFamily: 'PretendardRegular',
  },
  { label: '검은고딕', value: 'BLACK_HAN_SANS', fontFamily: 'BlackHanSans' },
  { label: '마포다카포', value: 'MAPODACAPO', fontFamily: 'Mapo' },
  { label: '산토끼', value: 'HS_SANTOKKI', fontFamily: 'SanTokki' },
  { label: '롯데리아 찹땅겨', value: 'LOTTERIA_CHAB', fontFamily: 'Lotteria' },
];

export const getFontFamilyByValue = (value: string): string => {
  const fontItem = fontData.find((item) => item.value === value);
  return fontItem ? fontItem.fontFamily : 'PretendardRegular'; // 기본값 설정
};
