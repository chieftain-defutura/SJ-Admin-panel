import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { endOfDay, startOfDay } from "date-fns";
import { db } from "../utils/firebase";

import {
  ORDERS_COLLECTION_NAME,
  POST_COLLECTION_NAME,
} from "../constants/firebaseCollection";

export const useGetDashboardData = () => {
  const [data, setData] = useState<{
    midProducts: number;
    premiumProducts: number;
    postProducts: number;
    accessoryProducts: number;
    totalRevenue: number;
    midLevelRevenue: number;
    premiumRevenue: number;
    postRevenue: number;
    accessoryRevenue: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      const Mid = collection(db, ORDERS_COLLECTION_NAME);
      const midProducts = query(
        Mid,
        where("type", "==", "MidLevel"),
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date()))
      );
      const midData = await getDocs(midProducts);
      console.log("midData", midData.size);
      let totalMidPrice = 0;

      midData.forEach((doc) => {
        const midPostdata = doc.data();
        console.log("midPostdata", midPostdata);
        const { price } = midPostdata;
        totalMidPrice += Number(price);
      });

      const Premium = collection(db, ORDERS_COLLECTION_NAME);
      const premiumProducts = query(
        Premium,
        where("type", "==", "Premium-Level"),
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date())),
        orderBy("createdAt", "asc")
      );
      const premiumData = await getDocs(premiumProducts);
      console.log("premiumData", premiumData.size);
      let totalPremiumPrice = 0;
      premiumData.forEach((doc) => {
        const prePostData = doc.data();
        const { price } = prePostData;
        totalPremiumPrice += Number(price);
        console.log("totalPrice", totalPremiumPrice);
      });

      const accessory = collection(db, ORDERS_COLLECTION_NAME);
      const accessoryProducts = query(
        accessory,
        where("type", "==", "Accessory-Level"),
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date())),
        orderBy("createdAt", "asc")
      );
      const accessoryData = await getDocs(accessoryProducts);
      let totalAccessoryPrice = 0;

      accessoryData.forEach((doc) => {
        const accessoryPostData = doc.data();
        const { price } = accessoryPostData;
        totalAccessoryPrice += Number(price);
        console.log("totalPrice", totalAccessoryPrice);
      });

      const post = collection(db, POST_COLLECTION_NAME);
      const postProducts = query(
        post,
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date())),
        orderBy("createdAt", "asc")
      );
      const postData = await getDocs(postProducts);
      let totalPostPrice = 0;

      postData.forEach((doc) => {
        const PostData = doc.data();
        const { price } = PostData;
        totalPostPrice += Number(price);
        console.log("totalPrice", totalPostPrice);
      });

      const totalRevenue =
        totalAccessoryPrice +
        totalMidPrice +
        totalPostPrice +
        totalPremiumPrice;
      console.log("totalRevenue", totalRevenue);

      setData({
        midProducts: midData.size,
        postProducts: postData.size,
        premiumProducts: premiumData.size,
        accessoryProducts: accessoryData.size,
        midLevelRevenue: totalMidPrice,
        postRevenue: totalPostPrice,
        premiumRevenue: totalPremiumPrice,
        accessoryRevenue: totalAccessoryPrice,
        totalRevenue: totalRevenue,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  console.log(data);

  return { loading, data: data };
};
