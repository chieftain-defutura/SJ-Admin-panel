import React, { useState } from "react";
import Post from "../..";
import "./pendingpost.scss";
import Button from "../../../../components/button";
import ViewDeatailModule from "../../../../components/viewDetails";
import PostCard from "../../../../components/postCard";

const PendingPost: React.FC = () => {
  const [isActive, setisActive] = useState(false);
  const [approve, setisApprove] = useState([]);

  const handleToggle = () => {
    setisActive(!isActive);
    setisApprove(approve);
  };
  return (
    <div className="mx">
      <Post>
        <PostCard />
      </Post>
    </div>
  );
};

export default PendingPost;
