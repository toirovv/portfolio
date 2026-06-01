export const secureApp = () => {
  if (import.meta.env.PROD) {
    ["log", "debug", "info"].forEach((m) => {
      console[m] = () => {};
    });
  }
};
