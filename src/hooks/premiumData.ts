import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { ORDERS_COLLECTION_NAME } from "../constants/firebaseCollection";
import { endOfDay, startOfDay } from "date-fns";

export const usePremiumGetData = ({ date }: { date?: Date }) => {
  const [data, setData] = useState<{
    premiumProducts: number;
    premiumRevenue: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      const Premium = collection(db, ORDERS_COLLECTION_NAME);
      const premiumProducts = query(
        Premium,
        where("type", "==", "Premium-Level"),
        where("paymentStatus", "==", "SUCCESS")

        // where(
        //   "createdAt",
        //   ">=",
        //   startOfDay(date ? new Date(date) : new Date())
        // ),
        // where("createdAt", "<=", endOfDay(date ? new Date(date) : new Date())),
        // orderBy("createdAt", "asc")
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

      const totalRevenue = totalPremiumPrice;
      console.log("totalRevenue", totalRevenue);

      setData({
        premiumProducts: premiumData.size,

        premiumRevenue: totalPremiumPrice,
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

export const usePremiumGetChart = ({ date }: { date?: Date }) => {
  const [isDate, setIsDate] = useState<{ day: string; value: number }[]>([]);
  console.log("isDate", isDate);

  const handleGetData = useCallback(async () => {
    try {
      const today = date ? new Date(date) : new Date();
      const startOfLastWeek = startOfDay(today);
      startOfLastWeek.setDate(startOfLastWeek.getDate() - 6);

      const daysData: { [key: string]: number[] } = {};

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfLastWeek);
        currentDate.setDate(currentDate.getDate() + i);
        const dayOfWeek = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        daysData[dayOfWeek] = [];
      }

      const endOfToday = endOfDay(today);
      const Mid = collection(db, ORDERS_COLLECTION_NAME);
      const midProducts = query(
        Mid,
        where("type", "==", "Premium-Level"),
        where("createdAt", ">=", startOfLastWeek),
        where("createdAt", "<=", endOfToday),
        orderBy("createdAt", "asc")
        // where("paymentStatus", "==", "SUCCESS")
      );
      const midData = await getDocs(midProducts);

      midData.forEach((doc) => {
        const midPostdata = doc.data();
        const createdAt = midPostdata.createdAt.toDate();
        const dayOfWeek = createdAt.toLocaleDateString("en-US", {
          weekday: "long",
        });

        if (createdAt >= startOfLastWeek && createdAt <= endOfToday) {
          const { price } = midPostdata;
          daysData[dayOfWeek].push(Number(price));
        }
      });

      const totalPerDay = Object.entries(daysData).map(([day, dayData]) => ({
        day,
        value: dayData.reduce((acc, curr) => acc + curr, 0),
      }));

      setIsDate(totalPerDay);
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, date]);

  return { data: isDate };
};
