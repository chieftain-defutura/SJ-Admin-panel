import React, { useCallback, useEffect, useState } from "react";
import PostCard from "../../../../components/postCard";
import PostLayout from "../../../../layout/post-layout";
import { IpostData } from "../../../../constants/types";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore/lite";
import { db } from "../../../../utils/firebase";
import { POST_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { fetchData } from "../../../../store/postStoreSlice";

const PendingPost: React.FC<IpostData> = ({ userId }) => {
  const [isActive, setisActive] = useState(false);
  const [data, setData] = useState<IpostData[]>([]);
  const dispatch = useAppDispatch();
  const fetchedData = useAppSelector((state) => state.post);
  console.log(fetchedData);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const updateRef = doc(db, POST_COLLECTION_NAME, userId);

      await updateDoc(updateRef, {
        status: "pending",
      });
    } catch (error) {}
  };
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

  return (
    <div className="mx">
      <PostLayout>
        {data.map((f, i) => (
          <PostCard
            isActive={isActive}
            handleUpdate={handleUpdate}
            {...f}
            key={i}
          />
        ))}
      </PostLayout>
    </div>
  );
};

export default PendingPost;
