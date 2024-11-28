// Artwork 인터페이스 (추후 작품 데이터 반환 시 사용)
export interface Artwork {
  artId: number;
  imgUrl: string;
  name: string;
  cherryPrice: number;
  cherryNum: number | null;
  collectorsArt: boolean | null;
  // TODO: 삭제 예정
  filePath?: string;
}

// Collection 인터페이스
export interface Collection {
  id: number;
  name: string;
  description: string;
  filePath?: string; // 이미지 파일 경로
  fileName: string; // 이미지 파일 이름
  artworks?: Artwork[]; // 컬렉션에 속한 작품들 (선택적 필드)
}

// 전시 컴포넌트
export interface Exhibition {
  exhibitionId: number; // 전시 ID
  name: string; // 전시 이름
  font: string; // 폰트 이름
  fontColor: string; // 폰트 색상
  colors: string[]; // 전시 색상 배열
  exhibitionBackgroundType: string; // 배경 타입
  coverImgUrl: string; // 커버 이미지 URL
  themes: string[]; // 전시 테마
  heartCount: number; // 좋아요 수
  hits: number; // 조회수
  userRes: UserRes;
}

export interface UserRes {
  id: number; // User ID
  userName: string;
  profileImgUrl: string;
}

// 전시 내용
export interface ArtExhibition {
  imgUrl: string;
  cherryPrice: number | null;
  name: string;
  artistName: string;
  series: string | null;
  horizontalSize: number;
  verticalSize: number;
  material: string | null;
  madeAt: string;
  artTypes: string[];
  ownArtRes: {
    price: number | null;
  };
  heartCount: number;
  collectorsArt: boolean;
}

export interface ExhibitionArt {
  description: string;
  reasonForPurchase: string;
  review: string;
  artExhibitionRes: ArtExhibition;
}

export interface UserRes {
  id: number;
  name: string;
  description: string;
  artTypes: string[];
  profileImgUrl: string;
}

export interface ExhibitionDetails {
  description: string;
  heartCount: number;
  hits: number;
  exhibitionArtRess: ExhibitionArt[];
  userRes: UserRes;
  exhibitionReviewRes: any; // You can refine this based on actual structure
}
