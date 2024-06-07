import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GlobalState {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  selectedFont: string;
  setSelectedFont: (font: string) => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFont, setSelectedFont] = useState('기본 시스템 폰트');

  return (
    <GlobalStateContext.Provider
      value={{
        // ThemeSetting page -> 테마 3개 저장
        selectedThemes,
        setSelectedThemes,
        // DescriptionSetting page -> 전시명과 설명 저장
        title,
        description,
        setTitle,
        setDescription,
        // Font selection
        selectedFont,
        setSelectedFont,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
