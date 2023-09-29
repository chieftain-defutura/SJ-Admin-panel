import React, { useState } from "react";
import { PendingData } from "../../data/pendingPost";
import "./postCard.scss";
import Button from "../button";
import ViewDeatailModule from "../viewDetails";

const PostCard: React.FC = () => {
  const [isActive, setisActive] = useState(false);
  //   const [approve, setisApprove] = useState([]);

  const handleToggle = () => {
    setisActive(!isActive);
  };
  //   const handleApproved = () => {};
  return (
    <div>
      <div className="product-list">
        {PendingData.map((f, index) => {
          return (
            <div className="postlist" key={index}>
              <div className="post-box">
                <h6>Post Active </h6>
              </div>

              <img src={f.postimg} alt="post-logo" />
              <div className="product-details">
                <h3>{f.name}</h3>
                <p>{f.Description}</p>
                <h5>{f.hashtag}</h5>
              </div>

              <div className="button">
                <Button varient="primary" onClick={handleToggle}>
                  View Details
                </Button>
                <Button varient="secondary">Deny</Button>
              </div>
              <div className="update-time">
                <p>Today</p>
                <p>2min ago</p>
              </div>
            </div>
          );
        })}
        {isActive && <ViewDeatailModule handleToggle={handleToggle} />}
      </div>
    </div>
  );
};

export default PostCard;
