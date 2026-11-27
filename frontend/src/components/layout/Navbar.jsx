
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import AppLogo from "../../assets/eye-transparent-background.svg";

import { APP_CONFIG } from "../../config/appConfig";
import { NAVIGATION_CONFIG } from "../../config/navigationConfig";

import ThemeToggle from "../../theme/ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    navigate(APP_CONFIG.app.homeRoute);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "navbar.main",
        color: "navbar.contrastText",
        borderBottom: 1,
        borderColor: "navbar.divider",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: `${APP_CONFIG.layout.header.height}px !important`,
          px: 2,
          gap: 3,
        }}
      >
        {/* Application Logo */}
        <Tooltip title={APP_CONFIG.app.name}>
          <Box
            component="button"
            onClick={handleHomeNavigation}
            aria-label={`${APP_CONFIG.app.name} - Go to Dashboard`}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              border: 0,
              p: 0,
              bgcolor: "transparent",
              color: "inherit",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={AppLogo}
              alt={`${APP_CONFIG.app.name} Logo`}
              sx={{
                width: 32,
                height: 32,
                objectFit: "contain",
                flexShrink: 0,
              }}
            />

            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                fontWeight: 500,
                fontSize: 25,
                color: "inherit",
              }}
            >
              {APP_CONFIG.app.name}
            </Typography>
          </Box>
        </Tooltip>

        {/* Horizontal Navigation */}
        <Box
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 0.5,
            flexGrow: 1,
            overflowX: "auto",
            scrollbarWidth: "none",

            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {NAVIGATION_CONFIG.map((item) => {
            const Icon = item.icon;

            const selected =
              location.pathname === item.path;

            return (
              <Button
                key={item.id}
                onClick={() => navigate(item.path)}
                color="inherit"
                variant="text"
                startIcon={
                  <Icon
                    sx={{
                      fontSize: APP_CONFIG.ui.iconSize,
                    }}
                  />
                }
                sx={{
                  minHeight: APP_CONFIG.ui.navigationItemHeight,
                  px: 1.5,
                  whiteSpace: "nowrap",
                  fontSize: `${APP_CONFIG.ui.typography.navigation}px`,
                  fontWeight: selected ? 600 : 400,
                  borderRadius: 1.5,
                  color: "navbar.contrastText",

                  bgcolor: selected
                    ? "navbar.selected"
                    : "transparent",

                  "&:hover": {
                    bgcolor: "navbar.hover",
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
