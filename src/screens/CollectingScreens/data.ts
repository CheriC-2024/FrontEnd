// 예시 이미지 데이터
export interface ArtCollectingProps {
  images: ImageItem[];
}
export interface ImageItem {
  id: number;
  uri: string;
  width: number;
  height: number;
  name: string;
  artist: string;
}

export const images: ImageItem[] = [
  {
    id: 1,
    uri: 'https://i.ibb.co/jzRhFfk/154-0-art-image.jpg',
    width: 1200,
    height: 950,
    name: 'Girl Alone',
    artist: '민지',
  },
  {
    id: 2,
    uri: 'https://i.ibb.co/2sPCwKQ/158-0-art-image.jpg',
    width: 150,
    height: 310,
    name: '초원',
    artist: '미소',
  },
  {
    id: 3,
    uri: 'https://i.ibb.co/qpj9kq8/161-0-art-image.jpg',
    width: 500,
    height: 500,
    name: 'Ordinary Days',
    artist: '레미',
  },
  {
    id: 434,
    uri: 'https://i.ibb.co/F0m2hBv/160-0-art-image.jpg',
    width: 300,
    height: 450,
    name: 'Canyon Roads',
    artist: '혹니',
  },
  {
    id: 5,
    uri: 'https://i.ibb.co/3NztYZS/165-0-art-image.jpg',
    width: 300,
    height: 150,
    name: '현',
    artist: '민지',
  },
  {
    id: 6,
    uri: 'https://i.ibb.co/bNPk1BZ/169-0-art-image.jpg',
    width: 200,
    height: 30,
    name: 'Forest Wonder',
    artist: '아린',
  },
  {
    id: 7,
    uri: 'https://i.ibb.co/r2mnjNx/170-0-art-image.jpg',
    width: 500,
    height: 460,
    name: 'Light',
    artist: '예림',
  },
  {
    id: 8,
    uri: 'https://i.ibb.co/89bKGQL/171-0-art-image.jpg',
    width: 450,
    height: 650,
    name: '미로',
    artist: '김작가',
  },
  {
    id: 9,
    uri: 'https://i.ibb.co/M8BCGz5/175-0-art-image.jpg',
    width: 150,
    height: 150,
    name: '누구에게',
    artist: '채리시',
  },
  {
    id: 10,
    uri: 'https://i.ibb.co/k1tvDv9/174-0-art-image.jpg',
    width: 400,
    height: 300,
    name: 'Adventure',
    artist: '예진',
  },

  {
    id: 11,
    uri: 'https://i.ibb.co/5jNJjWg/172-0-art-image.jpg',
    width: 500,
    height: 300,
    name: '아이원트',
    artist: '소얼',
  },
  {
    id: 12,
    uri: 'https://i.ibb.co/6bcYv2m/176-0-art-image.jpg',
    width: 400,
    height: 300,
    name: '아이원트',
    artist: '소얼',
  },
  {
    id: 13,
    uri: 'https://i.ibb.co/bW2BWZh/179-0-art-image.jpg',
    width: 400,
    height: 600,
    name: '아이원트',
    artist: '소얼',
  },
];

// 임시 컬렉션 데이터
export const collections = [
  {
    id: 1,
    name: '색채의 향연',
    description: '감각적인 색감으로 구성된 작품들을 모은 컬렉션입니다.',
    image: 'https://i.ibb.co/DpqnmcN/images-1.jpg',
  },
  {
    id: 2,
    name: '추상과 현실',
    description: '추상미술과 현실을 조화롭게 담아낸 작품 모음.',
    image: 'https://i.ibb.co/7pF9Bgz/img.jpg',
  },
  {
    id: 3,
    name: '고요한 자연',
    description: '자연의 고요함을 담은 작품들',
    image: 'https://i.ibb.co/8D4R9Rc/images-2.jpg',
  },
  {
    id: 4,
    name: '빛과 그림자',
    description: '빛과 그림자가 어우러진 독창적인 작품들로 구성된 컬렉션.',
    image: 'https://i.ibb.co/RvSMqZQ/006.jpg',
  },
  {
    id: 5,
    name: '시간의 흔적',
    description: '시간의 흐름과 변화가 녹아있는 작품들을 만나보세요.',
    image: 'https://example.com/image1.png',
  },
  {
    id: 6,
    name: '감성의 울림',
    description: '감성적인 주제를 중심으로 선별된 작품 모음입니다.',
    image: 'https://example.com/image1.png',
  },
];
