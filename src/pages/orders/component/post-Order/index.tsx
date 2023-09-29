import React from "react";
import Orders from "../..";
import PostCard from "../../../../components/postCard";

const PostOrders: React.FC = () => {
  return (
    <div>
      <Orders>
        <PostCard />
      </Orders>
    </div>
  );
};

export default PostOrders;
