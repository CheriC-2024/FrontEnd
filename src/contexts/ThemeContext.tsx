import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  selectedThemes: string[];
  setSelectedThemes: (themes: string[]) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  return (
    <ThemeContext.Provider value={{ selectedThemes, setSelectedThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
