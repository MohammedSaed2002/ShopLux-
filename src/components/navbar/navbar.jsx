import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import useAuthStore from "../../store/useAuthStore";
import { useThemeMode } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/products", label: t("nav.products") },
    { to: "/cart", label: t("nav.cart") },
    { to: "/profile", label: t("nav.profile") },
  ];

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>ShopLux</Box>

      <Box component="ul" sx={{ listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: 0 }}>
        {navLinks.map((link) => (
          <Box component="li" key={link.to}>
            <Box
              component={Link}
              to={link.to}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.2s",
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              {link.label}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <IconButton onClick={toggleTheme} sx={{ color: "inherit" }}>
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <Box
          component="button"
          onClick={toggleLanguage}
          sx={{
            backgroundColor: "transparent",
            border: `1px solid ${theme.palette.text.primary}`,
            padding: "6px 14px",
            color: theme.palette.text.primary,
            borderRadius: "6px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {i18n.language === "en" ? "العربية" : "English"}
        </Box>

        {token ? (
          <Box
            component="button"
            onClick={handleLogout}
            sx={{
              backgroundColor: theme.palette.primary.main,
              border: "none",
              padding: "8px 16px",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {t("nav.logout")}
          </Box>
        ) : (
          <>
            <Box
              component={Link}
              to="/login"
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: "8px 16px",
                color: "#fff",
                borderRadius: "6px",
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {t("nav.login")}
            </Box>
            <Box
              component={Link}
              to="/register"
              sx={{
                backgroundColor: "transparent",
                border: `1px solid ${theme.palette.text.primary}`,
                padding: "8px 16px",
                color: theme.palette.text.primary,
                borderRadius: "6px",
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              {t("nav.register")}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}