import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Drawer from "@mui/material/Drawer";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";
import { useThemeMode } from "../../context/useThemeMode";

// navbar keeps a fixed dark identity regardless of the site-wide theme mode
const NAV_BG = "#15121f";
const NAV_BORDER = "rgba(255,255,255,0.08)";
const NAV_TEXT = "#e7e0ee";
const NAV_TEXT_MUTED = "#a89fb5";
const NAV_ACCENT = "#c9a6ff";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { mode, toggleTheme } = useThemeMode();
  const { data: cartData } = useCart(!!token);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartData?.items?.length ?? 0;

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
    { to: "/products", label: t("nav.shop") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkStyle = {
    color: NAV_TEXT,
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.2s",
    "&:hover": { color: NAV_ACCENT },
  };

  const iconButtonSx = {
    color: NAV_TEXT,
    "&:hover": { color: NAV_ACCENT, backgroundColor: "rgba(255,255,255,0.06)" },
  };

  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        backgroundColor: NAV_BG,
        borderBottom: `1px solid ${NAV_BORDER}`,
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      {/* logo */}
      <Box
        component={Link}
        to="/"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 34,
            height: 34,
            borderRadius: "10px",
            background: "linear-gradient(135deg, #a06bff 0%, #6c2bd9 100%)",
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ color: "#fff", fontSize: 20 }} />
        </Box>
        <Box sx={{ fontSize: "20px", fontWeight: 800, color: NAV_TEXT, letterSpacing: 0.3 }}>
          ShopLux
        </Box>
      </Box>

      {/* links - hidden on mobile */}
      <Box
        component="ul"
        sx={{
          listStyle: "none",
          display: { xs: "none", md: "flex" },
          gap: "32px",
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

      {/* icons - hidden on mobile */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: "6px", alignItems: "center" }}>
        <Tooltip title={i18n.language === "en" ? "العربية" : "English"}>
          <IconButton onClick={toggleLanguage} sx={iconButtonSx}>
            <Badge
              badgeContent={i18n.language.toUpperCase()}
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "8px",
                  height: 14,
                  minWidth: 18,
                  backgroundColor: NAV_ACCENT,
                  color: "#15121f",
                  fontWeight: 700,
                },
              }}
            >
              <LanguageOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        <IconButton onClick={toggleTheme} sx={iconButtonSx}>
          {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>

        {token ? (
          <>
            <Tooltip title={t("nav.profile")}>
              <IconButton component={Link} to="/profile" sx={iconButtonSx}>
                <PersonOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("nav.logout")}>
              <IconButton onClick={handleLogout} sx={iconButtonSx}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Tooltip title={t("nav.login")}>
            <IconButton component={Link} to="/login" sx={iconButtonSx}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={t("nav.cart")}>
          <IconButton component={Link} to="/cart" sx={iconButtonSx}>
            <Badge
              badgeContent={cartCount}
              invisible={cartCount === 0}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#ff9a4d",
                  color: "#15121f",
                  fontWeight: 700,
                },
              }}
            >
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      {/* hamburger button - only on mobile */}
      <IconButton
        sx={{ display: { xs: "flex", md: "none" }, ...iconButtonSx }}
        onClick={() => setMenuOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* mobile drawer menu */}
      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 270, padding: 3, height: "100%", backgroundColor: NAV_BG }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
            <IconButton onClick={() => setMenuOpen(false)} sx={iconButtonSx}>
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

          <Divider sx={{ borderColor: NAV_BORDER, marginBottom: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <IconButton onClick={toggleTheme} sx={iconButtonSx}>
                {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
              <Box
                component="button"
                onClick={toggleLanguage}
                sx={{
                  backgroundColor: "transparent",
                  border: `1px solid ${NAV_TEXT_MUTED}`,
                  padding: "6px 14px",
                  color: NAV_TEXT,
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {i18n.language === "en" ? "العربية" : "English"}
              </Box>
            </Box>

            <Box
              component={Link}
              to="/cart"
              onClick={() => setMenuOpen(false)}
              sx={{ display: "flex", alignItems: "center", gap: 1.5, ...linkStyle }}
            >
              <Badge
                badgeContent={cartCount}
                invisible={cartCount === 0}
                sx={{ "& .MuiBadge-badge": { backgroundColor: "#ff9a4d", color: "#15121f", fontWeight: 700 } }}
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
              {t("nav.cart")}
            </Box>

            {token ? (
              <>
                <Box
                  component={Link}
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  sx={{ display: "flex", alignItems: "center", gap: 1.5, ...linkStyle }}
                >
                  <PersonOutlineOutlinedIcon fontSize="small" />
                  {t("nav.profile")}
                </Box>
                <Box
                  component="button"
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: NAV_ACCENT,
                    border: "none",
                    padding: "10px 16px",
                    color: "#15121f",
                    fontWeight: 700,
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginTop: 1,
                  }}
                >
                  {t("nav.logout")}
                </Box>
              </>
            ) : (
              <>
                <Box
                  component={Link}
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  sx={{
                    backgroundColor: NAV_ACCENT,
                    padding: "10px 16px",
                    color: "#15121f",
                    fontWeight: 700,
                    borderRadius: "8px",
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
                    border: `1px solid ${NAV_TEXT_MUTED}`,
                    padding: "10px 16px",
                    color: NAV_TEXT,
                    borderRadius: "8px",
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