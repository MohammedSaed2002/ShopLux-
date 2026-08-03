import { useState, useMemo, useEffect } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import { getTheme } from "../theme";
import createEmotionCache from "../createEmotionCache";

import { ThemeContext } from "./themeContextInstance";

export function ThemeProvider({ children }) {
    const { i18n } = useTranslation();
    const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");

    const direction = i18n.language === "ar" ? "rtl" : "ltr";

    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        localStorage.setItem("themeMode", newMode);
    };

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = i18n.language;
    }, [direction, i18n.language]);

    const emotionCache = useMemo(() => createEmotionCache(direction), [direction]);
    const theme = useMemo(() => getTheme(mode, direction), [mode, direction]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <CacheProvider value={emotionCache}>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    {children}
                </MuiThemeProvider>
            </CacheProvider>
        </ThemeContext.Provider>
    );
}

