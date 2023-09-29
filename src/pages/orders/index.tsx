import React from "react";
import Layout from "../../layout";
import { NavLink } from "react-router-dom";

interface ILayoutModule {
  children: React.ReactNode;
}

const Orders: React.FC<ILayoutModule> = ({ children }) => {
  return (
    <Layout>
      <div className="delivery-header">
        <div className="delivery-wrap">
          <div>
            <NavLink to="/orders/midlevel-orders/products">
              <h2>Mid level orders details </h2>
            </NavLink>
          </div>
          <div>
            <NavLink to="/orders/premium-orders">
              <h2>Premium orders details </h2>
            </NavLink>
          </div>

          <div>
            <NavLink to="/orders/post-orders">
              <h2>Post orders details </h2>
            </NavLink>
          </div>
        </div>
        <div className="layout-children">{children}</div>
      </div>
    </Layout>
  );
};

export default Orders;
