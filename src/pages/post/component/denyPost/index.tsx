import React from "react";
import Post from "../..";
import PostCard from "../../../../components/postCard";

const DenyPost: React.FC = () => {
  return (
    <div className="mx">
      <Post>
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
      </Post>
    </div>
  );
};

export default DenyPost;
