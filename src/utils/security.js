export const secureApp = () => {
  if (import.meta.env.PROD) {
    ["log", "warn", "debug", "info", "error"].forEach((m) => {
      console[m] = () => {};
    });
  }

  if (import.meta.env.PROD && typeof window !== "undefined") {
    Object.defineProperty(window, "console", {
      value: {},
      writable: false,
      configurable: false,
    });
  }
};
