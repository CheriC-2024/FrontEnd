import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Artwork {
  artId: number;
  name: string;
  fileName: string;
  cherryNum: number | null;
  register: string;
}

interface Collection {
  id: number;
  name: string;
  description: string;
  filePath: string;
  fileName: string;
  artList: Artwork[];
}

interface ArtworkState {
  collections: Collection[];
  selectedArtworks: Artwork[];
  expandedCollections: { [key: string]: boolean };
  filterText: string;
  totalCherries: number;
}

const initialState: ArtworkState = {
  collections: [],
  selectedArtworks: [],
  expandedCollections: {}, // 초기화
  filterText: '',
  totalCherries: 0,
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      // ##FIX## 수정
      state.collections = action.payload;
      // 컬렉션이 추가될 때 expandedCollections를 초기화
      state.expandedCollections = action.payload.reduce(
        (acc, collection) => {
          acc[collection.name] = true;
          return acc;
        },
        {} as { [key: string]: boolean }, // 타입 지정
      );
    },
    resetSelectedArtworks: (state) => {
      // 선택된 작품이 초기화될 때 totalCherries도 초기화
      state.totalCherries = 0;
    },
    toggleArtworkSelection: (state, action: PayloadAction<Artwork>) => {
      const artwork = action.payload;
      const isSelected = state.selectedArtworks.some(
        (item) => item.artId === artwork.artId,
      );
      if (isSelected) {
        state.selectedArtworks = state.selectedArtworks.filter(
          (item) => item.artId !== artwork.artId,
        );
      } else {
        state.selectedArtworks.push(artwork);
      }
      // selectedArtworks 변경에 따라 totalCherries 값도 업데이트
      state.totalCherries = state.selectedArtworks.reduce(
        (sum, item) => sum + (item.cherryNum || 0),
        0,
      );
    },
    toggleCollectionExpansion: (state, action: PayloadAction<string>) => {
      const name = action.payload;
      state.expandedCollections[name] = !state.expandedCollections[name];
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    collapseAllCollections: (state) => {
      Object.keys(state.expandedCollections).forEach(
        (key) => (state.expandedCollections[key] = false),
      );
    },
    expandAllCollections: (state) => {
      Object.keys(state.expandedCollections).forEach(
        (key) => (state.expandedCollections[key] = true),
      );
    },
  },
});

export const {
  setCollections,
  resetSelectedArtworks,
  toggleArtworkSelection,
  toggleCollectionExpansion,
  setFilterText,
  collapseAllCollections,
  expandAllCollections,
} = artworkSlice.actions;

export default artworkSlice.reducer;
