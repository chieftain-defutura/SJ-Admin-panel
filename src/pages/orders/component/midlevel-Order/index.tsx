import React from "react";
import Orders from "../..";
import "../../../delivery/component/mid-level/midlevel.scss";
import { NavLink } from "react-router-dom";

interface IOrders {
  children: React.ReactNode;
}
const MidlevelOrders: React.FC<IOrders> = ({ children }) => {
  return (
    <div>
      <Orders>
        <div className="midlevel-header">
          <div className="midlevel-wrap">
            <NavLink to="/orders/midlevel-orders/products">
              <h2>Product</h2>
            </NavLink>
            <NavLink to="/orders/midlevel-orders/accessory">
              <h2>Other accessory</h2>
            </NavLink>
          </div>
          <div className="layout-children">{children}</div>
        </div>
      </Orders>
    </div>
  );
};

export default MidlevelOrders;
