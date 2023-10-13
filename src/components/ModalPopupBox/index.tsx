import React from "react";
import "./ModalPopupBox.scss";

const MOdalPopUp: React.FC = () => {
  return (
    <div className="modalbox">
      <div className="modal-overlay" />
      <div className="modalbox-content">
        <span className="loadercircle"></span>
        <h3>Uploading...</h3>
      </div>
    </div>
  );
};

export default MOdalPopUp;
