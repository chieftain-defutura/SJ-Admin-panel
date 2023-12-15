import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import ProductDetailsModal from "./productDetails";
import "../../../../styles/postModal.scss";
import { IMidLevelData, IUserData } from "../../../../constants/types";
import DeliveryDetailsModal from "./deliveryDetails";

interface IMidlevelModal {
  onClose: () => void;
  data: IMidLevelData;
  userData: IUserData | undefined;
}

const MidlevelModal: React.FC<IMidlevelModal> = ({
  onClose,
  data,
  userData,
}) => {
  const [activeSection, setActiveSection] = useState("product");

  const handleProductClick = () => {
    setActiveSection("product");
  };

  const handleDeliveryClick = () => {
    setActiveSection("delivery");
  };

  return (
    <div className="mx">
      <div className="post-modal-wrapper">
        <div className="post-modal-container flex-item">
          <div
            className={activeSection === "product" ? "active" : ""}
            onClick={handleProductClick}
          >
            <p>Product details</p>
            <div className="border-bottom"></div>
          </div>

          <div
            className={activeSection === "delivery" ? "active" : ""}
            onClick={handleDeliveryClick}
          >
            <p>Delivery status</p>
            <div className="border-bottom"></div>
          </div>
        </div>
        <div className="close-icon" onClick={onClose}>
          <CloseIcon />
        </div>

        {activeSection === "delivery" && <DeliveryDetailsModal data={data} />}
        {activeSection === "product" && (
          <ProductDetailsModal onClose={onClose} data={data} user={userData} />
        )}
      </div>
    </div>
  );
};

export default MidlevelModal;
