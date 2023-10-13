import React, { useState } from "react";
import "./postCard.scss";
import Button from "../button";
import { IpostData } from "../../constants/types";
import ProductModule from "../productLayoutModule";
import Tshirt from "../../assets/images/post-logo.png";

interface IcardData extends IpostData {
  // isActive: boolean;
  handleUpdate: (e: any) => Promise<void>;
}

const PostCard: React.FC<IcardData> = ({
  textAndImage,
  productName,
  style,
  price,
  offerPrice,
  detailedFeatures,
  color,
  quantity,
  handleUpdate,
}) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <div className="product-list">
        <div className="postlist">
          {/* <div className="post-box">
            2<h6>Post Active </h6>
          </div> */}
          <div className="post-img">
            <img src={Tshirt} alt="textAndImage" width={200} height={200} />
          </div>
          <h3>user name</h3>

          <div className="product-details">
            <div>
              <p>Product</p>
              <h3>{productName}</h3>
            </div>
            <div>
              <p>styles</p>
              <h3>{style}</h3>
            </div>
            <p>{}</p>
          </div>

          <div className="button">
            <Button varient="primary" onClick={() => setIsActive(true)}>
              View Details
            </Button>
            <Button varient="secondary" onClick={handleUpdate}>
              Deny
            </Button>
          </div>
          <div className="update-time">
            <p>Today</p>
            <p>2min ago</p>
          </div>
        </div>

        {isActive && (
          <ProductModule handleToggle={() => setIsActive(false)}>
            <>
              <div className="view-details">
                <h3>Product image</h3>
                <div className="product-img">
                  <img src={Tshirt} alt="products" width={176} height={234} />
                </div>
              </div>
              <div className="view-details">
                <h3>Product details</h3>
                <div className="content">
                  <div>
                    <h4>Product name</h4>
                    <h3>{productName}</h3>
                  </div>
                  <div>
                    <h4>style</h4>
                    <h3>{style}</h3>
                  </div>{" "}
                  <div>
                    <h4>Normal Price</h4>
                    <h3>{price}</h3>
                  </div>
                  <div>
                    <h4>Offer Price</h4>
                    <h3>{offerPrice}</h3>
                  </div>
                  <div>
                    <h4>Font position</h4>
                    <h3>{textAndImage.position}</h3>
                  </div>
                  <div>
                    <h4>Color</h4>
                    <div
                      className="color-circle"
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        background: color,
                      }}
                    ></div>
                  </div>
                  <div>
                    <h4>Quantity</h4>
                    <h3>{quantity}</h3>
                  </div>
                </div>

                <div className="detailed-future">
                  <h4>Detailed Features</h4>
                </div>
                {detailedFeatures.map((f, i) => (
                  <div className="content-material" key={i}>
                    <div>
                      <h4>Material</h4>
                      <h3>{f.materials}</h3>
                    </div>
                    <div>
                      <h4>Cloth</h4>
                      <h3>{f.cloth}</h3>
                    </div>
                  </div>
                ))}

                <div className="edit-btn">
                  <Button varient="secondary" onClick={() => setIsActive(true)}>
                    Deny
                  </Button>
                  <Button varient="primary">Approve</Button>
                </div>
                {/* {isactive && (
                    <LayoutModule
                      handleToggle={() => setIsActive(false)}
                      className="delete-module"
                    >
                      <div className="content-delete">
                        <h3>Delete</h3>
                      </div>
                      <div className="content-delete">
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam,""
                        </p>
                      </div>
                      <div className="delete-section-btn">
                        <Button
                          varient="notifi"
                          onClick={() => setIsActive(false)}
                        >
                          Cancel
                        </Button>
                        <Button varient="primary" onClick={handleDelete}>
                          Done
                        </Button>
                      </div>
                    </LayoutModule>
                  )} */}
              </div>
            </>
          </ProductModule>
        )}
      </div>
    </div>
  );
};

export default PostCard;
