import { Suspense } from "react";

import {
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { APP_CONFIG } from "../config/appConfig";
import { ROUTE_CONFIG } from "../config/routeConfig";

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress size={28} />
        </Box>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={APP_CONFIG.app.defaultRoute}
              replace
            />
          }
        />

        {Object.values(ROUTE_CONFIG).map((route) => {
          const PageComponent = route.component;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={<PageComponent />}
            />
          );
        })}

        <Route
          path="*"
          element={
            <Navigate
              to={APP_CONFIG.app.defaultRoute}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;