import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout";
import "../../styles/returnOrders.scss";
import "../../components/dashboard/table/table.scss";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { IReturnOrdersData } from "../../constants/types";
import ReturnOrders from "./components/ReturnOrders";
import { RETURN } from "../../constants/firebaseCollection";

const Return: React.FC = () => {
  const [returnData, setReturn] = useState<IReturnOrdersData[]>([]);
  console.log("returnData", returnData);

  const handleGetData = useCallback(() => {
    try {
      const q = query(collection(db, RETURN), where("status", "==", "pending"));
      onSnapshot(q, (queryShot) => {
        const docs = queryShot.docs.map((doc: any) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));

        setReturn(docs);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <Layout>
      <div className="return-layout">
        <h3>Return Orders</h3>

        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <span>Customer</span>
                </th>
                <th>
                  <span>Product name</span>
                </th>
                <th>
                  <span>Price</span>
                </th>
                <th>
                  <span>Status</span>
                </th>
                <th>
                  <span>Reason</span>
                </th>
                <th>
                  <span>Created</span>
                </th>
                {/* <th>
                  <span>Modifyed</span>
                </th> */}
                <th>
                  <span>Action </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {returnData.map((f, i) => (
                <ReturnOrders returnData={f} key={i} />
              ))}
            </tbody>
          </table>
        </div>

        {/*  <h1>No data</h1>
          <img src={EmptyOrder} alt="" width={500} height={500} /> */}
      </div>
    </Layout>
  );
};

export default Return;
