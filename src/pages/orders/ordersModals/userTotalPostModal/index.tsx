import React, { useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import ShirtImg from "../../../../assets/images/post-logo.png";
import ShirtTwoImg from "../../../../assets/images/t-shirt.png";
import ProfileImg from "../../../../assets/images/profile-img.png";
import "./userTotalPostModal.scss";

interface IUserTotalPostModal {
  onClose: () => void;
}

const UserTotalPostModal: React.FC<IUserTotalPostModal> = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState("Image");

  return (
    <div className="user-total-post-modal-wrapper">
      <div className="product-details-img-box">
        <div className="product-head flex-item">
          <div
            className={activeSection === "Image" ? "active" : ""}
            onClick={() => setActiveSection("Image")}
          >
            <p>Image</p>
          </div>
          <div
            className={activeSection === "Design" ? "active" : ""}
            onClick={() => setActiveSection("Design")}
          >
            <p>Design</p>
          </div>
        </div>
        {activeSection === "Image" && (
          <div className="image">
            <img src={ShirtImg} alt="" />
          </div>
        )}
        {activeSection === "Design" && (
          <div className="image">
            <img src={ShirtTwoImg} alt="" />
          </div>
        )}
      </div>
      <div className="product-wrapper">
        <div className="post-content">
          <div>
            <h4>Post design</h4>
          </div>
          <div className="time-head">
            <div className="flex-item">
              <p>Jan 23 2023</p>
              <p>11: 30 AM</p>
            </div>
            <div className="close-icon" onClick={onClose}>
              <CloseIcon />
            </div>
          </div>
        </div>
        <div className="profile-img">
          <img src={ProfileImg} alt="" />
          <p>John David</p>
        </div>
        <div className="product-items flex-item">
          <div className="product-text">
            <p>Product</p>
            <h5>Black blazer</h5>
          </div>
          <div className="product-text">
            <p>Color</p>
            <h5>Purple</h5>
          </div>
          <div className="product-text">
            <p>Size</p>
            <h5>XXL</h5>
          </div>
          <div className="product-text">
            <p>Style</p>
            <h5>Round neck</h5>
          </div>
        </div>
        <div className="price-content flex-item">
          <div className="product-text">
            <p>Text ( Front side )</p>
            <h5>
              THE T-SHIRT <br />
              MOCK-UP
            </h5>
          </div>
          <div className="product-text">
            <p>Font Style</p>
            <h5>Aa</h5>
          </div>
          <div className="product-text">
            <p>Font Color</p>
            <h5>White</h5>
          </div>
        </div>
        <div>
          <p>Detailed features</p>
          <div className="flex-item material-content">
            <div>
              <p style={{ marginTop: "14px" }}>Material</p>
              <h5 style={{ marginTop: "8px" }}>cotton 70 % cool</h5>
            </div>
            <div>
              <p>Discount</p>
              <h5 style={{ marginTop: "8px" }}>30 %</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTotalPostModal;
