import React from "react";
import "./layoutModule.scss";
import { ReactComponent as Close } from "../../assets/icons/close.svg";

interface ILayoutModule {
  children: React.ReactNode;
  handleToggle: () => void;
}
const LayoutModule: React.FC<ILayoutModule> = ({ children, handleToggle }) => {
  return (
    <div className="mx">
      <div className="product-detail">
        <div className="modal-overlay" />
        <div className="product-detail-wrap">
          <div className="close-icon" onClick={handleToggle}>
            <Close />
          </div>
          <div className="layout-module-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutModule;
