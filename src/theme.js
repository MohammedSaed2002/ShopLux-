import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#111111",
              secondary: "#555555",
            },
          }
        : {
            primary: {
              main: "#00bcd4",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
          }),
    },
  });