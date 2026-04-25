import "../../layout/Header/Header.scss";
import logo from "/src/assets/logo.png";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <p className="current-year">
          Current Year: <strong>{currentYear}</strong>
        </p>

        <div className="theme-toggle">
          <button onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </header>
  );
}
