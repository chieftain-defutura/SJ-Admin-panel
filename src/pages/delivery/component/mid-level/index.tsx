import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./midlevel.scss";
import Delivery from "../..";
import { log } from "console";

interface IMidlevel {
  children: React.ReactNode;
}

const MidlevelSection: React.FC<IMidlevel> = ({ children }) => {
  return (
    <div>
      <Delivery>
        <div className="midlevel-header">
          <div className="midlevel-wrap">
            <NavLink to="/delivery/midlevel-delivery/product">
              <h2>Product</h2>
            </NavLink>
            <NavLink to="/delivery/midlevel-delivery/accessory">
              <h2>Other accessory</h2>
            </NavLink>
          </div>
          <div className="layout-children">{children}</div>
        </div>
      </Delivery>
    </div>
  );
};

export default MidlevelSection;
