export const delay = (delayId, duration, f) => {
    typeof delayId === "number" ? clearTimeout(delayId) : {};
    delayId = setTimeout(() => {
      f()
    }, duration);
  };