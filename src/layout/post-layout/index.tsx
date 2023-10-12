import React from "react";
import "../layout.scss";
import Sidebar from "../../components/sidebar";
import { ILayoutProps } from "../midproduct-layout";
import PostHeader from "../../components/postHeader";

const PostLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="mx">
      <div className="header">
        <PostHeader />
      </div>
      <div className="layoutWrapper">
        <Sidebar />
        <div className="layout-children-section">{children}</div>
      </div>
    </div>
  );
};

export default PostLayout;
