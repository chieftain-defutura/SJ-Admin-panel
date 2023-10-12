import React from "react";
import "./postCard.scss";
import Button from "../button";
import ViewDeatailModule from "../viewDetails";

import { IpostData } from "../../constants/types";
interface IcardData extends IpostData {
  isActive: boolean;
  handleUpdate: (e: any) => Promise<void>;
}

const PostCard: React.FC<IcardData> = ({
  textAndImage,
  productName,
  style,
  handleUpdate,
}) => {
  //   const handleApproved = () => {};
  return (
    <div>
      <div className="product-list">
        <div className="postlist">
          <div className="post-box">
            <h6>Post Active </h6>
          </div>
          <div className="post-img">
            <img src={textAndImage.image} width={200} height={200} />
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
            <Button varient="primary">View Details</Button>
            <Button varient="secondary" onClick={handleUpdate}>
              Deny
            </Button>
          </div>
          <div className="update-time">
            <p>Today</p>
            <p>2min ago</p>
          </div>
        </div>

        {/* {isActive && <ViewDeatailModule handleToggle={handleToggle} />} */}
      </div>
    </div>
  );
};

export default PostCard;
