import { FaUserCircle } from "react-icons/fa";
import "../../layout/Header/Header.scss";
import logo from "/src/assets/logo.png";

export default function Header() {
  let currentMonth = new Date().getFullYear();

  return (
    <header className="header">
      <nav>
        <a href="#" className="logo">
          <img src={logo} alt="Logo" />
          <span>Expense Tracker Dashboard</span>
        </a>
        <p className="current-month">
          Current Year: <strong>{currentMonth}</strong>
        </p>
        <a href="#" className="user">
          <span>User Profile</span>
          <FaUserCircle />
        </a>
      </nav>
    </header>
  );
}
