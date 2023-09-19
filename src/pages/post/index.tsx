import React from "react";
import Layout from "../../layout";
import "./post.scss";
import { Link } from "react-router-dom";

interface IPostLayoutProps {
  children: React.ReactNode;
}

const Post: React.FC<IPostLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <div className="post-wrap">
        <Link to="/post/pendingpost">
          <div className="pendingpost">
            <h2>Pending </h2>
          </div>
        </Link>
        <Link to="/post/approved">
          <div className="pendingpost">
            <h2>Approved </h2>
          </div>
        </Link>
        <Link to="/post/deny">
          <div className="pendingpost">
            <h2>Denyed </h2>
          </div>
        </Link>
      </div>
      <div className="layout-children">{children}</div>
    </Layout>
  );
};

export default Post;
