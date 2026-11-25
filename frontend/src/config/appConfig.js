
export const APP_CONFIG = {
  app: {
    name: "FineVision",
    version: "development",
    homeRoute: "/",
    defaultRoute: "/",
  },

  api: {
    baseUrl: "http://127.0.0.1:8080/api/v1",
    timeout: 15000,
  },

  layout: {
    sidebar: {
      expandedWidth: 190,
      collapsedWidth: 48,
    },

    header: {
      height: 44,
    },

    page: {
      padding: 1.5,
      maxWidth: "xl",
    },

    transitions: {
      duration: "standard",
    },
  },

  ui: {
    density: "compact",

    borderRadius: 4,

    iconSize: 18,

    navigationItemHeight: 34,

    cardPadding: 2,

    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
      fontSize: 13,
      body: 13,
      navigation: 12,
      pageTitle: 18,
      sectionTitle: 15,
      table: 12,
      input: 13,
      caption: 11,
    },

    components: {
      buttonHeight: 30,
      inputHeight: 34,
      iconButtonSize: 28,
      tableCellVerticalPadding: 6,
      tableCellHorizontalPadding: 10,
      dialogTitlePadding: 2,
      dialogContentPadding: 2,
    },

    dialog: {
      defaultWidth: "sm",
      fullWidth: true,
      showCloseButton: true,

      actions: {
        confirmLabel: "OK",
        cancelLabel: "Cancel",
      },
    },

    notifications: {
      autoHideDuration: 4000,

      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },

      variant: "filled",
    },
  },

  storage: {
    themeMode: "finevision-theme",
    sidebarCollapsed: "finevision-sidebar-collapsed",
  },

  regional: {
    currency: "INR",
    locale: "en-IN",
    dateFormat: "dd-MM-yyyy",
    dateTimeFormat: "dd-MM-yyyy HH:mm:ss",
  },
};
