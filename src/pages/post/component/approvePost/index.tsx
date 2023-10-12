import React, { useCallback, useEffect, useState } from "react";
import PostCard from "../../../../components/postCard";
import PostLayout from "../../../../layout/post-layout";
import { IpostData } from "../../../../constants/types";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../utils/firebase";
import { POST_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { fetchData } from "../../../../store/postStoreSlice";

const ApprovedPost: React.FC = () => {
  const [isActive, setisActive] = useState(false);
  const [data, setData] = useState<IpostData[]>([]);
  const dispatch = useAppDispatch();
  const fetchedData = useAppSelector((state) => state.post);
  console.log(fetchedData);

  const handleGetData = useCallback(async () => {
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
  }, [setData, dispatch, isActive]);
  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const updateRef = doc(db, POST_COLLECTION_NAME);

      await updateDoc(updateRef, {
        status: "pending",
      });
    } catch (error) {}
  };
  return (
    <div className="mx">
      <PostLayout>
        <h1>hello</h1>
        {data.map((f, i) => (
          <PostCard handleUpdate={handleUpdate} {...f} key={i} />
        ))}
      </PostLayout>
    </div>
  );
};

export default ApprovedPost;
