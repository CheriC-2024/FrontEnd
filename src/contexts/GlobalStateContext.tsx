import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  imageUrl: any; // Replace with appropriate type if necessary
  isCollectorOnly: boolean;
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

  return (
    <GlobalStateContext.Provider
      value={{
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
