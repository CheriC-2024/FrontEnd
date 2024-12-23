import { ReactNode } from 'react';

// 루트 네비게이터 타입 정의
export type RootStackParamList = {
  Tabs: undefined;
  Stack: undefined;
  CollectingStack: undefined;
  Exhibit: undefined;
  HomeStack: undefined;
  MyChericStack: { screen: string };
};

// 네비게이션 바 타입 정의
export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Exhibit: { step: number; selectedThemes?: string[] };
  Collecting: undefined;
  MyCheric: undefined;
};

// 스택 네비
export type StackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainTabs: undefined;
  AIRecommendLoading: { source: string };
  AIRecommendTheme: { source: string };
  AIRecommendDescription: { source: string };
  ThemeSetting: undefined;
  DescriptionSetting: undefined;
  ArtworkList: undefined;
  ArtworkDetail: {
    artworkId: number;
  };
};

export type ExhibitStackParamList = {
  CollectionSelect: undefined;
  ArtworkSelect: undefined;
  ThemeSetting: undefined;
  ArtworkInfoSetting: undefined;
  DescriptionSetting: undefined;
  CoverSetting: undefined;
  FinishSetting: undefined;
  ExhibitCompletion: undefined;
};

export type CollectingStackParamList = {
  CollectingScreen: undefined;
  ArtCollecting: undefined;
  ArtistCollecting: undefined;
  ArtistProfile: undefined;
  ArtworkInfo: undefined;
  CreateCollection: undefined;
  RequestArtwork: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  PrivateArtworkList: undefined;
  ExhibitList: undefined;
  CollectorProfile: undefined;
  PrivateArtworkInfo: undefined;
  ExhibitEntrance: undefined;
  ExhibitLoading: undefined;
  ExhibitIntro: undefined;
  ExhibitViewing: undefined;
  ExhibitViewingDetail: undefined;
  ExhibitComments: undefined;
  ExhibitCommentsDetail: undefined;
  ExhibitCommentsWrite: undefined;
};

export type MyChericStackParamList = {
  MyChericScreen: undefined;
  PrivateArtRegister: undefined;
  ArtistRegister: undefined;
};

export type PrivateArtRegisterParamList = {
  AddArtwork: undefined;
  AddArtworkInfo: undefined;
  AddDocs: undefined;
  RegisterCompletion: undefined;
};

export type ArtistRegisterParamList = {
  AddResume: undefined;
  AddInfo: undefined;
  AddDocs: undefined;
  Completion: undefined;
};
