import { FaUserCircle } from "react-icons/fa";
import "../../layout/Header/Header.scss";
import logo from "/src/assets/logo.png";
import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);
  let currentMonth = new Date().getFullYear();

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <header className="header">
      <nav>
        <a href="#" className="logo">
          <img src={logo} alt="Logo" />
        </a>
        <p className="current-month">
          Current Year: <strong>{currentMonth}</strong>
        </p>
        <div className="theme-toggle">
          <a href="#" className="user">
            <button onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
          </a>
        </div>
      </nav>
    </header>
  );
}
