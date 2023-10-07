import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/midproduct-header.scss";
import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";

const PremiumHeader: React.FC = () => {
  return (
    <div className="mid-product">
      <div className="mid-logo">
        <SNlogo />
      </div>
      <div className="content-section">
        <NavLink to="#">Styles</NavLink>
      </div>
    </div>
  );
};

export default PremiumHeader;
