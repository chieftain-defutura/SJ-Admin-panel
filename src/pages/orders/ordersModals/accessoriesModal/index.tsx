import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import DeliveryDetailsModal from "./deliveryDetails";
import ProductDetailsModal from "./productDetails";
import "../../../../styles/postModal.scss";
import { IAccessoryLevel, IUserData } from "../../../../constants/types";

interface IAccessoriesModal {
  onClose: () => void;
  data: IAccessoryLevel;
  user: IUserData | undefined;
}

const AccessoriesModal: React.FC<IAccessoriesModal> = ({
  onClose,
  data,
  user,
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
          <ProductDetailsModal data={data} user={user} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default AccessoriesModal;
