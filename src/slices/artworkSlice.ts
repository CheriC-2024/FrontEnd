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
}

const initialState: ArtworkState = {
  collections: [],
  selectedArtworks: [],
  expandedCollections: {}, // 초기화
  filterText: '',
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
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
  toggleArtworkSelection,
  toggleCollectionExpansion,
  setFilterText,
  collapseAllCollections,
  expandAllCollections,
} = artworkSlice.actions;

export default artworkSlice.reducer;
