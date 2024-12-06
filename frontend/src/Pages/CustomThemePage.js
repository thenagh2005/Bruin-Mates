import React, { useState } from 'react';
import { useTheme } from '../Components/ThemeContext.js';
import '../Styles/CustomThemePage.css';

const CustomThemePage = () => {
  const { customTheme, saveCustomTheme } = useTheme();
  const [backgroundColor, setBackgroundColor] = useState(customTheme['background-color']);
  const [navbarBg, setNavbarBg] = useState(customTheme['navbar-background-color']);
  const [navbarTextColor, setNavbarTextColor] = useState(customTheme['navbar-text-color']);
  const [pageTextColor, setPageTextColor] = useState(customTheme['text-color']);
  const [accentColor, setAccentColor] = useState(customTheme['accent-color']);
  const [gradientStart, setGradientStart] = useState(customTheme['gradient-color-start']);
  const [gradientEnd, setGradientEnd] = useState(customTheme['gradient-color-end']);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSave = () => {
    saveCustomTheme({
      'background-color': backgroundColor,
      'navbar-background-color': navbarBg,
      'navbar-text-color': navbarTextColor,
      'text-color': pageTextColor,
      'accent-color': accentColor,
      ...(showAdvanced && {
        'gradient-color-start': gradientStart,
        'gradient-color-end': gradientEnd,
      }),
    });
    alert('Custom Theme Saved!');
  };

  return (
    <div className="theme-editor">
      <h1>Customize Your Theme</h1>
      <p className="return-note">
        <span>*</span> To return to this page, please select a different theme and reselect Custom Theme.
      </p>
      <label>
        Page Background Color:
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Page Text Color:
        <input
          type="color"
          value={pageTextColor}
          onChange={(e) => setPageTextColor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Navigation Bar Background:
        <input
          type="color"
          value={navbarBg}
          onChange={(e) => setNavbarBg(e.target.value)}
        />
      </label>
      <br />
      <label>
        Navigation Bar Text Color:
        <input
          type="color"
          value={navbarTextColor}
          onChange={(e) => setNavbarTextColor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Accent Color:
        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
        />
      </label>
      <span
        className="toggle-advanced-text"
        onClick={() => setShowAdvanced((prev) => !prev)}
      >
        {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
      </span>
      {showAdvanced && (
        <>
          <label>
            Gradient Start Color:
            <input
              type="color"
              value={gradientStart}
              onChange={(e) => setGradientStart(e.target.value)}
            />
          </label>
          <br />
          <label>
            Gradient End Color:
            <input
              type="color"
              value={gradientEnd}
              onChange={(e) => setGradientEnd(e.target.value)}
            />
          </label>
          <br />
        </>
      )}
      <button onClick={handleSave}>Save Theme</button>
    </div>
  );
};

export default CustomThemePage;
