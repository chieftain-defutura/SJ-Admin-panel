import React from "react";
import Layout from "../../layout";
import "./post.scss";
import { NavLink } from "react-router-dom";

interface IPostLayoutProps {
  children: React.ReactNode;
}

const Post: React.FC<IPostLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="post-header">
        <div className="post-wrap">
          <NavLink to="/post/pendingpost">
            <div className="pendingpost">
              <h2>Pending </h2>
            </div>
          </NavLink>
          <NavLink to="/post/approved">
            <div className="pendingpost">
              <h2>Approved </h2>
            </div>
          </NavLink>
          <NavLink to="/post/deny">
            <div className="pendingpost">
              <h2>Denyed </h2>
            </div>
          </NavLink>
        </div>
        <div className="layout-children">{children}</div>
      </div>
    </Layout>
  );
};

export default Post;
