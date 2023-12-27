import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
// import SingleCard from "../../../../components/dashboard/SingleCard";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import PostModal from "../../ordersModals/postModal";
import "../../../../styles/postOrder.scss";
import Chart from "../../../../components/Chart";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { IOrdersCategory, IPost, IUserData } from "../../../../constants/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PostPdf from "../../../../components/PdfFile/PostPdf";
import {
  orderPlacedQueryPost,
  manufacturingQueryPost,
  readyToShipQueryPost,
  shippingQueryPost,
  deliveryQueryPost,
} from "../../../../utils/query";
import { useGetPostData, usePostGetChart } from "../../../../hooks/postData";
import Loading from "../../../../components/loading";
import Loader from "../../../../components/Loader";
import PostCard from "../../../../components/dashboard/postCard";
import User from "../../../../assets/icons/user.jpg";
import DeliveryDetailsModal from "../../ordersModals/postModal/deliveryDetails";

const PostOrders: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<IPost[]>();
  const [loading, setLoading] = useState(false);
  const [filterOrder, setFilterOrder] = useState<IOrdersCategory>(
    IOrdersCategory.orderPlaced
  );
  const [isdate, setDate] = useState<Date>(new Date());
  const { data: PostHooksData } = useGetPostData({ date: isdate });
  const { data: chartData } = usePostGetChart({ date: isdate });

  const getData = useCallback(async () => {
    const allProducts = [];
    console.log(filterOrder);
    try {
      setLoading(true);
      let query: any;
      if (filterOrder === IOrdersCategory.orderPlaced) {
        query = orderPlacedQueryPost;
      } else if (filterOrder === IOrdersCategory.manufacturing) {
        query = manufacturingQueryPost;
      } else if (filterOrder === IOrdersCategory.readyToShip) {
        query = readyToShipQueryPost;
      } else if (filterOrder === IOrdersCategory.shipping) {
        query = shippingQueryPost;
      } else if (filterOrder === IOrdersCategory.delivery) {
        query = deliveryQueryPost;
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

  const ordersData = [
    {
      heading: "Total post orders",
      orderNumber: PostHooksData?.postProducts,
      todayRevenue: "Total Revenue",
      today: PostHooksData?.postRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/post-orders",
    },
  ];

  const FilteredData = data?.filter((f) => f.type === "PostLevel");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  if (!FilteredData) return <Loading />;

  return (
    <div className="mx">
      {loading ? (
        <Loading />
      ) : (
        <Layout>
          <div className="post-order-wrapper">
            <div className="mid-head">
              <div className="post-order-head">
                <p>Orders</p>
              </div>
              <div className="input-date">
                <input
                  type="date"
                  id="customDateInput"
                  value={isdate.toISOString().split("T")[0]}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                placeContent: "center",
              }}
            >
              <PostCard data={ordersData} postHooksData={PostHooksData} />

              <div
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                  padding: "16px",
                  marginTop: "26px",
                }}
              >
                {/* <Chart data={chartData} /> */}
              </div>
            </div>
            <div className="post-order-text">
              <p>Post orders</p>
              <div className="drop-down-wrapper">
                <div className="flex-item" onClick={handleToggle}>
                  <p>{filterOrder ? filterOrder : "Placed orders"}</p>
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
                      <span>Price</span>
                    </th>
                    <th>
                      <span>Size</span>
                    </th>
                    <th>
                      <span>Created</span>
                    </th>
                    <th>
                      <span>Invoice</span>
                    </th>
                    <th>
                      <span>Details</span>
                    </th>
                    <th>
                      <span>Delivery status</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FilteredData.map((f, index) => (
                    <CardComponent
                      key={index}
                      data={f}
                      filterOrder={filterOrder}
                    />
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

export default PostOrders;

interface ICardComponent {
  data: IPost;
  filterOrder: IOrdersCategory;
}

const CardComponent: React.FC<ICardComponent> = ({ data, filterOrder }) => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const docRef = doc(db, "users", data.userId);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
          <td>{data.price} INR</td>
          <td>
            {data.sizes.sizeVarient.size} - {data.sizes.sizeVarient.measurement}
          </td>
          <td>{data.createdAt.toDate().toISOString().split("T")[0]}</td>
          <td>
            <PDFDownloadLink
              document={<PostPdf data={data} userData={userData} />}
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
              style={{ padding: "9px 8px", fontSize: "12px" }}
              onClick={handleModalToggle}
            >
              View details
            </Button>
          </td>
          <td>
            <Button
              varient="primary"
              style={{ padding: "9px 8px", fontSize: "12px" }}
              onClick={() => setIsActive(true)}
            >
              Delivery status
            </Button>
          </td>
          {active && (
            <LayoutModule
              handleToggle={handleModalToggle}
              className="layout-module"
            >
              <PostModal onClose={handleModalCloseToggle} data={data} />
            </LayoutModule>
          )}
          {isActive && (
            <LayoutModule
              handleToggle={() => setIsActive(false)}
              className="layout-module"
            >
              <DeliveryDetailsModal setIsActive={setIsActive} data={data} />
            </LayoutModule>
          )}
        </>
      )}
    </tr>
  );
};
