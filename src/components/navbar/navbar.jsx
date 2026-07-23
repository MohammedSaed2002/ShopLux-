import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import useAuthStore from "../../store/useAuthStore";
import { useThemeMode } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

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

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    logo: {
      fontSize: "20px",
      fontWeight: "bold",
    },
    links: {
      listStyle: "none",
      display: "flex",
      gap: "20px",
      margin: 0,
      padding: 0,
    },
    link: {
      color: theme.palette.text.primary,
      textDecoration: "none",
      cursor: "pointer",
    },
    buttons: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      border: "none",
      padding: "8px 16px",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer",
      textDecoration: "none",
    },
    registerButton: {
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.text.primary}`,
      padding: "8px 16px",
      color: theme.palette.text.primary,
      borderRadius: "6px",
      cursor: "pointer",
      textDecoration: "none",
    },
    langButton: {
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.text.primary}`,
      padding: "6px 14px",
      color: theme.palette.text.primary,
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>ShopLux</div>

      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>{t("nav.home")}</Link></li>
        <li><Link to="/products" style={styles.link}>{t("nav.products")}</Link></li>
        <li><Link to="/cart" style={styles.link}>{t("nav.cart")}</Link></li>
        <li><Link to="/profile" style={styles.link}>{t("nav.profile")}</Link></li>
      </ul>

      <div style={styles.buttons}>
        <IconButton onClick={toggleTheme} sx={{ color: "inherit" }}>
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        <button onClick={toggleLanguage} style={styles.langButton}>
          {i18n.language === "en" ? "العربية" : "English"}
        </button>

        {token ? (
          <button onClick={handleLogout} style={styles.button}>{t("nav.logout")}</button>
        ) : (
          <>
            <Link to="/login" style={styles.button}>{t("nav.login")}</Link>
            <Link to="/register" style={styles.registerButton}>{t("nav.register")}</Link>
          </>
        )}
      </div>
    </nav>
  );
}