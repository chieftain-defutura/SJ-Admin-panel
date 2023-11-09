import React, { useCallback, useEffect, useState } from "react";
import PostCard from "../../../../components/postCard";
import PostLayout from "../../../../layout/post-layout";
import { IpostData } from "../../../../constants/types";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { POST_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import Loading from "../../../../components/loading";

const Allpost: React.FC = () => {
  const [data, setData] = useState<IpostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // const dispatch = useAppDispatch();
  // const fetchedData = useAppSelector((state) => state.post);
  console.log(data);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      const updateRef = doc(db, POST_COLLECTION_NAME);

      await updateDoc(updateRef, {
        status: "pending",
      });
      console.log(updateRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const productData = query(
        collection(db, POST_COLLECTION_NAME),
        where("status", "==", "pending")
      );
      const data = await getDocs(productData);
      const fetchedData = data.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);
  return (
    <div className="mx">
      {isLoading ? (
        <Loading />
      ) : (
        <PostLayout>
          {data.map((f, i) => (
            <>
              <PostCard handleUpdate={handleUpdate} {...f} key={i} />
            </>
          ))}
        </PostLayout>
      )}
    </div>
  );
};

export default Allpost;
