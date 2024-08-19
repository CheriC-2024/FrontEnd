import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCollectionsByUser } from '../api/collectionApi';

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
  loading: boolean;
  error: string | null;
}

const initialState: CollectionState = {
  collections: [],
  selectedCollections: [],
  filterText: '',
  loading: false,
  error: null,
};

// Thunk: 비동기 데이터 로드 처리
export const loadCollections = createAsyncThunk(
  'collection/fetchCollectionsByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetchCollectionsByUser(userId);
      // 컬렉션이 없을 때도 정상적으로 처리
      if (!response.collections || response.collections.length === 0) {
        // 빈 배열을 반환하여 fulfilled 상태로 전환
        return [];
      }
      return response.collections; // API로부터 받아온 컬렉션 데이터
    } catch (error) {
      return rejectWithValue('Failed to load collections');
    }
  },
);

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setFilterText: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
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
    clearSelectedCollections: (state) => {
      state.selectedCollections = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCollections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload;
      })
      .addCase(loadCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilterText,
  toggleCollectionSelection,
  clearSelectedCollections,
} = collectionSlice.actions;

export default collectionSlice.reducer;
