import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/midproduct-header.scss";
import { ReactComponent as SNlogo } from "../../assets/logo/sprinklenadar-logo.svg";

const PostHeader: React.FC = () => {
  return (
    <div className="mid-product">
      <div className="mid-logo">
        <SNlogo />
      </div>
      <div className="content-section">
        <NavLink to="/post/all-post">All Post</NavLink>
        <NavLink to="/post/approved">Approved</NavLink>{" "}
        <NavLink to="/post/pending">Pending</NavLink>
      </div>
    </div>
  );
};

export default PostHeader;
