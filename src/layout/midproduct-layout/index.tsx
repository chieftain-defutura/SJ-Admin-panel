import React from "react";
import "../layout.scss";
import Sidebar from "../../components/sidebar";
import MidProductHeader from "../../components/midProduct-header";

export interface ILayoutProps {
  children: React.ReactNode;
}

const MidprodcutLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="mx">
        <div className="header">
          <MidProductHeader />
        </div>
        <div className="layoutWrapper">
          <Sidebar />
          <div className="layout-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MidprodcutLayout;
