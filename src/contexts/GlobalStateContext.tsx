import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

export interface Artwork {
  collectionId: any;
  fileName: any;
  name: ReactNode;
  cherryNum: null;
  artId: any;
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

interface FontData {
  label: string;
  value: string;
  fontFamily: string;
}

interface GlobalState {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
  aiThemes: string[];
  setAIThemes: (themes: string[]) => void;
  aiTitle: string[];
  setAITitle: (title: string[]) => void;
  exhibitTitle: string;
  exhibitDescription: string;
  setExhibitTitle: (title: string) => void;
  setExhibitDescription: (description: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fontData: FontData[];
  artworks: Artwork[];
  setArtworks: (artworks: Artwork[]) => void;
  selectedCollections: number[];
  setSelectedCollections: React.Dispatch<React.SetStateAction<number[]>>;
  selectedArtworks: Artwork[];
  setSelectedArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  userCherries: number;
  setUserCherries: (cherries: number) => void;
  artworkInfoInput: ArtworkInfoInput[];
  setArtworkInfoInput: React.Dispatch<React.SetStateAction<ArtworkInfoInput[]>>;
  ailabel: any[];
  setAILabel: (labels: any[]) => void; // 상태를 설정할 수 있도록 any[] 타입으로 변경
  aiThemeReason: string[];
  setAIThemeReason: (reasons: string[]) => void;
  aiTitleReason: string[];
  setAITitleReason: (reasons: string[]) => void;
  colorPalettes: string[][];
  setColorPalettes: React.Dispatch<React.SetStateAction<string[][]>>;
  coverColors: string[];
  setCoverColors: (colors: string[]) => void;
  selectedMusic: string[];
  setSelectedMusic: (music: string[]) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [aiThemes, setAIThemes] = useState<string[]>([]);
  const [aiThemeReason, setAIThemeReason] = useState<string[]>([]);
  const [aiTitle, setAITitle] = useState<string[]>([]);
  const [aiTitleReason, setAITitleReason] = useState<string[]>([]);
  const [exhibitTitle, setExhibitTitle] = useState('');
  const [exhibitDescription, setExhibitDescription] = useState('');
  const [selectedFont, setSelectedFont] = useState('기본 시스템 폰트');
  const [fontData] = useState<FontData[]>([
    {
      label: '기본 시스템 폰트',
      value: '기본 시스템 폰트',
      fontFamily: 'Regular',
    },
    { label: '검은고딕', value: 'BlackHanSans', fontFamily: 'BlackHanSans' },
    { label: '마포다카포', value: 'Mapo', fontFamily: 'Mapo' },
    { label: '산토끼', value: 'SanTokki', fontFamily: 'SanTokki' },
    { label: '롯데리아 찹땅겨', value: 'Lotteria', fontFamily: 'Lotteria' },
    // Add more fonts as needed
  ]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [userCherries, setUserCherries] = useState<number>(5);
  const [artworkInfoInput, setArtworkInfoInput] = useState<ArtworkInfoInput[]>(
    [],
  );
  const [ailabel, setAILabel] = useState<any[]>([]);
  const [colorPalettes, setColorPalettes] = useState<string[][]>([
    ['#dbdbdb', '#7a7a7a', '#929292', '#4e4e4e'],
  ]);
  const [coverColors, setCoverColors] = useState<string[]>([
    '#87CEFA',
    '#1E90FF',
  ]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([
    '아직 음악이 없습니다',
  ]);

  // 선택된 컬렉션 변경이 있을시 selectedArtworks 초기화
  useEffect(() => {
    setSelectedArtworks([]);
  }, [selectedCollections]);

  useEffect(() => {
    setArtworkInfoInput(
      selectedArtworks.map(() => ({
        artworkDescription: '',
        artworkValue: '',
        artworkAppreciation: '',
      })),
    );
  }, [selectedArtworks]);

  // ailabel 상태가 변경될 때마다 이를 콘솔에 출력
  useEffect(() => {
    console.log('Updated ailabel:', ailabel);
  }, [ailabel]);

  return (
    <GlobalStateContext.Provider
      value={{
        selectedCollections,
        setSelectedCollections,
        selectedThemes,
        setSelectedThemes,
        aiThemes,
        setAIThemes,
        exhibitTitle,
        exhibitDescription,
        setExhibitTitle,
        setExhibitDescription,
        selectedFont,
        setSelectedFont,
        fontData,
        artworks,
        setArtworks,
        selectedArtworks,
        setSelectedArtworks,
        userCherries,
        setUserCherries,
        artworkInfoInput,
        setArtworkInfoInput,
        ailabel,
        setAILabel,
        aiThemeReason,
        setAIThemeReason,
        aiTitle,
        setAITitle,
        aiTitleReason,
        setAITitleReason,
        colorPalettes,
        setColorPalettes,
        coverColors,
        setCoverColors,
        selectedMusic,
        setSelectedMusic,
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
