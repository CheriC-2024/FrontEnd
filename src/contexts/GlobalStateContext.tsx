import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  imageUrl: any; // Replace with appropriate type if necessary
  isCollectorOnly: boolean;
}

export interface Collection {
  id: number;
  name: string;
  description: string;
  artworks: Artwork[];
}

interface GlobalState {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  collections: Collection[];
  addCollection: (collection: Collection) => void;
  removeCollection: (collectionId: number) => void;
  selectedCollections: number[];
  setSelectedCollections: React.Dispatch<React.SetStateAction<number[]>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFont, setSelectedFont] = useState('기본 시스템 폰트');
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: 1,
      title: '아몬드 꽃',
      artist: '빈센트 반 고흐',
      imageUrl: require('../assets/picture1.jpg'),
      isCollectorOnly: false,
    },
    {
      id: 2,
      title: '고양이',
      artist: '두번째 작가',
      imageUrl: require('../assets/picture2.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 3,
      title: '세번째 작품',
      artist: '세번째 작가',
      imageUrl: require('../assets/picture3.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 4,
      title: '아몬드 꽃',
      artist: '빈센트 반 고흐',
      imageUrl: require('../assets/picture4.jpg'),
      isCollectorOnly: false,
    },
    {
      id: 5,
      title: 'Number 5',
      artist: '두번째 작가',
      imageUrl: require('../assets/picture5.jpg'),
      isCollectorOnly: true,
    },
    {
      id: 6,
      title: '육',
      artist: '세번째 작가',
      imageUrl: require('../assets/picture6.jpg'),
      isCollectorOnly: true,
    },
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    {
      id: 1,
      name: '인상파 작품 모음',
      description: '인상파 화가들의 작품을 모았습니다.',
      artworks: [artworks[0], artworks[3]],
    },
    {
      id: 2,
      name: '고양이 그림 모음',
      description:
        '다양한 고양이 그림을 감상해보세요. 다양한 고양이 그림을 감상해보세요. 다양한 고양이 그림을 감상해보세요.다양한 고양이 그림을 감상해보세요.다양한 고양이 그림을 감상해보세요.다양한 고양이 그림을 감상해보세요.',
      artworks: [artworks[1]],
    },
    {
      id: 3,
      name: '추상화 작품 모음',
      description: '추상화 작품들을 모아놓은 컬렉션입니다.',
      artworks: [artworks[2], artworks[4], artworks[5]],
    },
    {
      id: 4,
      name: '인상파 작품 모음2',
      description: '인상파 화가들의 작품을 모았습니다.',
      artworks: [artworks[0], artworks[3]],
    },
    {
      id: 5,
      name: '고양이 그림 모음2',
      description: '다양한 고양이 그림을 감상해보세요.',
      artworks: [artworks[1]],
    },
    {
      id: 6,
      name: '추상화 작품 모음2',
      description: '추상화 작품들을 모아놓은 컬렉션입니다.',
      artworks: [artworks[2], artworks[4], artworks[5]],
    },
    // 추가 컬렉션 데이터를 여기에 추가
  ]);

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

  const addCollection = (collection: Collection) => {
    setCollections((prev) => [...prev, collection]);
  };

  const removeCollection = (collectionId: number) => {
    setCollections((prev) =>
      prev.filter((collection) => collection.id !== collectionId),
    );
  };

  return (
    <GlobalStateContext.Provider
      value={{
        // CollectionSelect page -> 선택한 컬렉션 저장
        collections,
        addCollection,
        removeCollection,
        selectedCollections,
        setSelectedCollections,
        // ThemeSetting page -> 테마 3개 저장
        selectedThemes,
        setSelectedThemes,
        // DescriptionSetting page -> 전시명과 설명 저장
        title,
        description,
        setTitle,
        setDescription,
        // Font selection
        selectedFont,
        setSelectedFont,
        artworks,
        setArtworks,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
