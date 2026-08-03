import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useAuthStore from "../../store/useAuthStore";
import { useThemeMode } from "../../context/useThemeMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
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

  const linkStyle = {
    color: theme.palette.text.primary,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s",
    "&:hover": { color: theme.palette.primary.main },
  };

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

      {/* links - hidden on mobile */}
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          display: { xs: "none", md: "flex" },
          gap: "20px",
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map((link) => (
          <Box component="li" key={link.to}>
            <Box component={Link} to={link.to} sx={linkStyle}>
              {link.label}
            </Box>
          </Box>
        ))}
      </Box>

      {/* buttons - hidden on mobile */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "10px", alignItems: "center" }}>
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
            "&:hover": { backgroundColor: theme.palette.action.hover },
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
              "&:hover": { backgroundColor: theme.palette.primary.dark },
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
                "&:hover": { backgroundColor: theme.palette.primary.dark },
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
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              {t("nav.register")}
            </Box>
          </>
        )}
      </Box>

      {/* hamburger button - only on mobile */}
      <IconButton
        sx={{ display: { xs: "flex", md: "none" }, color: "inherit" }}
        onClick={() => setMenuOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* mobile drawer menu */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 260, padding: 3, height: "100%", backgroundColor: theme.palette.background.paper }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
            <IconButton onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, marginBottom: 4 }}>
            {navLinks.map((link) => (
              <Box
                key={link.to}
                component={Link}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                sx={linkStyle}
              >
                {link.label}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
                }}
              >
                {i18n.language === "en" ? "العربية" : "English"}
              </Box>
            </Box>

            {token ? (
              <Box
                component="button"
                onClick={handleLogout}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  border: "none",
                  padding: "10px 16px",
                  color: "#fff",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {t("nav.logout")}
              </Box>
            ) : (
              <>
                <Box
                  component={Link}
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: "10px 16px",
                    color: "#fff",
                    borderRadius: "6px",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  {t("nav.login")}
                </Box>
                <Box
                  component={Link}
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.palette.text.primary}`,
                    padding: "10px 16px",
                    color: theme.palette.text.primary,
                    borderRadius: "6px",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  {t("nav.register")}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}