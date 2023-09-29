import React from "react";
import Layout from "../../layout";
import "../../styles/productLayout.scss";
import { NavLink } from "react-router-dom";

interface IProductlayout {
  children: React.ReactNode;
}

const ProductsLayout: React.FC<IProductlayout> = ({ children }) => {
  return (
    <Layout>
      <div className="product-layout">
        <div className="mid-header">
          <NavLink to="/products/mid-level/product">
            <h2>product</h2>
          </NavLink>
          <NavLink to="/products/mid-level/accessory">
            <h2>accessory</h2>
          </NavLink>
        </div>
        <div className="children-layout">{children}</div>
      </div>
    </Layout>
  );
};

export default ProductsLayout;
