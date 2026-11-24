
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import { APP_CONFIG } from "../../../config/appConfig";

const AppDialog = ({
  open,
  title,
  children,
  onClose,
  onConfirm,

  confirmLabel = APP_CONFIG.ui.dialog.actions.confirmLabel,

  cancelLabel = APP_CONFIG.ui.dialog.actions.cancelLabel,

  showCancel = true,

  showConfirm = true,

  showCloseButton = APP_CONFIG.ui.dialog.showCloseButton,

  confirmColor,

  severity = "default",

  maxWidth = APP_CONFIG.ui.dialog.defaultWidth,

  fullWidth = APP_CONFIG.ui.dialog.fullWidth,

  disableConfirm = false,
}) => {
  const resolvedConfirmColor =
    confirmColor ??
    (severity === "error"
      ? "error"
      : severity === "warning"
        ? "warning"
        : "primary");

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: showCloseButton ? 1 : 2,
        }}
      >
        {title}

        {showCloseButton && (
          <IconButton
            aria-label="Close dialog"
            onClick={onClose}
            size="small"
          >
            <Close fontSize="small" />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      {(showCancel || showConfirm) && (
        <DialogActions>
          {showCancel && (
            <Button
              variant="outlined"
              color="inherit"
              onClick={onClose}
            >
              {cancelLabel}
            </Button>
          )}

          {showConfirm && (
            <Button
              variant="contained"
              color={resolvedConfirmColor}
              onClick={handleConfirm}
              disabled={disableConfirm}
            >
              {confirmLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default AppDialog;
