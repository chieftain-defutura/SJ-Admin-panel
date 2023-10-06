import React from "react";
import "../layout.scss";
import Sidebar from "../../components/sidebar";
import CreateMidProductHeader from "../../components/createProductHeader";

interface ILayoutProps {
  children: React.ReactNode;
}
const CreateProductLayout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="mx">
        <div className="header">
          <CreateMidProductHeader />
        </div>
        <div className="layoutWrapper">
          <Sidebar />
          <div className="layout-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CreateProductLayout;
