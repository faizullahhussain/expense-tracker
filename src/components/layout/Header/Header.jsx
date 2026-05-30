import "../../layout/Header/Header.scss";
import logo from "/src/assets/logo.png";
import { useEffect, useState } from "react";
// 1. Import NavLink from react-router-dom
import { NavLink } from "react-router-dom";
// Swapped LuBarChart2 for LuPieChart (or LuTrendingUp)
// Swapping to ultra-stable icon sets that exist in all versions
import {
  FaHouse,
  FaPlus,
  FaCreditCard,
  FaChartSimple,
  FaEllipsis,
} from "react-icons/fa6";

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
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {/* ─── TOP HEADER ─── */}
      <header className="header">
        <nav className="header-nav">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          <p className="current-year desktop-only">
            Current Year: <strong>{currentYear}</strong>
          </p>

          <div className="theme-toggle">
            <button onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </nav>
      </header>

      {/* ─── BOTTOM NAVIGATION (Now with React Router Links) ─── */}

      <nav className="mobile-bottom-nav">
        <NavLink to="/" className="nav-item" end>
          <FaHouse size={20} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/addTransaction" className="nav-item">
          <FaPlus size={20} />
          <span>Add</span>
        </NavLink>

        <NavLink to="/TransactionsDetails" className="nav-item">
          <FaCreditCard size={20} />
          <span>Transactions</span>
        </NavLink>

        <NavLink to="/analytics" className="nav-item">
          <FaChartSimple size={20} />
          <span>Analytics</span>
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          <FaEllipsis size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </>
  );
}
