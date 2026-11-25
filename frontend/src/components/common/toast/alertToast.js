
const listeners = new Set();

let notificationId = 0;

const subscribe = (listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const notify = (severity, message) => {
  if (!message?.trim()) {
    return;
  }

  const notification = {
    id: ++notificationId,
    severity,
    message,
  };

  listeners.forEach((listener) => {
    listener(notification);
  });
};

export const alertToast = {
  success: (message) =>
    notify("success", message),

  error: (message) =>
    notify("error", message),

  warning: (message) =>
    notify("warning", message),

  info: (message) =>
    notify("info", message),
};

export const subscribeToToast = subscribe;
