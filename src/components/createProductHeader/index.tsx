import React from "react";
import "../../styles/midproduct-header.scss";

import { ReactComponent as SNlogo } from "../../assets/icons/sn-logo.svg";

const CreateMidProductHeader = () => {
  return (
    <div className="mid-product">
      <div className="mid-logo">
        <SNlogo />
      </div>
      <div className="content-section">
        <h3>Styles</h3>
      </div>
    </div>
  );
};

export default CreateMidProductHeader;
