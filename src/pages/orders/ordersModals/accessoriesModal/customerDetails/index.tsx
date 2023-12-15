import React from "react";
import { ReactComponent as Home } from "../../../../../assets/icons/home.svg";

import "./customerDetailsModal.scss";
import Button from "../../../../../components/button";
import { IUserData } from "../../../../../constants/types";
interface IUser {
  user: IUserData | undefined;
  onClose: () => void;
}

const CustomerDetailsModal: React.FC<IUser> = ({ user, onClose }) => {
  return (
    <div className="customer-details-wrapper">
      <div className="custom-details-head">
        <p>Customer details</p>
      </div>
      <div className="customer-details-container">
        <div>
          <p>Customer name</p>
          <h5>{user?.name}</h5>
        </div>
        <div>
          <p>Mobile number</p>
          <h5>{user?.phoneNo}</h5>
        </div>
        <div>
          <div className="flex-item">
            <Home />
            <p>Home</p>
          </div>
          {user?.address.map((f, i) => (
            <>
              {f.isSelected === true && (
                <h5 key={i}>
                  {f.addressOne}-{f.addressTwo}-{f.pinCode}-{f.city}
                </h5>
              )}
            </>
          ))}
        </div>
        <div>
          <p>Email</p>
          {/* <div className="flex-item icons">
            <PdfFile />
            <DownloadCloud />
          </div> */}
          <h5>{user?.email}</h5>
        </div>
      </div>
      <div className="custom-done-btn" onClick={onClose}>
        <Button varient="primary">Done</Button>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
