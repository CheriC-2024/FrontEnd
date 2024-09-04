import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface CollectionState {
  activeCollections: number[];
  filterText: string;
}

const initialState: CollectionState = {
  activeCollections: [],
  filterText: '',
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    selectCollection: (state, action: PayloadAction<number>) => {
      const { activeCollections } = state;
      const isSelected = activeCollections.includes(action.payload);

      state.activeCollections = isSelected
        ? activeCollections.filter((id) => id !== action.payload)
        : [...activeCollections, action.payload]; // 스프레드 연산자
    },
    clearSelectedCollections: (state) => {
      state.activeCollections = [];
    },
  },
});

export const { setFilterText, selectCollection, clearSelectedCollections } =
  collectionSlice.actions;

export default collectionSlice.reducer;
