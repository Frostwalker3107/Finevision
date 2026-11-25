
import { Box } from "@mui/material";

import Navbar from "./Navbar";
import PageContainer from "./PageContainer";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
      }}
    >
      <Navbar />

      <PageContainer>
        {children}
      </PageContainer>
    </Box>
  );
};

export default AppLayout;
