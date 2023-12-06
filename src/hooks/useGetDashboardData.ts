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

      midData.forEach((i) => {
        const midPostdata = i.data();

        console.log("midPostdata", midPostdata);
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

      const accessory = collection(db, ORDERS_COLLECTION_NAME);
      const accessoryProducts = query(
        accessory,
        where("type", "==", "Accessory-Level"),
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date())),
        orderBy("createdAt", "asc")
      );
      const accessoryData = await getDocs(accessoryProducts);

      const post = collection(db, POST_COLLECTION_NAME);
      const postProducts = query(
        post,
        where("createdAt", ">=", startOfDay(new Date())),
        where("createdAt", "<=", endOfDay(new Date())),
        orderBy("createdAt", "asc")
      );
      const postData = await getDocs(postProducts);

      setData({
        midProducts: midData.size,
        postProducts: postData.size,
        premiumProducts: premiumData.size,
        accessoryProducts: accessoryData.size,
        midLevelRevenue: 0,
        postRevenue: 0,
        premiumRevenue: 0,
        accessoryRevenue: 0,
        totalRevenue: 0,
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
