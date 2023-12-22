import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { endOfDay, startOfDay } from "date-fns";
import { db } from "../utils/firebase";
import { ORDERS_COLLECTION_NAME } from "../constants/firebaseCollection";

export const useGetPostData = ({ date }: { date?: Date }) => {
  const [data, setData] = useState<{
    postProducts: number;

    postRevenue: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      const post = collection(db, ORDERS_COLLECTION_NAME);
      const postProducts = query(
        post,
        where("type", "==", "PostLevel"),
        where("paymentStatus", "==", "SUCCESS")

        // where(
        //   "createdAt",
        //   ">=",
        //   startOfDay(date ? new Date(date) : new Date())
        // ),
        // where("createdAt", "<=", endOfDay(date ? new Date(date) : new Date())),
        // orderBy("createdAt", "asc")
      );
      const postData = await getDocs(postProducts);
      let totalPostPrice = 0;

      postData.forEach((doc) => {
        const PostData = doc.data();
        const { price } = PostData;
        totalPostPrice += Number(price);
        console.log("totalPrice", totalPostPrice);
      });

      const totalRevenue = totalPostPrice;
      console.log("totalRevenue", totalRevenue);

      setData({
        postProducts: postData.size,

        postRevenue: totalPostPrice,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  console.log(data);

  return { loading, data: data };
};
