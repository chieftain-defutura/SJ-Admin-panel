import React from "react";
import Post from "../..";
import PostCard from "../../../../components/postCard";

const ApprovedPost: React.FC = () => {
  return (
    <div className="mx">
      <Post>
        <PostCard />
      </Post>
    </div>
  );
};

export default ApprovedPost;
