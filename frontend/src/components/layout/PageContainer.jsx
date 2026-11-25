
import { Box, Container } from "@mui/material";

import { APP_CONFIG } from "../../config/appConfig";

const PageContainer = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minWidth: 0,
        p: APP_CONFIG.layout.page.padding,
      }}
    >
      <Container
        maxWidth={APP_CONFIG.layout.page.maxWidth}
        disableGutters
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageContainer;
