import React, { useState } from "react";
import "./header.scss";
import { ReactComponent as SJlogo } from "../../assets/icons/sjlogo.svg";
import { ReactComponent as TopChevronDown } from "../../assets/icons/top-chevron-down.svg";
import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";
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
            <p>March 2023</p>
            <p>April 2023</p>
            <p>May 2023</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
