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
        where("paymentStatus", "==", "SUCCESS")

        // where(
        //   "createdAt",
        //   ">=",
        //   startOfDay(date ? new Date(date) : new Date())
        // ),
        // where("createdAt", "<=", endOfDay(date ? new Date(date) : new Date())),
        // orderBy("createdAt", "asc")
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
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  console.log(data);

  return { loading, data: data };
};

export const useGetAccessoryChart = ({ date }: { date?: Date }) => {
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
        where("type", "==", "Accessory-Level"),
        // where("paymentStatus", "==", "SUCCESS"),

        where("createdAt", ">=", startOfLastWeek),
        where("createdAt", "<=", endOfToday),
        orderBy("createdAt", "asc")
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

export const useGetAccessoryYearChartData = ({ date }: { date?: Date }) => {
  const [isyear, setisYear] = useState<{ month: string; value: number }[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      const today = date ? new Date(date) : new Date();
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      const startOfTwelveMonthsAgo = new Date(today);
      startOfTwelveMonthsAgo.setFullYear(
        startOfTwelveMonthsAgo.getFullYear() - 1
      );
      startOfTwelveMonthsAgo.setDate(1);

      const monthsData: { [key: string]: number[] } = {};

      for (let i = 0; i < 12; i++) {
        const currentMonth = new Date(startOfTwelveMonthsAgo);
        currentMonth.setMonth(currentMonth.getMonth() + i);
        const monthLabel = currentMonth.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        monthsData[monthLabel] = [];
      }

      const Mid = collection(db, ORDERS_COLLECTION_NAME);
      const midProducts = query(
        Mid,
        // Add your necessary where conditions here
        where("type", "==", "Accessory-Level"),

        where("createdAt", ">=", startOfTwelveMonthsAgo),
        where("createdAt", "<=", endOfLastMonth),
        orderBy("createdAt", "asc")
      );
      const midData = await getDocs(midProducts);

      midData.forEach((doc) => {
        const midPostdata = doc.data();
        const createdAt = midPostdata.createdAt.toDate();
        const monthLabel = createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });

        if (
          createdAt >= startOfTwelveMonthsAgo &&
          createdAt <= endOfLastMonth
        ) {
          const { price } = midPostdata;
          monthsData[monthLabel].push(Number(price));
        }
      });

      const totalPerMonth = Object.entries(monthsData).map(
        ([month, monthData]) => ({
          month: month.slice(0, 3),
          // month,
          value: monthData.reduce((acc, curr) => acc + curr, 0),
        })
      );

      setisYear(totalPerMonth);
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, date]);

  return { data: isyear };
};

export const useGetAccessoryWeekChartData = ({ date }: { date?: Date }) => {
  const [isDate, setIsDate] = useState<{ week: string; value: number }[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      const today = date ? new Date(date) : new Date();
      const startOfFourthWeekAgo = new Date(today);
      startOfFourthWeekAgo.setDate(startOfFourthWeekAgo.getDate() - 27); // 4 weeks * 7 days - 1 day for offset

      const weeksData: { [key: string]: number[] } = {};

      for (let i = 0; i < 4; i++) {
        const currentWeekStart = new Date(startOfFourthWeekAgo);
        currentWeekStart.setDate(currentWeekStart.getDate() + i * 7);
        const currentWeekEnd = new Date(currentWeekStart);
        currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);
        const weekLabel = `${currentWeekStart.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })} - ${currentWeekEnd.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}`;

        weeksData[weekLabel] = [];
      }

      const Mid = collection(db, ORDERS_COLLECTION_NAME);
      const midProducts = query(
        Mid,
        // Add your necessary where conditions here
        where("type", "==", "Accessory-Level"),

        where("createdAt", ">=", startOfFourthWeekAgo),
        where("createdAt", "<=", today),
        orderBy("createdAt", "asc")
      );
      const midData = await getDocs(midProducts);

      midData.forEach((doc) => {
        const midPostdata = doc.data();
        const createdAt = midPostdata.createdAt.toDate();

        for (let i = 0; i < 4; i++) {
          const currentWeekStart = new Date(startOfFourthWeekAgo);
          currentWeekStart.setDate(currentWeekStart.getDate() + i * 7);
          const currentWeekEnd = new Date(currentWeekStart);
          currentWeekEnd.setDate(currentWeekEnd.getDate() + 6);

          if (createdAt >= currentWeekStart && createdAt <= currentWeekEnd) {
            const weekLabel = `${currentWeekStart.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })} - ${currentWeekEnd.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}`;
            const { price } = midPostdata;
            weeksData[weekLabel].push(Number(price));
            break;
          }
        }
      });

      const totalPerWeek = Object.entries(weeksData).map(
        ([week, weekData]) => ({
          week,
          value: weekData.reduce((acc, curr) => acc + curr, 0),
        })
      );

      setIsDate(totalPerWeek);
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData, date]);

  return { data: isDate };
};
