import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Retrieve stored theme or fallback to "system"
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) return storedTheme;

    // Default to "system" if no stored theme
    return 'system';
  });

  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'system') {
      // Use system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      // Use selected theme (light or dark)
      document.documentElement.setAttribute('data-theme', selectedTheme);
    }
  };

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the new theme to localStorage
    applyTheme(newTheme);
  };

  useEffect(() => {
    // Apply the current theme on load
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes if "system" mode is active
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (event) => {
        applyTheme('system'); // Re-apply system theme
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};