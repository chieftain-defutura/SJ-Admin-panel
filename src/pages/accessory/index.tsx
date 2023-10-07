import React from "react";
import PremiumLayout from "../../layout/premium-layout";
import { NavLink } from "react-router-dom";

const AccessoryHome: React.FC = () => {
  return (
    <PremiumLayout>
      <div className="product-layout">
        <div className="mid-header">
          <NavLink to="/products/accessory/create">
            <h4>Add style</h4>
          </NavLink>
        </div>
      </div>
    </PremiumLayout>
  );
};

export default AccessoryHome;
