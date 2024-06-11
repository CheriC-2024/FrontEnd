import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface Collection {
  id: number;
  name: string;
  description: string;
  artworks: Artwork[];
}

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  imageUrl: any;
  isCollectorOnly: boolean;
  cherry: number | null; // null은 소장 작품일때
}

export interface ArtworkInfoInput {
  artworkDescription: string;
  artworkValue: string;
  artworkAppreciation: string;
}

interface GlobalState {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
  aiThemes: string[];
  setAIThemes: (themes: string[]) => void;
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
  selectedArtworks: number[];
  setSelectedArtworks: React.Dispatch<React.SetStateAction<number[]>>;
  userCherries: number;
  setUserCherries: (cherries: number) => void;
  artworkInfoInput: ArtworkInfoInput[];
  setArtworkInfoInput: React.Dispatch<React.SetStateAction<ArtworkInfoInput[]>>;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [aiThemes, setAIThemes] = useState<string[]>([
    'AI추천테마1',
    'AI추천테마2',
    'AI추천테마3',
    'AI추천테마4',
    'AI추천테마5',
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFont, setSelectedFont] = useState('기본 시스템 폰트');
  const [artworks, setArtworks] = useState<Artwork[]>([
    {
      id: 1,
      title: '아몬드 꽃',
      artist: '빈센트 반 고흐',
      imageUrl: require('../assets/picture1.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture1.jpg', // URI
      isCollectorOnly: false,
      cherry: 0,
    },
    {
      id: 2,
      title: '고양이',
      artist: '두번째 작가',
      imageUrl: require('../assets/picture2.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture2.jpg', // URI
      isCollectorOnly: true,
      cherry: null,
    },
    {
      id: 3,
      title: '세번째 작품',
      artist: '세번째 작가',
      imageUrl: require('../assets/picture3.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture3.jpg', // URI
      isCollectorOnly: true,
      cherry: null,
    },
    {
      id: 4,
      title: '별이 빛나는 밤',
      artist: '빈센트 반 고흐',
      imageUrl: require('../assets/picture4.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture4.jpg', // URI
      isCollectorOnly: false,
      cherry: 5,
    },
    {
      id: 5,
      title: 'Number 5',
      artist: '두번째 작가',
      imageUrl: require('../assets/picture5.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture5.jpg', // URI
      isCollectorOnly: false,
      cherry: 3,
    },
    {
      id: 6,
      title: '육',
      artist: '세번째 작가',
      imageUrl: require('../assets/picture6.jpg'), // Local require
      // imageUrl: 'https://example.com/assets/picture6.jpg', // URI
      isCollectorOnly: false,
      cherry: 6,
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
  ]);

  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<number[]>([]);
  const [userCherries, setUserCherries] = useState<number>(10);
  const [artworkInfoInput, setArtworkInfoInput] = useState<ArtworkInfoInput[]>(
    [],
  );

  useEffect(() => {
    setArtworkInfoInput(
      selectedArtworks.map(() => ({
        artworkDescription: '',
        artworkValue: '',
        artworkAppreciation: '',
      })),
    );
  }, [selectedArtworks]);

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
        collections,
        addCollection,
        removeCollection,
        selectedCollections,
        setSelectedCollections,
        selectedThemes,
        setSelectedThemes,
        aiThemes,
        setAIThemes,
        title,
        description,
        setTitle,
        setDescription,
        selectedFont,
        setSelectedFont,
        artworks,
        setArtworks,
        selectedArtworks,
        setSelectedArtworks,
        userCherries,
        setUserCherries,
        artworkInfoInput,
        setArtworkInfoInput,
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
