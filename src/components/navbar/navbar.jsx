import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>ShopLux</div>

      <ul style={styles.links}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/products" style={styles.link}>Products</Link></li>
        <li><Link to="/cart" style={styles.link}>Cart</Link></li>
      </ul>

      <div style={styles.buttons}>
        {token ? (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.button}>Login</Link>
            <Link to="/register" style={styles.registerButton}>Register</Link>
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
};