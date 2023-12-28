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
import { getDoc, doc } from "firebase/firestore";
import { ORDERS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";

interface IReturnOrders {
  returnData: IReturnOrdersData;
}
const ReturnOrders: React.FC<IReturnOrders> = ({ returnData }) => {
  const [active, setActive] = useState(false);
  const [address, setAddress] = useState(false);
  const [statusUpdate, setStatusIpdate] = useState(false);
  const [orderData, setOrderData] = useState<IMidLevelData | undefined>();
  const [userData, setUserData] = useState<IUserData>();
  // const user = doc(db, "users",orderData?.userId);
  console.log(userData);

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

  const handleGetData = useCallback(async () => {
    try {
      if (!orderData) return;
      const user = doc(db, "users", orderData.userId);
      const userDocumentSnapshot = await getDoc(user);

      if (userDocumentSnapshot.exists()) {
        const data = userDocumentSnapshot.data();
        console.log("Document dataa:", data);
        setUserData(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    handleGetData();
  }, [fetchData, handleGetData]);

  return (
    <tr>
      {/* <td>{orderData?.userId}</td> */}

      <td>{userData?.name}</td>

      <td>{orderData?.productName}</td>
      <td>
        {returnData && returnData.createdAt
          ? returnData.createdAt.toDate().toISOString().split("T")[0]
          : "No date"}
      </td>
      <td>{returnData?.status}</td>

      <td>
        <Button varient="primary" onClick={() => setActive(true)}>
          View
        </Button>
      </td>

      <td>
        <Button varient="primary" onClick={() => setAddress(true)}>
          View
        </Button>
      </td>
      <td>
        <Button varient="primary" onClick={handleToggle}>
          View
        </Button>
      </td>
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
      {address && (
        <LayoutModule handleToggle={() => setAddress(false)}>
          <div className="address">
            <div className="close">
              <h4>Reasons</h4>
              <div onClick={() => setAddress(false)}>
                <Close />
              </div>
            </div>

            <div className="user">
              <div>
                <h5>Customer name</h5>
                <p>{userData?.name}</p>
              </div>
              <div>
                <h5>Mobile</h5>
                <p>{userData?.phoneNo}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{userData?.email}</p>
              </div>
            </div>
            <div className="user">
              <div>
                <h5>Address</h5>

                {userData?.address.map((f, i) => (
                  <>
                    <div>
                      {f.isSelected === true && (
                        <>
                          <p>{f.name},</p>
                          <p>
                            {f.addressOne ? f.addressOne : f.addressTwo},
                            {f.floor},{f.city}-{f.pinCode},{f.country}
                          </p>
                        </>
                      )}
                    </div>
                  </>
                ))}
              </div>
            </div>
            {/* <div className="user">
                <div><h5></h5></div>
              </div> */}
          </div>
        </LayoutModule>
      )}
      {statusUpdate && (
        <LayoutModule handleToggle={handleToggle}>
          <StatusUpdate data={returnData} setStatusIpdate={setStatusIpdate} />
        </LayoutModule>
      )}
    </tr>
  );
};

export default ReturnOrders;
