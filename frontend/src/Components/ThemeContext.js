import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'system';
  });

  const [customTheme, setCustomTheme] = useState(() => {
    const storedCustomTheme = JSON.parse(localStorage.getItem('customTheme'));
    return (
      storedCustomTheme || {
        'background-color': '#ffffff',
        'navbar-background-color': '#007bff',
        'text-color': '#000000',
        'accent-color': '#007bff',
        'gradient-color-start': '#ffffff',
        'gradient-color-end': '#000000',
      }
    );
  });

  const applyTheme = (selectedTheme, customVars = customTheme) => {
    const root = document.documentElement;

    // Reset previously set custom properties
    Object.keys(customVars).forEach((key) => root.style.removeProperty(`--${key}`));

    if (selectedTheme === 'custom') {
      root.setAttribute('data-theme', 'custom');
      Object.entries(customVars).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
    } else if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    } else {
      root.setAttribute('data-theme', selectedTheme);
    }
  };

  const toggleTheme = (newTheme) => {
    if (newTheme !== 'custom') {
      const root = document.documentElement;
      Object.keys(customTheme).forEach((key) => root.style.removeProperty(`--${key}`));
    }

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const saveCustomTheme = (customVars) => {
    setCustomTheme(customVars);
    localStorage.setItem('customTheme', JSON.stringify(customVars));
    applyTheme('custom', customVars);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme, customTheme]);

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        applyTheme('system');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, customTheme, saveCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
