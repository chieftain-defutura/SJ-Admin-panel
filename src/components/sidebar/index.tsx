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
        <NavLink to="/post/all-post">
          <p>Post</p>
        </NavLink>
        <NavLink to="/products/mid-level/product/styles">
          <p>Mid level</p>
        </NavLink>
        <NavLink to="/products/premium">
          <p>Premium</p>
        </NavLink>

        <NavLink to="/products/mid-level/accessory">
          <p>Other accessorey</p>
        </NavLink>
        {/* <NavLink to="/delivery/midlevel-delivery/product">
          <p>Delivery</p>
        </NavLink> */}
        {/* <NavLink to="/notification">
          <p>Notification</p>
        </NavLink> */}
        {/* <a href="/subscription">
          <p>Subscription</p>
        </a> */}
        <NavLink to="/settings">
          <p>Settings</p>
        </NavLink>
        {/* <a href="/account">
          <p>Account</p>
        </a> */}
      </div>
    </div>
  );
};

export default Sidebar;
