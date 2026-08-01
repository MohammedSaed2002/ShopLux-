import { createTheme } from "@mui/material/styles";

export const getTheme = (mode, direction = "ltr") =>
  createTheme({
    direction,
    palette: {
      mode: mode,
      primary: {
        main: "#d2bcff",
        dark: "#6c2bd9",
      },
      secondary: {
        main: "#ffb68b",
      },
      background: {
        default: mode === "dark" ? "#15121b" : "#f5f5f5",
        paper: mode === "dark" ? "#211e28" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#e7e0ee" : "#111111",
        secondary: mode === "dark" ? "#ccc3d7" : "#555555",
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
  });