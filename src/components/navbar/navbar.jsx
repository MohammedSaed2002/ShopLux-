import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>ShopLux</div>

      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>{t("nav.home")}</Link></li>
        <li><Link to="/products" style={styles.link}>{t("nav.products")}</Link></li>
        <li><Link to="/cart" style={styles.link}>{t("nav.cart")}</Link></li>
      </ul>

      <div style={styles.buttons}>
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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    backgroundColor: "#111",
    color: "#fff",
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
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#00bcd4",
    border: "none",
    padding: "8px 16px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
  },
  registerButton: {
    backgroundColor: "#fff",
    padding: "8px 16px",
    color: "#111",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
  },
  langButton: {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    padding: "6px 14px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};