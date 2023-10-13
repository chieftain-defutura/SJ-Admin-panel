import React from "react";
import "./header.scss";
import { ReactComponent as SJlogo } from "../../assets/icons/sjlogo.svg";
import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";
const Header: React.FC = () => {
  return (
    <div className="header-wrap">
      <a href="/">
        <div className="logo">
          <SJlogo />
          <SNlogo />
        </div>
      </a>
      <div className="drop-down"></div>
    </div>
  );
};

export default Header;
