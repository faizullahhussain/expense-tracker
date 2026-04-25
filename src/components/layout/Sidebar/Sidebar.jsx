import "./Sidebar.scss";
import logo from "/src/assets/logo.png";
import { NavLink } from "react-router-dom";
import {
  FaChartLine,
  FaChartPie,
  FaCog,
  FaHome,
  FaListAlt,
  FaPlusCircle,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <a href="#" className="logo">
          <img src={logo} alt="Logo" />
          <span>Expense Tracker</span>
        </a>
        <NavLink to="/" end>
          <FaHome />
          Dashboard
        </NavLink>
        <NavLink to="/addTransaction">
          <FaPlusCircle />
          Add Transactions
        </NavLink>
        <NavLink to="/TransactionsDetails">
          <FaListAlt />
          Transactions
        </NavLink>
        <NavLink to="/analytics">
          <FaChartLine /> Analytics
        </NavLink>
        <NavLink to="settings">
          <FaCog /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
