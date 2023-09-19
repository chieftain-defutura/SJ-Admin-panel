import React, { useState } from "react";
import "./header.scss";
import { ReactComponent as SJlogo } from "../../assets/icons/sjlogo.svg";
import { ReactComponent as TopChevronDown } from "../../assets/icons/top-chevron-down.svg";
import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="header-wrap">
      <a href="/">
        <div className="logo">
          <SJlogo />
          <SNlogo />
        </div>
      </a>
      <div className="drop-down">
        <div className="month-filter" onClick={handleToggle}>
          <p>Select month</p>
          <TopChevronDown
            className={`drop-down-icon ${isActive ? "rotate" : ""}`}
            onClick={handleToggle}
          />
        </div>
        {isActive && (
          <div className="dropdown-content">
            <Link to="#">
              <p>March 2023</p>
            </Link>
            <Link to="#">
              <p>April 2023</p>
            </Link>
            <Link to="#">
              <p>May 2023</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
