import React, { createContext, useState, useContext, useEffect } from 'react';
import { lightTheme, darkTheme, Theme } from '../config/theme.config';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
    document.body.style.backgroundColor = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;