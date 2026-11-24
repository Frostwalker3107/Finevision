
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import AppLogo from "../../assets/react.svg";

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
      color="default"
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
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
              sx={{ fontWeight: 700 }}
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
                color={selected ? "primary" : "inherit"}
                variant={selected ? "contained" : "text"}
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
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        {/* Theme Toggle */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
