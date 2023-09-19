import React from "react";
import "./viewDetailsModule.scss";
import Tshirt from "../../assets/images/t-shirt.png";
import Design from "../../assets/images/post-logo.png";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../button";

interface IData {
  handleToggle: () => void;
}

const ViewDeatailModule: React.FC<IData> = ({ handleToggle }) => {
  return (
    <div className="mx">
      <div className="product-detail">
        <div className="modal-overlay" />
        <div className="product-detail-wrap">
          <div className="close-icon" onClick={handleToggle}>
            <Close />
          </div>
          <div className="modal-wrap">
            <div className="product-img">
              <h3>Product Details</h3>
              <div className="product-border">
                <img src={Tshirt} alt="tshirt-img" />
              </div>
            </div>
            <div className="view-detail-wrap">
              <div className="view-details">
                <div className="user-detail">
                  <h2>Product</h2>
                  <h3>John David</h3>
                </div>
                <div className="user-detail">
                  <h2>Style</h2>
                  <h3>John David</h3>
                </div>
                <div className="user-detail">
                  <h2>Design</h2>
                  <img src={Design} alt="Design" width="100px" height="100px" />
                </div>
              </div>
              <div className="view-details">
                <div className="user-detail">
                  <h2>Color</h2>
                  <h3>Purple</h3>
                </div>
                <div className="user-detail">
                  <h2>Text( Not side )</h2>
                  <h3>No text</h3>
                </div>
                <div className="user-detail">
                  <h2>Font style</h2>
                  <h3>No style</h3>
                </div>
                <div className="user-detail">
                  <h2>Company tag</h2>
                  <h3>No style</h3>
                </div>
              </div>{" "}
              <div className="view-details">
                <div className="user-detail">
                  <h2>Material</h2>
                  <h3>100% Cotton</h3>
                </div>
                <div className="user-detail">
                  <h2>Font color</h2>
                  <h3>No color</h3>
                </div>
                <div className="user-detail">
                  <h2>Post Active</h2>
                </div>
                <div className="user-detail">
                  <h2>Price</h2>
                  <h3>300 INR</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="hashtag-wrap">
            <div className="description">
              <h2>Imperdiet in sit rhoncus , eleifend tellus augue lec .</h2>
              <div className="hashtag">
                <li>#Round neck</li>
                <li>#Round neck</li>
                <li>#Round neck</li>
                <li>#Round neck</li>
                <li>#Round neck</li>
              </div>
            </div>
            <div className="approve-btn">
              <Button varient="primary">Approve</Button>
              <Button varient="secondary">Denied</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeatailModule;
