
import { IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useAppTheme } from "./useAppTheme";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useAppTheme();

  return (
    <Tooltip title="Toggle theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
