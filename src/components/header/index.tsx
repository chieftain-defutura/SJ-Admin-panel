import React, { useState } from "react";
import "./header.scss";
import { ReactComponent as Logo } from "../../assets/logo/sprinklenadar-logo.svg";

import { ReactComponent as Users } from "../../assets/icons/users.svg";
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAdminStore } from "../../store/adminUser";

const Header: React.FC = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const adminDetails = useAdminStore((user) => user.adminDetails);
  const handleActive = () => {
    setActive(!active);
  };
  const handleSignout = () => {
    signOut(auth).then(() => {
      window.location.reload();
      navigate("/login");
    });
  };
  return (
    <div className="header-wrap">
      <a href="/">
        <div className="logo">
          <Logo />
        </div>
      </a>
      <div className="drop-down" onClick={() => handleActive()}>
        <div className="username">
          <p>Sprinkle</p>
          <h5>{adminDetails?.email}</h5>
        </div>
        <div className="userprofile">
          <h2>{adminDetails?.email?.slice(0, 1)}</h2>
        </div>
        {active && (
          <div className="dropdown-card">
            <div className="heading">
              <h3>Account</h3>
              <div className="userprofile">
                <h2>{adminDetails?.email?.slice(0, 1)}</h2>
              </div>
            </div>
            <div className="admin-name">
              <p>Username</p>
              <h2>Sprinkle</h2>
            </div>
            <div className="admin-name">
              <p>Email ID</p>
              <h2>{adminDetails?.email}</h2>
            </div>
            <Link to="/admin-management">
              <div className="admin-details">
                <h2>Admin management</h2>
                <Users />
              </div>
            </Link>
            <div className="admin-details" onClick={handleSignout}>
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
