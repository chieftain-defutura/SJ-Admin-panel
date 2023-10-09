import React from "react";
import { ReactComponent as Home } from "../../../../../assets/icons/home.svg";
import { ReactComponent as PdfFile } from "../../../../../assets/icons/pdf-file.svg";
import { ReactComponent as DownloadCloud } from "../../../../../assets/icons/downloadCloud.svg";

import "./customerDetailsModal.scss";
import Button from "../../../../../components/button";

const CustomerDetailsModal: React.FC = () => {
  return (
    <div className="customer-details-wrapper">
      <div className="customer-details-container">
        <div>
          <p>Customer name</p>
          <h5>John David</h5>
        </div>
        <div>
          <p>Mobile number</p>
          <h5>8865956202</h5>
        </div>
        <div>
          <div className="flex-item">
            <Home />
            <p>Home</p>
          </div>
          <h5>Madras Christian College, East Tambaram, Chennai - 600 059.</h5>
        </div>
        <div>
          <p>Invoice pdf</p>
          <div className="flex-item icons">
            <PdfFile />
            <DownloadCloud />
          </div>
        </div>
      </div>
      <div className="dont-btn">
        <Button varient="primary">Done</Button>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
