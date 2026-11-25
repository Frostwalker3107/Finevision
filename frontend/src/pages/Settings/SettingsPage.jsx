
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

import { useAppTheme } from "../../theme/useAppTheme";
import ThemeToggle from "../../theme/ThemeToggle";

const SettingsPage = () => {
  const { mode } = useAppTheme();

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Settings
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" mb={1}>
            Appearance
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
          >
            Customize the appearance of FineVision.
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">
                Theme Mode
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Current mode: {mode === "light" ? "Light" : "Dark"}
              </Typography>
            </Box>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2">
                Toggle theme
              </Typography>

              <ThemeToggle />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
