import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CloudVisionLabel } from 'src/interfaces/aiRecommend';

interface AIRecommendState {
  aiLabel: string[];
  aiThemes: string[];
  aiThemeReason: string[];
  aiTitles: string[];
  aiTitleReason: string[];
  cloudVisionLabels: CloudVisionLabel[];
  prevSelectedArt: number[];
}

const initialState: AIRecommendState = {
  aiLabel: [],
  // TODO: 시연용 데이터 추가하기
  aiThemes: ['자연적인', '다채로운', '레트로적인', '색다른', '꿈같은'],
  aiThemeReason: [
    '자연은 모든 예술의 원천으로, 작품 속에서 생명과 조화를 담은 자연적 요소를 강조하여 인간 본연의 감각과 연결하려는 시도를 반영합니다. 숲, 물, 하늘 등 자연의 풍경을 통해 마음을 치유하고 편안함을 주는 미학적 경험을 제공합니다.',
    '다양한 색채와 요소의 조화는 관람객에게 시각적으로 즐거운 몰입감을 주며, 동시에 각 작품이 가진 독특한 매력을 돋보이게 합니다. 여러 문화와 스타일의 융합을 통해 단조롭지 않은 풍성함을 표현하며, 새로운 창의적 가능성을 탐구합니다.',
    '과거의 감성과 현대적 해석이 조화된 레트로적 요소는 향수와 새로움을 동시에 불러일으킵니다. 복고풍의 디자인과 색감은 관람객에게 친숙하면서도 신선한 경험을 제공합니다.',
    '기존의 전시와는 다른 참신하고 독창적인 시도를 통해 예술적 새로움을 제시합니다. 예상치 못한 형태와 주제를 다룸으로써 관람객의 호기심을 자극하고 새로운 시각적 세계를 열어줍니다.',
    '현실과 비현실의 경계를 넘나드는 초현실적이고 몽환적인 분위기를 통해 관람객에게 독특한 심리적 여운을 남깁니다. 꿈에서 본 듯한 장면들을 재현하거나 상상력을 자극하여 감정적으로 깊이 있는 경험을 선사합니다.',
  ],
  aiTitles: [
    '자연의 속삭임',
    '색채의 교향곡',
    '시간 여행: 기억의 조각들',
    '경계를 넘는 상상',
    '꿈결 속 풍경',
  ],
  aiTitleReason: [
    '자연의 소리와 색, 질감을 작품에 녹여내어 인간과 자연의 조화로운 관계를 표현합니다. 숲, 물결, 하늘 등 자연 요소를 통해 평온함과 경외심을 동시에 느끼게 합니다. 관람객은 작품을 통해 자연의 숨결을 직접 느끼며, 자연이 전달하는 메시지를 경험하게 됩니다.',
    '다채로운 색감을 중심으로 한 전시로, 색채와 감정의 상호작용을 탐구합니다. 관람객에게 색의 리듬과 멜로디를 시각적으로 들려줍니다. 색과 빛의 조화가 음악적 영감을 떠올리게 하며, 시각과 감정의 융합으로 독특한 예술적 경험을 선사합니다.',
    '레트로적 디자인과 과거의 상징적 요소를 재해석하여 기억과 향수를 불러일으키는 전시입니다. 현대적 감각과 복고적 매력을 조화롭게 융합합니다. 관람객이 과거와 현재를 연결하며, 각자의 기억 속 풍경을 떠올릴 수 있는 감성적 경험을 제공합니다.',
    '색다른 시도를 통해 기존의 틀을 벗어난 창의적인 작품을 선보입니다. 예상치 못한 소재와 표현 방식이 관람객의 호기심을 자극합니다. 독창적이고 혁신적인 작품들로 구성된 전시는 관람객에게 예술의 새로운 가능성을 탐구하도록 영감을 줍니다.',
    '몽환적이고 초현실적인 분위기를 통해 현실과 상상을 넘나드는 경험을 제공합니다. 작품은 마치 꿈속 장면처럼 신비롭고 감각적인 연출을 담고 있습니다. 관람객은 현실에서 벗어나 자유롭게 상상의 나래를 펼치며 꿈결 속 여행을 떠나는 듯한 몰입감을 느낄 수 있습니다.',
  ],
  cloudVisionLabels: [],
  prevSelectedArt: [],
};

const aiRecommendSlice = createSlice({
  name: 'aiRecommend',
  initialState,
  reducers: {
    setAILabel: (state, action: PayloadAction<string[]>) => {
      state.aiLabel = action.payload;
    },
    setAIThemes: (state, action: PayloadAction<string[]>) => {
      state.aiThemes = action.payload;
    },
    setAIThemeReason: (state, action: PayloadAction<string[]>) => {
      state.aiThemeReason = action.payload;
    },
    setAITitle: (state, action: PayloadAction<string>) => {
      state.aiTitles = action.payload;
    },
    setAITitleReason: (state, action: PayloadAction<string>) => {
      state.aiTitleReason = action.payload;
    },
    setCloudVisionLabels: (
      state,
      action: PayloadAction<CloudVisionLabel[]>,
    ) => {
      state.cloudVisionLabels = action.payload;
    },
    setPrevSelectedArt: (state, action: PayloadAction<number[]>) => {
      state.prevSelectedArt = action.payload;
    },
  },
});

export const {
  setAILabel,
  setAIThemes,
  setAIThemeReason,
  setAITitle,
  setAITitleReason,
  setCloudVisionLabels,
  setPrevSelectedArt,
} = aiRecommendSlice.actions;

export default aiRecommendSlice.reducer;
