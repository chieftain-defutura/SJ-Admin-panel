import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
  // const [isActive, setIsActive] = useState(false);
  // const handleToggle = () => {
  //   setIsActive(!isActive);
  // };
  return (
    <div>
      <div className="sidebar">
        <NavLink to="/">
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/post/pendingpost">
          <p>Post</p>
        </NavLink>
        <NavLink to="/products/mid-level/product">
          <p>Products</p>
        </NavLink>
        <NavLink to="/orders/midlevel-orders/products">
          <p>Orders</p>
        </NavLink>
        <NavLink to="/delivery/midlevel-delivery/product">
          <p>Delivery</p>
        </NavLink>
        <NavLink to="/notification">
          <p>Notification</p>
        </NavLink>
        <a href="/membership">
          <p>Membership</p>
        </a>
        <a href="/account">
          <p>Account</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
