import React, { useState } from "react";
import Post from "../../pages/post";
import "./pendingpost.scss";
import Button from "../button";
import { PendingData } from "../../data/pendingPost";
import ViewDeatailModule from "../viewDetails";

const PendingPost: React.FC = () => {
  const [isActive, setisActive] = useState(false);

  const handleToggle = () => {
    setisActive(!isActive);
  };
  return (
    <div className="mx">
      <Post>
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
      </Post>
    </div>
  );
};

export default PendingPost;
