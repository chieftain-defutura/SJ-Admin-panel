import React from "react";
import "../../styles/productModule.scss";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
interface IProductLayoutModule {
  children: React.ReactNode;
  className?: string;
  handleToggle: () => void;
}
const ProductModule: React.FC<IProductLayoutModule> = ({
  children,
  className,
  handleToggle,
}) => {
  return (
    <div className="mx">
      <div className="product-detail-section">
        <div className="modal-overlay " onClick={handleToggle} />
        <div className={`product-detail-wrap ${className} `}>
          <div className="close-icon" onClick={handleToggle}>
            <Close />
          </div>
          {children}
          {/* <div className="product-preview-img"></div>

          <div className="product-preview">
           
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductModule;
