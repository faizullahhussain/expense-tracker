import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  console.log("Location", location.pathname);
  const path = location.pathname.split("/").filter(Boolean);
  console.log("Path", path);
  return (
    <div className="breadcrumb">
      <Link to="/">Dashboard</Link>

      {path.map((item, index) => (
        <span key={index}>
          <FaChevronRight />
          <span className="active">{item}</span>
        </span>
      ))}
    </div>
  );
}
