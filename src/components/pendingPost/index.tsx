import React from "react";
import Post from "../../pages/post";
import "./pendingpost.scss";
import PostDesign from "../../assets/images/post-logo.png";

const PendingPost: React.FC = () => {
  return (
    <div className="mx">
      <Post>
        <div className="postlist">
          <div className="post-box">
            <p>Post Active </p>
          </div>
          <img src={PostDesign} alt="post-logo" />
          <div className="product-details">
            <h2>Jhon Dravid</h2>
            <p>Imperdiet in sit rhoncus , eleifend tellus augue lec ... more</p>
            <h5>#Round neck</h5>
          </div>
        </div>
      </Post>
    </div>
  );
};

export default PendingPost;
