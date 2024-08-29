import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Artwork {
  artist: string;
  artId: number;
  name: string;
  fileName: string;
  cherryNum: number | null;
  register: string;
}

interface ArtworkInfo {
  artworkDescription: string;
  artworkValue: string;
  artworkAppreciation: string;
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
  artworkInfoInput: ArtworkInfo[];
}

const initialState: ArtworkState = {
  collections: [],
  selectedArtworks: [],
  expandedCollections: {},
  filterText: '',
  totalCherries: 0,
  artworkInfoInput: [],
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
      state.expandedCollections = action.payload.reduce(
        (acc, collection) => {
          acc[collection.name] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      );
    },
    resetSelectedArtworks: (state) => {
      state.totalCherries = 0;
      state.selectedArtworks = [];
      state.artworkInfoInput = [];
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
        state.artworkInfoInput = state.artworkInfoInput.filter(
          (_, index) => state.selectedArtworks[index]?.artId !== artwork.artId,
        );
      } else {
        state.selectedArtworks.push(artwork);
        state.artworkInfoInput.push({
          artworkDescription: '',
          artworkValue: '',
          artworkAppreciation: '',
        });
      }

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
    updateArtworkInfoInput: (
      state,
      action: PayloadAction<{ index: number; field: string; value: string }>,
    ) => {
      const { index, field, value } = action.payload;
      if (state.artworkInfoInput[index]) {
        (state.artworkInfoInput[index] as any)[field] = value;
      }
    },
    setSelectedArtworks: (state, action: PayloadAction<Artwork[]>) => {
      state.selectedArtworks = action.payload;
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
  updateArtworkInfoInput,
  setSelectedArtworks,
} = artworkSlice.actions;

export default artworkSlice.reducer;
