import React, { useState } from "react";
import "./productDetailsModal.scss";
import CustomerDetailsModal from "../customerDetails";
import { IPremiumData, IUserData } from "../../../../../constants/types";
import BgImage from "../../../../../assets/images/bg-img.png";

interface IDetailsdata {
  data: IPremiumData;
  onClose: () => void;
  user: IUserData | undefined;
}
const ProductDetailsModal: React.FC<IDetailsdata> = ({
  data,
  onClose,
  user,
}) => {
  return (
    <div className="product-details-container">
      <div className="product-details-modal-wrapper">
        <div className="product-details-img-box">
          <div className="product-head flex-item">
            <div className="Image">
              <p>Image</p>
            </div>
          </div>

          <div className="image">
            {data ? (
              <img
                src={data.productImage}
                alt=""
                style={{ objectFit: "contain" }}
              />
            ) : (
              <img src={BgImage} alt="" />
            )}
          </div>
        </div>
        <div className="product-wrapper">
          <div className="product-items flex-item">
            <div className="product-text">
              <p>Product</p>
              <h5>{data.productName ? data.productName : "--"}</h5>
            </div>

            <div className="product-text">
              <p>Style</p>
              <h5>{data.styles ? data.styles : "--"}</h5>
            </div>
            <div className="product-text">
              <p>Size</p>
              <h5>
                {data.sizes.country}-{data.sizes.sizeVarient.size}
              </h5>
            </div>
          </div>
          <div className="price-content flex-item">
            {/* <div className="product-text">
              <p>Text ( Front side )</p>
              <h5>
                {data.textAndImage.position ? data.textAndImage.position : "--"}
              </h5>
            </div> */}
            <div className="product-text">
              <p>Price</p>
              <h5>{data.price}</h5>
            </div>
            <div>
              <p>Offer Price</p>
              <h5 style={{ marginTop: "8px", textAlign: "center" }}>
                {data.offerPrice ? data.offerPrice : "--"}
              </h5>
            </div>

            {/* <div className="product-text">
              <p>Design Image Price</p>
              <h5>{data.textAndImage.rate ? data.textAndImage.rate : "--"}</h5>
            </div> */}
          </div>
          <div>
            <p>Detailed features</p>
            <div className="flex-item material-content">
              <h5>{data.description ? data.description : "--"}</h5>
            </div>
          </div>
          <div
            className="flex-item"
            style={{
              marginTop: "32px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p>Gender</p>
              <h5>{data.gender ? data.gender : "--"}</h5>
            </div>
            <div>
              <p>Payment</p>
              <h5>Status-{data.paymentStatus}</h5>
            </div>
            <div>
              <p>Gift messages</p>
              <h5 style={{ textAlign: "center" }}>
                {data.giftMessage.from}--{data.giftMessage.giftMessage}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <CustomerDetailsModal user={user} onClose={onClose} />
    </div>
  );
};

export default ProductDetailsModal;
