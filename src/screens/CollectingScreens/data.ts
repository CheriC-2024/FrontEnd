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
    uri: 'https://i.ibb.co/9y35bRf/4-image-5.jpg',
    width: 300,
    height: 150,
    name: 'Girl Alone',
    artist: '민지',
  },
  {
    id: 2,
    uri: 'https://i.ibb.co/f23y0Ss/8-image-1.jpg',
    width: 150,
    height: 150,
    name: '초원',
    artist: '미소',
  },
  {
    id: 3,
    uri: 'https://i.ibb.co/XbWbfJW/8-image-2.jpg',
    width: 150,
    height: 300,
    name: 'Ordinary Days',
    artist: '레미',
  },
  {
    id: 4,
    uri: 'https://i.ibb.co/FqY3dk3/8-image-3.jpg',
    width: 300,
    height: 300,
    name: '무음',
    artist: '혜경',
  },
  {
    id: 5,
    uri: 'https://i.ibb.co/sQb0Zv0/8-image-4.jpg',
    width: 300,
    height: 150,
    name: '현',
    artist: '민지',
  },
  {
    id: 6,
    uri: 'https://i.ibb.co/Y3mDZ9h/9-image-0.jpg',
    width: 200,
    height: 300,
    name: 'Forest Wonder',
    artist: '아린',
  },
  {
    id: 7,
    uri: 'https://i.ibb.co/g9KxdQL/9-image-1.jpg',
    width: 300,
    height: 400,
    name: 'Light',
    artist: '예림',
  },
  {
    id: 8,
    uri: 'https://i.ibb.co/rxnXKF4/9-image-2.jpg',
    width: 250,
    height: 150,
    name: '미로',
    artist: '김작가',
  },
  {
    id: 9,
    uri: 'https://i.ibb.co/0DXj42m/2-image-1.png',
    width: 150,
    height: 150,
    name: '누구에게',
    artist: '채리시',
  },
  {
    id: 10,
    uri: 'https://i.ibb.co/SrVkBNF/2-image-2.jpg',
    width: 400,
    height: 300,
    name: 'Adventure',
    artist: '예진',
  },
];

// 임시 컬렉션 데이터
export const collections = [
  {
    id: 1,
    name: '색채의 향연',
    description: '감각적인 색감으로 구성된 작품들을 모은 컬렉션입니다.',
    image: 'https://example.com/image1.png',
  },
  {
    id: 2,
    name: '추상과 현실',
    description: '추상미술과 현실을 조화롭게 담아낸 작품 모음.',
    image: 'https://example.com/image1.png',
  },
  {
    id: 3,
    name: '고요한 자연',
    description: '자연의 고요함을 담은 작품들을 감상해보세요.',
    image: 'https://example.com/image1.png',
  },
  {
    id: 4,
    name: '빛과 그림자',
    description: '빛과 그림자가 어우러진 독창적인 작품들로 구성된 컬렉션.',
    image: 'https://example.com/image1.png',
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
