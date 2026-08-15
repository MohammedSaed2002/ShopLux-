import { createTheme } from "@mui/material/styles";

export const getTheme = (mode, direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      mode: mode,
      primary: {
        main: mode === "dark" ? "#d2bcff" : "#6c2bd9",
        dark: mode === "dark" ? "#6c2bd9" : "#4700B8",
        light: mode === "dark" ? "#e8d9ff" : "#9c6fe8",
        contrastText: "#ffffff",
      },
      secondary: {
        main: mode === "dark" ? "#ffb68b" : "#c96a3c",
        dark: mode === "dark" ? "#e0925f" : "#a1502a",
        contrastText: mode === "dark" ? "#432100" : "#ffffff",
      },
      background: {
        default: mode === "dark" ? "#15121b" : "#f8f6fc",
        paper: mode === "dark" ? "#211e28" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e7e0ee" : "#1c1626",
        secondary: mode === "dark" ? "#ccc3d7" : "#5f5770",
      },
      divider: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(76,29,149,0.13)",
      action: {
        hover: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(108,43,217,0.06)",
        selected: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(108,43,217,0.1)",
      },
    },
    typography: {
      fontFamily: "Inter, Roboto, sans-serif",
      h1: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
      h2: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 },
      h3: { fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: mode === "dark" ? "#15121b" : "#f8f6fc",
          },
        },
      },
    },
  });