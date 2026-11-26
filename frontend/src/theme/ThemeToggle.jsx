
import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { useAppTheme } from "./useAppTheme";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useAppTheme();

  const isLight = mode === "light";

  return (
    <Tooltip
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      arrow
    >
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        {isLight ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
