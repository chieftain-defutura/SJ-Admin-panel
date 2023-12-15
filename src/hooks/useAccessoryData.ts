import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { endOfDay, startOfDay } from "date-fns";
import { db } from "../utils/firebase";
import { ORDERS_COLLECTION_NAME } from "../constants/firebaseCollection";

export const useGetAccessoryData = ({ date }: { date?: Date }) => {
  const [data, setData] = useState<{
    accessoryProducts: number;

    accessoryRevenue: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      const accessory = collection(db, ORDERS_COLLECTION_NAME);
      const accessoryProducts = query(
        accessory,
        where("type", "==", "Accessory-Level"),
        where(
          "createdAt",
          ">=",
          startOfDay(date ? new Date(date) : new Date())
        ),
        where("createdAt", "<=", endOfDay(date ? new Date(date) : new Date())),
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
      const totalRevenue = totalAccessoryPrice;

      console.log("totalRevenue", totalRevenue);

      setData({
        accessoryProducts: accessoryData.size,

        accessoryRevenue: totalAccessoryPrice,
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
