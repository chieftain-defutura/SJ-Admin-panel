import React from "react";
import "./header.scss";
import { ReactComponent as Logo } from "../../assets/logo/logo.svg";
const Header: React.FC = () => {
  return (
    <div className="header-wrap">
      <a href="/">
        <div className="logo">
          <Logo />
        </div>
      </a>
      <div className="drop-down"></div>
    </div>
  );
};

export default Header;
