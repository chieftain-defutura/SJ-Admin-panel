import React from "react";
import Post from "../..";
import PostCard from "../../../../components/postCard";

const DenyPost: React.FC = () => {
  return (
    <div className="mx">
      <Post>
        <PostCard />
      </Post>
    </div>
  );
};

export default DenyPost;
