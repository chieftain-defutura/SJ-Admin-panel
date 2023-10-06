import React from "react";
import "../layout.scss";
import Sidebar from "../../components/sidebar";
import PremiumHeader from "../../components/premiumHeader";

interface ILayoutProps {
  children: React.ReactNode;
}

const PremiumLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="mx">
        <div className="header">
          <PremiumHeader />
        </div>
        <div className="layoutWrapper">
          <Sidebar />
          <div className="layout-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PremiumLayout;
