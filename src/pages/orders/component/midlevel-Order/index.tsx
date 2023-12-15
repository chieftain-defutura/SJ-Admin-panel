import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
import LayoutModule from "../../../../components/layoutModule";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import Chart from "../../../../components/Chart";
import Button from "../../../../components/button";
import Layout from "../../../../layout";
import "../../../../styles/postOrder.scss";
import {
  IMidLevelData,
  IOrdersCategory,
  IUserData,
} from "../../../../constants/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MidLevelPdf from "../../../../components/PdfFile/MidLevelPdf";
import MidlevelModal from "../../ordersModals/midlevelModal";
import {
  orderPlacedQueryMid,
  manufacturingQueryMid,
  readyToShipQueryMid,
  shippingQueryMid,
  deliveryQueryMid,
} from "../../../../utils/query";
import Loading from "../../../../components/loading";
import Loader from "../../../../components/Loader";
import User from "../../../../assets/icons/user.jpg";
import MidCard from "../../../../components/dashboard/midLevelCard";

const datas = {
  heading: "Today Mid-Level orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const MidlevelOrder: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<IMidLevelData[]>();
  const [loading, setLoading] = useState(false);
  const [filterOrder, setFilterOrder] = useState<IOrdersCategory>(
    IOrdersCategory.orderPlaced
  );
  console.log("Data", data);

  // const getData = useCallback(async () => {
  //   const productData = collection(db, ORDERS_COLLECTION_NAME);
  //   const q = query(productData, where("type", "==", "Mid-Level"));
  //   const midData = await getDocs(q);
  //   const fetchProduct = midData.docs.map((doc) => ({
  //     id: doc.id,
  //     ...(doc.data() as any),
  //   }));
  //   setData(fetchProduct);
  // }, []);

  const getData = useCallback(async () => {
    const allProducts = [];
    console.log(filterOrder);
    try {
      setLoading(true);
      let query: any;
      if (filterOrder === IOrdersCategory.orderPlaced) {
        query = orderPlacedQueryMid;
      } else if (filterOrder === IOrdersCategory.manufacturing) {
        query = manufacturingQueryMid;
      } else if (filterOrder === IOrdersCategory.readyToShip) {
        query = readyToShipQueryMid;
      } else if (filterOrder === IOrdersCategory.shipping) {
        query = shippingQueryMid;
      } else if (filterOrder === IOrdersCategory.delivery) {
        query = deliveryQueryMid;
      }

      const collectionData = await getDocs(query);
      const docs = collectionData.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      allProducts.push(...docs);
      console.log(allProducts);
      setData(allProducts);
    } catch (error) {
      // Handle any potential errors here
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filterOrder]);

  useEffect(() => {
    getData();
  }, [getData]);

  const FilteredData = data?.filter((f) => f.type === "MidLevel");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  if (!FilteredData) return <p>no data</p>;

  return (
    <div className="mx">
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="post-order-wrapper">
            <div className="post-order-head">
              <p>Orders</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* <MidCard data={datas} /> */}
              <div
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                  padding: "16px",
                  marginTop: "26px",
                }}
              >
                <Chart />
              </div>
            </div>
            <div className="post-order-text">
              <p>Midlevel Order</p>
              <div className="drop-down-wrapper">
                <div className="flex-item" onClick={handleToggle}>
                  <p>Place orders</p>
                  <ChevronDown
                    className={`drop-down-icon ${isActive ? "rotate" : ""}`}
                    onClick={handleToggle}
                  />
                </div>
                {isActive && (
                  <>
                    <div className="select-drop-down" onClick={handleToggle}>
                      <p
                        onClick={() =>
                          setFilterOrder(IOrdersCategory.orderPlaced)
                        }
                      >
                        Placed orders
                      </p>
                      <p
                        onClick={() =>
                          setFilterOrder(IOrdersCategory.manufacturing)
                        }
                      >
                        Manufacturing
                      </p>
                      <p
                        onClick={() =>
                          setFilterOrder(IOrdersCategory.readyToShip)
                        }
                      >
                        Ready to ship
                      </p>
                      <p
                        onClick={() => setFilterOrder(IOrdersCategory.shipping)}
                      >
                        Shipping
                      </p>
                      <p
                        onClick={() => setFilterOrder(IOrdersCategory.delivery)}
                      >
                        Delivered
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>
                      <span>User name</span>
                    </th>
                    <th>
                      <span>Product</span>
                    </th>
                    <th>
                      <span>Quantity</span>
                    </th>
                    <th>
                      <span>Price</span>
                    </th>
                    <th>
                      <span>Size</span>
                    </th>
                    {/* <th>
                      <span>Address</span>
                    </th> */}
                    <th>
                      <span>Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredData.map((f, index) => (
                    <CardComponent key={index} data={f} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      )}
    </div>
  );
};

export default MidlevelOrder;

interface ICardComponent {
  data: IMidLevelData;
}
const CardComponent: React.FC<ICardComponent> = ({ data }) => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const docRef = doc(db, "users", data.userId);
  const [loading, setLoading] = useState(false);

  console.log(data);
  console.log("userData", userData);

  const handleModalToggle = () => {
    setActive(true);
  };

  const handleModalCloseToggle = () => {
    setActive(false);
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        console.log("Document dataa:", data);
        setUserData(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <tr>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loader />
          </div>
        ) : (
          <>
            <td>
              <div className="flex-item row-header">
                {userData?.profile ? (
                  <img src={userData?.profile} alt="" />
                ) : (
                  <img src={User} alt="" />
                )}
                <p>{userData?.name ? userData?.name : "--"}</p>
              </div>
            </td>
            <td>{data.productName}</td>
            <td>{data.sizes.sizeVarient.quantity}</td>
            <td>{data.price} INR</td>
            <td>
              {data.sizes.sizeVarient.size} -{" "}
              {data.sizes.sizeVarient.measurement}
            </td>
            <td>
              <PDFDownloadLink
                document={<MidLevelPdf data={data} userData={userData} />}
                fileName="FORM"
              >
                {/* {({ loading }) =>
      loading ? (
        <Button varient="notifi" style={{ fontSize: "12px" }}>
          Loading...
        </Button>
      ) : ( */}
                <div
                  style={{
                    background: "#8C73CB",
                    width: "36px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <DownloadIcon />
                </div>
                {/* )
    } */}
              </PDFDownloadLink>
            </td>
            <td>
              <Button
                varient="primary"
                style={{ padding: "9px 38px", fontSize: "12px" }}
                onClick={handleModalToggle}
              >
                View details
              </Button>
            </td>
            {active && (
              <LayoutModule
                handleToggle={handleModalToggle}
                className="layout-module"
              >
                <MidlevelModal
                  onClose={handleModalCloseToggle}
                  data={data}
                  userData={userData}
                />
              </LayoutModule>
            )}
          </>
        )}
      </tr>
    </>
  );
};
