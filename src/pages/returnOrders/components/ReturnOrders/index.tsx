import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../../components/button";
import {
  IMidLevelData,
  IProductdata,
  IReturnOrdersData,
  IUserData,
} from "../../../../constants/types";
import LayoutModule from "../../../../components/layoutModule";
import { ReactComponent as Close } from "../../../../assets/icons/close.svg";
import BG from "../../../../assets/images/bg-img.png";
import StatusUpdate from "../statusUpdate";
import {
  query,
  collection,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import {
  ORDERS_COLLECTION_NAME,
  RETURN,
} from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";

interface IReturnOrders {
  returnData: IReturnOrdersData;
}
const ReturnOrders: React.FC<IReturnOrders> = ({ returnData }) => {
  const [active, setActive] = useState(false);
  const [orderData, setOrderData] = useState<IMidLevelData>();
  const [userData, setUserData] = useState<IUserData>();
  const [statusUpdate, setStatusIpdate] = useState(false);
  // const user = doc(db, "users",orderData?.userId);

  const handleToggle = () => {
    setStatusIpdate(!statusUpdate);
  };

  const fetchData = useCallback(async () => {
    try {
      // setLoading(true);
      const docRef = doc(db, ORDERS_COLLECTION_NAME, returnData.orderId);

      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        console.log("Document dataa:", data);
        setOrderData(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    } finally {
      // setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleGetData = useCallback(async () => {
  //   try {

  //     const userDocumentSnapshot = await getDoc(user);

  //     if (userDocumentSnapshot.exists()) {
  //       const data = userDocumentSnapshot.data();
  //       console.log("Document dataa:", data);
  //       setUserData(data as any);
  //     } else {
  //       console.log("Document does not exist.");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <tr>
      {/* <td>{orderData?.userId}</td> */}
      <td>vicky</td>
      <td>{orderData?.productName}</td>
      <td>{orderData?.offerPrice ? orderData.offerPrice : orderData?.price}</td>

      <td>{returnData?.status}</td>

      <td>
        <Button varient="primary" onClick={() => setActive(true)}>
          View
        </Button>
      </td>
      <td>
        {returnData && returnData.createdAt
          ? returnData.createdAt.toDate().toISOString().split("T")[0]
          : "No date"}
      </td>
      {/* <td>
        {returnData && returnData.updatedAt
          ? returnData.updatedAt.toDate().toISOString().split("T")[0]
          : "No date"}
      </td> */}
      <td>
        <Button varient="primary" onClick={handleToggle}>
          View
        </Button>
      </td>
      {statusUpdate && (
        <LayoutModule handleToggle={handleToggle}>
          <StatusUpdate data={returnData} setStatusIpdate={setStatusIpdate} />
        </LayoutModule>
      )}
      {active && (
        <LayoutModule handleToggle={() => setActive(false)}>
          <div className="return-module">
            <div className="close">
              <h4>Reasons</h4>
              <div onClick={() => setActive(false)}>
                <Close />
              </div>
            </div>
            <div className="details">
              <div className="return-img">
                {returnData?.Image ? (
                  <img
                    src={returnData?.Image}
                    alt=""
                    width={150}
                    height={100}
                  />
                ) : (
                  <img src={BG} alt="" />
                )}
              </div>
              <div className="contents">
                <div>
                  <h5>Product name</h5>
                  <p>{orderData?.productName}</p>
                </div>
                <div>
                  <h5>Size</h5>
                  <p>
                    {orderData?.sizes.country}-
                    {orderData?.sizes.sizeVarient.size}
                  </p>
                </div>
                <div>
                  <h5>Total </h5>
                  <p>{orderData?.totalamount}</p>
                </div>
                <div>
                  <strong>
                    <h5>Price</h5>
                  </strong>
                  <p>
                    {orderData?.offerPrice
                      ? orderData.offerPrice
                      : orderData?.price}
                    <span>INR</span>
                  </p>
                </div>
                <div>
                  <h5>Issues</h5>
                  <p>{returnData?.issues}</p>
                </div>
                <div className="discriprition">
                  <h5>Discription</h5>
                  <p>{returnData?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </LayoutModule>
      )}
    </tr>
  );
};

export default ReturnOrders;
