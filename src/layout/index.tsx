import React from "react";
import "./layout.scss";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mx">
        <div className="header">
          <Header />
        </div>
        <div className="layoutWrapper">
          <Sidebar />
          <div className="layout-children">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
