import React from "react";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MyApp</div>

      <ul style={styles.links}>
        <li style={styles.link}>Home</li>
        <li style={styles.link}>About</li>
        <li style={styles.link}>Services</li>
        <li style={styles.link}>Contact</li>
      </ul>

      <button style={styles.button}>Login</button>
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
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#00bcd4",
    border: "none",
    padding: "8px 16px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};