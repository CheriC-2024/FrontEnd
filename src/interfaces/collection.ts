// TODO api 구조 픽스되면 변경 예정

// Artwork 인터페이스 (추후 작품 데이터 반환 시 사용)
export interface Artwork {
  artId: number;
  name: string;
  register: 'COLLECTOR' | 'ARTIST' | 'ADMIN';
  cherryNum: number;
  filePath?: string;
  fileName: string;
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
