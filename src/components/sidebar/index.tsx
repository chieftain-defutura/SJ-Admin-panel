import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar: React.FC = () => {
  // const [isActive, setIsActive] = useState(false);
  // const handleToggle = () => {
  //   setIsActive(!isActive);
  // };
  return (
    <div>
      <div className="sidebar">
        <Link to="/">
          <p>Dashboard</p>
        </Link>
        <Link to="/post">
          <p>Post</p>
        </Link>
        <a href="/category">
          <p>Category</p>
        </a>
        <a href="/orders">
          <p>Orders</p>
        </a>
        <a href="/delivery">
          <p>Delivery</p>
        </a>
        <a href="/notification">
          <p>Notification</p>
        </a>
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
