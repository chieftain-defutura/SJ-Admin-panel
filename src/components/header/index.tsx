import React, { useState } from "react";
import "./header.scss";
import { ReactComponent as SJlogo } from "../../assets/icons/sjlogo.svg";
import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";
import { ReactComponent as Users } from "../../assets/icons/users.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [active, setActive] = useState(false);
  const handleActive = () => {
    setActive(true);
  };
  return (
    <div className="header-wrap">
      <a href="/">
        <div className="logo">
          <SJlogo />
          <SNlogo />
        </div>
      </a>
      <div className="drop-down" onClick={() => handleActive()}>
        <div className="username">
          <p>Sprinkle</p>
          <p>sprinklenadar@gmail.com</p>
        </div>
        <div className="userprofile">
          <h2>S</h2>
        </div>
        {active && (
          <div className="dropdown-card">
            <div className="heading">
              <h3>Account</h3>
              <div className="userprofile">
                <h2>S</h2>
              </div>
            </div>
            <div className="admin-name">
              <p>Username</p>
              <h2>Sprinkle</h2>
            </div>
            <div className="admin-name">
              <p>Email ID</p>
              <h2>sprinklenadar@gmail.com</h2>
            </div>
            <Link to="/admin-management">
              <div className="admin-details">
                <h2>Admin management</h2>
                <Users />
              </div>
            </Link>
            <div className="admin-details">
              <h2>Logout</h2>
              <Logout />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
