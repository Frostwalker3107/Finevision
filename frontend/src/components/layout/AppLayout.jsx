
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import PageContainer from "./PageContainer";

const AppLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <PageContainer>
        <Outlet />
      </PageContainer>
    </Box>
  );
};

export default AppLayout;
