import React, { useCallback, useEffect, useState } from "react";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
// import SingleCard from "../../../../components/dashboard/SingleCard";
import Button from "../../../../components/button";
import "../../../../styles/postOrder.scss";
import "../../../../components/dashboard/table/table.scss";
import LayoutModule from "../../../../components/layoutModule";
import Chart from "../../../../components/Chart";
import {
  IAccessoryLevel,
  IOrdersCategory,
  IUserData,
} from "../../../../constants/types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AccessoryPdf from "../../../../components/PdfFile/AccessoryPdf";
import AccessoriesModal from "../../ordersModals/accessoriesModal";
import { ORDERS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import Loading from "../../../../components/loading";
import {
  useGetAccessoryChart,
  useGetAccessoryData,
} from "../../../../hooks/useAccessoryData";
import {
  orderPlacedQueryAccessory,
  manufacturingQueryAccessory,
  readyToShipQueryAccessory,
  shippingQueryAccessory,
  deliveryQueryAccessory,
} from "../../../../utils/query";
import AccessoryCard from "../../../../components/dashboard/accessoryCard";
import Loader from "../../../../components/Loader";
import User from "../../../../assets/icons/user.jpg";
import DeliveryDetailsModal from "../../ordersModals/accessoriesModal/deliveryDetails";

const AccessoriesOrder: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<IAccessoryLevel[]>();

  const [loading, setLoading] = useState(false);
  const [filterOrder, setFilterOrder] = useState<IOrdersCategory>(
    IOrdersCategory.orderPlaced
  );
  const [isdate, setDate] = useState<Date>(new Date());
  const { data: AccessoryHooksData } = useGetAccessoryData({ date: isdate });
  const { data: chartData } = useGetAccessoryChart({ date: isdate });

  const getData = useCallback(async () => {
    console.log(filterOrder);
    try {
      setLoading(true);
      let query: any;
      if (filterOrder === IOrdersCategory.orderPlaced) {
        query = orderPlacedQueryAccessory;
      } else if (filterOrder === IOrdersCategory.manufacturing) {
        query = manufacturingQueryAccessory;
      } else if (filterOrder === IOrdersCategory.readyToShip) {
        query = readyToShipQueryAccessory;
      } else if (filterOrder === IOrdersCategory.shipping) {
        query = shippingQueryAccessory;
      } else if (filterOrder === IOrdersCategory.delivery) {
        query = deliveryQueryAccessory;
      }

      onSnapshot(query, (q: any) => {
        const allProducts = [];

        const docs = q.docs.map((doc: any) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));
        allProducts.push(...docs);
        console.log(allProducts);
        setData(allProducts);
      });
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

  const FilteredData = data?.filter((f) => f.type === "Accessory-Level");

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const ordersData = [
    {
      heading: "Total Other accessories orders",
      orderNumber: AccessoryHooksData?.accessoryProducts,
      todayRevenue: "Total Revenue",
      today: AccessoryHooksData?.accessoryRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/accessories-orders",
    },
  ];
  if (!FilteredData) return <Loading />;

  return (
    <div className="mx">
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
            }}
          >
            <AccessoryCard
              data={ordersData}
              AccessoryHooksData={AccessoryHooksData}
            />
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                padding: "16px",
                marginTop: "26px",
              }}
            >
              <Chart data={chartData} />
            </div>
          </div>
          <div className="post-order-text">
            <p>Accessories Order</p>
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
                    <p onClick={() => setFilterOrder(IOrdersCategory.shipping)}>
                      Shipping
                    </p>
                    <p onClick={() => setFilterOrder(IOrdersCategory.delivery)}>
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
                  <CardComponent key={index} data={f} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AccessoriesOrder;

interface ICardComponent {
  data: IAccessoryLevel;
}
const CardComponent: React.FC<ICardComponent> = ({ data }) => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const [isActive, setIsActive] = useState(false);

  const docRef = doc(db, "users", data.userId);

  const [loading, setLoading] = useState(false);

  const handleModalToggle = () => {
    setActive(true);
  };
  const handleToggle = () => {
    setIsActive(true);
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
                <img src={userData?.profile} alt={User} />
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
          <td>
            <td>{data.createdAt.toDate().toISOString().split("T")[0]}</td>
          </td>
          <td>
            <PDFDownloadLink
              document={<AccessoryPdf data={data} userData={userData} />}
              fileName="FORM"
            >
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
              // onClick={handleModalToggle}
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
              <AccessoriesModal
                onClose={handleModalCloseToggle}
                data={data}
                user={userData}
              />
            </LayoutModule>
          )}
          {isActive && (
            <LayoutModule handleToggle={handleToggle} className="layout-module">
              <DeliveryDetailsModal setIsActive={setIsActive} data={data} />
            </LayoutModule>
          )}
        </>
      )}
    </tr>
  );
};
