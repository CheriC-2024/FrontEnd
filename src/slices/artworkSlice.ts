import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artwork } from 'src/interfaces/collection';

interface ArtworkInfo {
  artworkDescription: string;
  artworkValue: string;
  artworkAppreciation: string;
}

interface ArtworkState {
  selectedArtworks: Artwork[];
  expandedCollections: { [key: string]: boolean };
  filterText: string;
  totalCherries: number;
  artworkInfoInput: ArtworkInfo[];
}

const initialState: ArtworkState = {
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
    // 모든 컬렉션 목록 열기
    expandAllCollections: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach((collectionId) => {
        state.expandedCollections[collectionId] = true;
      });
    },
    resetSelectedArtworks: (state) => {
      state.totalCherries = 0;
      state.selectedArtworks = [];
      state.artworkInfoInput = [];
    },
    toggleArtworkSelection: (state, action: PayloadAction<Artwork>) => {
      const artwork = action.payload;

      // 이미 선택된 작품인지 확인 (모든 컬렉션을 포함하여 확인)
      const existingIndex = state.selectedArtworks.findIndex(
        (item) => item.artId === artwork.artId,
      );

      console.log('Toggling artwork:', artwork);
      console.log('Existing index:', existingIndex);

      if (existingIndex >= 0) {
        // If already selected, remove the artwork from both selectedArtworks and artworkInfoInput
        state.selectedArtworks.splice(existingIndex, 1);
        state.artworkInfoInput.splice(existingIndex, 1);
      } else {
        // If not selected, add the artwork and its corresponding info
        state.selectedArtworks.push(artwork);
        state.artworkInfoInput.push({
          artworkDescription: '',
          artworkValue: '',
          artworkAppreciation: '',
        });
      }

      // 총 체리 갯수 업데이트
      state.totalCherries = state.selectedArtworks.reduce(
        (sum, item) => sum + (item.cherryPrice !== null ? item.cherryPrice : 0),
        0,
      );

      console.log('Updated selected artworks:', state.selectedArtworks);
      console.log('Updated total cherries:', state.totalCherries);
    },
    toggleCollectionExpansion: (state, action: PayloadAction<number>) => {
      const collectionId = action.payload; // collectionId 사용
      state.expandedCollections[collectionId] =
        !state.expandedCollections[collectionId];
    },
    collapseAllCollections: (state) => {
      Object.keys(state.expandedCollections).forEach(
        (key) => (state.expandedCollections[key] = false),
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
  resetSelectedArtworks,
  toggleArtworkSelection,
  toggleCollectionExpansion,
  collapseAllCollections,
  expandAllCollections,
  updateArtworkInfoInput,
  setSelectedArtworks,
} = artworkSlice.actions;

export default artworkSlice.reducer;
