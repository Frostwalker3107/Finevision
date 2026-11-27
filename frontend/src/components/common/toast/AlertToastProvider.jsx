
import { useCallback, useEffect, useState } from "react";

import {
  Alert,
  Snackbar,
} from "@mui/material";

import { APP_CONFIG } from "../../../config/appConfig";

import { subscribeToToast } from "./alertToast";

const AlertToastProvider = () => {
  const [notificationQueue, setNotificationQueue] =
    useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToast(
      (newNotification) => {
        setNotificationQueue((previousQueue) => [
          ...previousQueue,
          newNotification,
        ]);
      }
    );

    return unsubscribe;
  }, []);

  const removeCurrentNotification = useCallback(() => {
    setNotificationQueue((previousQueue) =>
      previousQueue.slice(1)
    );
  }, []);

  const handleClose = useCallback(
    (_event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      removeCurrentNotification();
    },
    [removeCurrentNotification]
  );

  const currentNotification = notificationQueue[0] ?? null;

  return (
    <Snackbar
      key={currentNotification?.id}
      open={Boolean(currentNotification)}
      autoHideDuration={
        APP_CONFIG.ui.notifications.autoHideDuration
      }
      onClose={handleClose}
      anchorOrigin={
        APP_CONFIG.ui.notifications.anchorOrigin
      }
    >
      {currentNotification ? (
        <Alert
          onClose={removeCurrentNotification}
          severity={currentNotification.severity}
          variant={APP_CONFIG.ui.notifications.variant}
          elevation={6}
          sx={{
            width: "100%",
            fontSize: `${APP_CONFIG.ui.typography.body}px`,
            alignItems: "center",
          }}
        >
          {currentNotification.message}
        </Alert>
      ) : (
        <span />
      )}
    </Snackbar>
  );
};

export default AlertToastProvider;
