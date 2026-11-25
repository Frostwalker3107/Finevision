
import { createTheme } from "@mui/material/styles";

import { APP_CONFIG } from "../config/appConfig";

export const createAppTheme = (mode) => {
  const { ui, layout } = APP_CONFIG;

  const { typography, components } = ui;

  const isLight = mode === "light";

  // Centralized application color palette
  const colors = {
    // Brand
    primary: isLight ? "#222151" : "#55B9A6",
    white: "#FFFFFF",

    // Navbar
    navbar: isLight ? "#222151" : "#35434A",
    navbarText: "#FFFFFF",

    // Backgrounds
    background: isLight ? "#FFFFFF" : "#171D20",
    paper: isLight ? "#FFFFFF" : "#242D31",

    // Text
    textPrimary: isLight ? "#222151" : "#F2F5F5",
    textSecondary: isLight ? "#666680" : "#AAB8B9",

    // Borders
    divider: isLight ? "#E5E5EF" : "#39474A",

    // Interactive states
    hover: isLight
      ? "rgba(34, 33, 81, 0.04)"
      : "rgba(85, 185, 166, 0.08)",

    selected: isLight
      ? "rgba(34, 33, 81, 0.08)"
      : "rgba(85, 185, 166, 0.16)",

    // Table header
    tableHeader: isLight ? "#F5F5FA" : "#2D393D",

    // Primary button
    primaryHover: isLight ? "#171638" : "#419B89",

    // Navbar interactions
    navbarHover: "rgba(255, 255, 255, 0.10)",
    navbarSelected: "rgba(255, 255, 255, 0.18)",
  };

  const spacing = (value) => `${value * 4}px`;

  return createTheme({
    palette: {
      mode,

      primary: {
        main: colors.primary,
        light: isLight ? "#414170" : "#79CEBD",
        dark: isLight ? "#171638" : "#358675",
        contrastText: colors.white,
      },

      secondary: {
        main: isLight ? "#FFFFFF" : "#55B9A6",
        contrastText: isLight ? "#222151" : "#171D20",
      },

      background: {
        default: colors.background,
        paper: colors.paper,
      },

      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },

      divider: colors.divider,

      action: {
        hover: colors.hover,
        selected: colors.selected,

        disabled: isLight
          ? "rgba(34, 33, 81, 0.35)"
          : "rgba(255, 255, 255, 0.35)",
      },

      // Custom navbar palette
      navbar: {
        main: colors.navbar,
        contrastText: colors.navbarText,
        hover: colors.navbarHover,
        selected: colors.navbarSelected,
        divider: colors.divider,
      },
    },

    shape: {
      borderRadius: ui.borderRadius,
    },

    typography: {
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,

      h1: {
        fontSize: "1.75rem",
        fontWeight: 700,
      },

      h2: {
        fontSize: "1.5rem",
        fontWeight: 700,
      },

      h3: {
        fontSize: "1.25rem",
        fontWeight: 600,
      },

      h4: {
        fontSize: "1.125rem",
        fontWeight: 600,
      },

      h5: {
        fontSize: `${typography.pageTitle}px`,
        fontWeight: 600,
      },

      h6: {
        fontSize: `${typography.sectionTitle}px`,
        fontWeight: 600,
      },

      subtitle1: {
        fontSize: `${typography.sectionTitle}px`,
        fontWeight: 500,
      },

      subtitle2: {
        fontSize: `${typography.navigation}px`,
        fontWeight: 600,
      },

      body1: {
        fontSize: `${typography.body}px`,
      },

      body2: {
        fontSize: `${typography.navigation}px`,
      },

      button: {
        fontSize: `${typography.navigation}px`,
        fontWeight: 600,
        textTransform: "none",
      },

      caption: {
        fontSize: `${typography.caption}px`,
      },

      overline: {
        fontSize: `${typography.caption}px`,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: `${typography.fontSize}px`,
          },

          body: {
            fontSize: `${typography.body}px`,
            fontFamily: typography.fontFamily,
            backgroundColor: colors.background,
            color: colors.textPrimary,
          },

          "*": {
            boxSizing: "border-box",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          size: "small",
        },

        styleOverrides: {
          root: {
            minHeight: components.buttonHeight,
            borderRadius: ui.borderRadius,
            padding: `${spacing(0.5)} ${spacing(1.5)}`,
          },

          containedPrimary: {
            backgroundColor: colors.primary,
            color: isLight ? colors.white : "#171D20",

            "&:hover": {
              backgroundColor: colors.primaryHover,
            },
          },

          outlinedPrimary: {
            borderColor: colors.primary,
            color: colors.primary,

            "&:hover": {
              backgroundColor: colors.hover,
            },
          },
        },
      },

      MuiIconButton: {
        defaultProps: {
          size: "small",
        },

        styleOverrides: {
          root: {
            width: components.iconButtonSize,
            height: components.iconButtonSize,
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          size: "small",
          variant: "outlined",
        },
      },

      MuiFormControl: {
        defaultProps: {
          size: "small",
        },
      },

      MuiSelect: {
        defaultProps: {
          size: "small",
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: `${typography.input}px`,
            minHeight: components.inputHeight,
            color: colors.textPrimary,
          },

          input: {
            fontSize: `${typography.input}px`,
            padding: `${spacing(1)} ${spacing(1.5)}`,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: colors.divider,
          },

          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: `${typography.input}px`,
            color: colors.textSecondary,

            "&.Mui-focused": {
              color: colors.primary,
            },
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: `${typography.caption}px`,
            marginTop: spacing(0.5),
          },
        },
      },

      MuiTable: {
        defaultProps: {
          size: "small",
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: `${components.tableCellVerticalPadding}px ${components.tableCellHorizontalPadding}px`,
            fontSize: `${typography.table}px`,
            borderColor: colors.divider,
          },

          head: {
            fontWeight: 600,
            color: colors.textPrimary,
            backgroundColor: colors.tableHeader,
          },

          body: {
            color: colors.textPrimary,
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: colors.hover,
            },
          },
        },
      },

      MuiTablePagination: {
        styleOverrides: {
          root: {
            fontSize: `${typography.navigation}px`,
          },

          toolbar: {
            minHeight: components.inputHeight,
          },

          selectLabel: {
            fontSize: `${typography.navigation}px`,
          },

          displayedRows: {
            fontSize: `${typography.navigation}px`,
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            minHeight: components.inputHeight,
            fontSize: `${typography.input}px`,

            "&.Mui-selected": {
              backgroundColor: colors.selected,
            },

            "&.Mui-selected:hover": {
              backgroundColor: colors.hover,
            },
          },
        },
      },

      MuiDialog: {
        defaultProps: {
          fullWidth: true,
        },
      },

      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: spacing(components.dialogTitlePadding),
            fontSize: `${typography.sectionTitle}px`,
            fontWeight: 600,
            color: colors.textPrimary,
          },
        },
      },

      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: spacing(components.dialogContentPadding),
          },
        },
      },

      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: spacing(1),
            gap: spacing(1),
          },
        },
      },

      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: `${layout.header.height}px`,
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.navbar,
            color: colors.navbarText,
            boxShadow: "none",
            borderBottom: `1px solid ${colors.divider}`,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.paper,
            color: colors.textPrimary,
            borderRight: `1px solid ${colors.divider}`,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: spacing(ui.cardPadding),

            "&:last-child": {
              paddingBottom: spacing(ui.cardPadding),
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: `${typography.caption}px`,
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            height: 24,
            fontSize: `${typography.navigation}px`,
          },
        },
      },
    },
  });
};
