import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/midproduct-header.scss";
import { ReactComponent as SNlogo } from "../../assets/logo/sprinklenadar-logo.svg";

const MidProductHeader: React.FC = () => {
  return (
    <div className="mid-product">
      <div className="mid-logo">
        <SNlogo />
      </div>
      <div className="content-section">
        <NavLink to="/products/mid-level/product/styles">Styles</NavLink>
        <NavLink to="/products/mid-level/product/image">image</NavLink>{" "}
        <NavLink to="/products/mid-level/product/text-image">
          text image
        </NavLink>
      </div>
    </div>
  );
};

export default MidProductHeader;
