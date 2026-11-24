
import { createTheme } from "@mui/material/styles";

import { APP_CONFIG } from "../config/appConfig";

export const createAppTheme = (mode) => {
  const { ui, layout } = APP_CONFIG;

  const { typography, components } = ui;

  const spacing = (value) => `${value * 4}px`;

  return createTheme({
    palette: {
      mode,
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
          },

          input: {
            fontSize: `${typography.input}px`,
            padding: `${spacing(1)} ${spacing(1.5)}`,
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: `${typography.input}px`,
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
          },

          head: {
            fontWeight: 600,
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
