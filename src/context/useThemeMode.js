import { useContext } from "react";
import { ThemeContext } from "./themeContextInstance";

export const useThemeMode = () => useContext(ThemeContext);