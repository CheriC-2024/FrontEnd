import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Artwork {
  artId: number;
  name: string;
  fileName: string;
  cherryNum: number | null;
  register: string;
}

interface Collection {
  collectionName: string;
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
  expandedCollections: {},
  filterText: '',
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
      state.expandedCollections = action.payload.reduce(
        (acc, collection) => {
          acc[collection.collectionName] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      );
    },
    toggleArtworkSelection: (state, action: PayloadAction<Artwork>) => {
      const artwork = action.payload;
      if (state.selectedArtworks.some((item) => item.artId === artwork.artId)) {
        state.selectedArtworks = state.selectedArtworks.filter(
          (item) => item.artId !== artwork.artId,
        );
      } else {
        state.selectedArtworks.push(artwork);
      }
    },
    toggleCollectionExpansion: (state, action: PayloadAction<string>) => {
      const collectionName = action.payload;
      state.expandedCollections[collectionName] =
        !state.expandedCollections[collectionName];
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    collapseAllCollections: (state) => {
      for (let key in state.expandedCollections) {
        state.expandedCollections[key] = false;
      }
    },
    expandAllCollections: (state) => {
      for (let key in state.expandedCollections) {
        state.expandedCollections[key] = true;
      }
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
