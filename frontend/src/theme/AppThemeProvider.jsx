
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CssBaseline,
  ThemeProvider,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enIN } from "date-fns/locale/en-IN";

import { APP_CONFIG } from "../config/appConfig";

import { AppThemeContext } from "./AppThemeContext";
import { createAppTheme } from "./createAppTheme";

const getInitialTheme = () => {
  try {
    const savedTheme = localStorage.getItem(
      APP_CONFIG.storage.themeMode
    );

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Fall back to light mode if localStorage is unavailable.
  }

  return "light";
};

const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialTheme);

  const theme = useMemo(
    () => createAppTheme(mode),
    [mode]
  );

  const setThemeMode = useCallback((newMode) => {
    setMode(newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((previousMode) =>
      previousMode === "light" ? "dark" : "light"
    );
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        APP_CONFIG.storage.themeMode,
        mode
      );
    } catch {
      // Theme switching remains functional without persistence.
    }
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      setThemeMode,
      toggleTheme,
    }),
    [mode, setThemeMode, toggleTheme]
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={enIN}
          dateFormats={{
            keyboardDate: APP_CONFIG.regional.dateFormat,
          }}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;
