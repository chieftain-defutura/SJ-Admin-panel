import React, { useState } from "react";
import { ReactComponent as DownloadCloud } from "../../../../../assets/icons/downloadCloud.svg";
import ShirtImg from "../../../../../assets/images/post-logo.png";
import ShirtTwoImg from "../../../../../assets/images/t-shirt.png";
import "./productDetailsModal.scss";
import CustomerDetailsModal from "../customerDetails";
import { IPost } from "../../../../../constants/types";

interface IDetailsdata {
  data: IPost;
  onClose: () => void;
}
const ProductDetailsModal: React.FC<IDetailsdata> = ({ data, onClose }) => {
  const [activeSection, setActiveSection] = useState("Image");

  return (
    <div className="product-details-container">
      <div className="product-details-modal-wrapper">
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
          <div className="product-items flex-item">
            <div className="product-text">
              <p>Product</p>
              <h5>{data.productName}</h5>
            </div>
            <div className="product-text">
              <p>Color</p>
              {/* <h5>{data.}</h5> */}
            </div>
            <div className="product-text">
              <p>Style</p>
              {/* <h5>{data.style.}</h5> */}
            </div>
            <div className="product-text">
              <p>Size</p>
              <h5>XXL</h5>
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
              <p>Price</p>
              <h5>{data.price} INR</h5>
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
            <div style={{ marginTop: "32px", cursor: "pointer" }}>
              <p>Details download</p>
              <DownloadCloud style={{ marginTop: "8px" }} />
            </div>
          </div>
        </div>
      </div>
      <CustomerDetailsModal />
    </div>
  );
};

export default ProductDetailsModal;
