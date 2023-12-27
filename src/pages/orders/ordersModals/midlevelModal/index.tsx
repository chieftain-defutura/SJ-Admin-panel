import React from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import ProductDetailsModal from "./productDetails";
import "../../../../styles/postModal.scss";
import { IMidLevelData, IUserData } from "../../../../constants/types";

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
  return (
    <div className="mx">
      <div className="post-modal-wrapper">
        <div className="post-modal-container flex-item">
          <div className="product">
            <p>Product details</p>
            <div className="border-bottom"></div>
          </div>
        </div>
        <div className="close-icon" onClick={onClose}>
          <CloseIcon />
        </div>

        <ProductDetailsModal onClose={onClose} data={data} user={userData} />
      </div>
    </div>
  );
};

export default MidlevelModal;
