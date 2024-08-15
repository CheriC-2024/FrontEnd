import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Collection {
  id: number;
  name: string;
  description: string;
  filePath: string;
  fileName: string;
}

interface CollectionState {
  collections: Collection[];
  selectedCollections: number[];
  filterText: string;
}

const initialState: CollectionState = {
  collections: [],
  selectedCollections: [],
  filterText: '',
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
    toggleCollectionSelection: (state, action: PayloadAction<number>) => {
      if (state.selectedCollections.includes(action.payload)) {
        state.selectedCollections = state.selectedCollections.filter(
          (id) => id !== action.payload,
        );
      } else {
        state.selectedCollections.push(action.payload);
      }
    },
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    clearSelectedCollections: (state) => {
      state.selectedCollections = [];
    },
  },
});

export const { setCollections, toggleCollectionSelection, setFilterText } =
  collectionSlice.actions;

export default collectionSlice.reducer;
