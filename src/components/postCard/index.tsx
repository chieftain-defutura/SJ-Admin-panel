import React, { useState } from "react";
import "./postCard.scss";
import Button from "../button";
import ViewDeatailModule from "../viewDetails";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { POST_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IpostData } from "../../constants/types";
import { fetchData } from "../../store/postStoreSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
const PostCard: React.FC<IpostData> = () => {
  const [isActive, setisActive] = useState(false);
  const [data, setData] = useState<IpostData[]>([]);
  const dispatch = useAppDispatch();
  const fetchedData = useAppSelector((state) => state.post);
  console.log(fetchedData);

  const handleSubmit = async () => {
    try {
      const PostRef = await getDocs(collection(db, POST_COLLECTION_NAME));
      const fetchPost = PostRef.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      console.log(fetchPost);
      setisActive(!isActive);
      setData(fetchPost);
      dispatch(fetchData({ fetchPost }));
    } catch (error) {
      console.log("Firebase error", error);
    }
  };

  const handleToggle = () => {
    setisActive(!isActive);
  };
  //   const handleApproved = () => {};
  return (
    <div>
      <div className="product-list">
        {data.map((f, index) => {
          return (
            <div className="postlist" key={index}>
              <div className="post-box">
                <h6>Post Active </h6>
              </div>

              <img src={f.productImage} alt="post-logo" />
              <div className="product-details">
                <h3>{f.username}</h3>
                <p>{f.description}</p>
                <h5>{f.hashTag}</h5>
              </div>

              <div className="button">
                <Button varient="primary" onClick={handleSubmit}>
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
