import React from "react";
import Post from "../..";
import PostCard from "../../../../components/postCard";

interface IpostData {
  id: string;
  color: string;
  description: string;
  fontStyle: string;
  productName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  productImage: string;
  material: string;
  price: string;
  royalties: string;
  giftVidio: string;
  Style: string;
  fontColor: string;
  username: string;
  hashTag: string;
  updatedAt: {
    seconds: number;
    nanoseconds: number;
  };
  size: string[];
  status: string;
}
const ApprovedPost: React.FC<IpostData> = () => {
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

export default ApprovedPost;
