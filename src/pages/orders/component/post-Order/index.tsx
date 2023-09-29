import React from "react";
import Orders from "../..";
import PostCard from "../../../../components/postCard";

const PostOrders: React.FC = () => {
  return (
    <div>
      <Orders>
        <PostCard
          id={""}
          color={""}
          description={""}
          fontStyle={""}
          productName={""}
          createdAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          productImage={""}
          material={""}
          price={""}
          royalties={""}
          giftVidio={""}
          Style={""}
          fontColor={""}
          username={""}
          hashTag={""}
          updatedAt={{
            seconds: 0,
            nanoseconds: 0,
          }}
          size={[]}
          status={""}
        />
      </Orders>
    </div>
  );
};

export default PostOrders;
