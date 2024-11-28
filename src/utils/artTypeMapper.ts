export const artTypeMapping: Record<string, string> = {
  WATER_PAINTING: '수채화',
  OIL_PAINTING: '유화',
  NEW_MEDIA_ART: '뉴미디어',
  ORIENTAL_PAINTING: '동양화',
  DRAWING_ART: '드로잉',
  DESIGN_ART: '디자인',
  PRINTMAKING_PAINTING: '판화',
  PAINTING: '회화',
};

export const mapArtTypes = (types: string[]): string[] => {
  return types.map((type) => artTypeMapping[type] || type);
};

// 한글 -> 영어
export const reverseArtTypeMapping: Record<string, string> = Object.fromEntries(
  Object.entries(artTypeMapping).map(([key, value]) => [value, key]),
);

export const mapArtTypesReverse = (types: string[]): string[] => {
  return types.map((type) => reverseArtTypeMapping[type] || type);
};
