import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import "../../../../styles/postOrder.scss";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import PremiumModal from "../../ordersModals/premiumModal";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import {
  IOrdersCategory,
  IPremiumData,
  IUserData,
} from "../../../../constants/types";
import Chart from "../../../../components/Chart";
import SingleCard from "../../../../components/dashboard/SingleCard";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PremiumPdf from "../../../../components/PdfFile/PremiumPdf";
import User from "../../../../assets/icons/user.jpg";
import Loading from "../../../../components/loading";
import {
  deliveryQuery,
  manufacturingQuery,
  orderPlacedQuery,
  readyToShipQuery,
  shippingQuery,
} from "../../../../utils/query";
import Loader from "../../../../components/Loader";
import {
  useGetPremiumWeekChartData,
  useGetPremiumYearChartData,
  usePremiumGetChart,
  usePremiumGetData,
} from "../../../../hooks/premiumData";
import DeliveryDetailsModal from "../../ordersModals/premiumModal/deliveryDetails";

const PremiumOrder: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [product, setProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPremiumData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredData, setFilteredData] = useState<IPremiumData[]>([]);
  console.log(filteredData);

  const [filterOrder, setFilterOrder] = useState<IOrdersCategory>(
    IOrdersCategory.orderPlaced
  );
  console.log("Data", data);
  const [isdate, setDate] = useState<Date>(new Date());
  const { data: premiumHooksData } = usePremiumGetData({ date: isdate });
  const { data: chartData } = usePremiumGetChart({ date: isdate });
  const { data: weekChartData } = useGetPremiumWeekChartData({
    date: isdate,
  });
  const { data: yearChartData } = useGetPremiumYearChartData({
    date: isdate,
  });

  const ordersFetchData = useCallback(async () => {
    console.log(filterOrder);
    try {
      setLoading(true);
      let query: any;
      if (filterOrder === IOrdersCategory.orderPlaced) {
        query = orderPlacedQuery;
      } else if (filterOrder === IOrdersCategory.manufacturing) {
        query = manufacturingQuery;
      } else if (filterOrder === IOrdersCategory.readyToShip) {
        query = readyToShipQuery;
      } else if (filterOrder === IOrdersCategory.shipping) {
        query = shippingQuery;
      } else if (filterOrder === IOrdersCategory.delivery) {
        query = deliveryQuery;
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
    ordersFetchData();
  }, [ordersFetchData]);

  useEffect(() => {
    if (selectedProduct) {
      const filtered = data.filter(
        (item) => item.productName === selectedProduct
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedProduct, data]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const FilteredData = data?.filter((f) => f.type === "Premium-Level");

  const handleProductSelect = (productName: any) => {
    setSelectedProduct(productName);
    setProduct(false); // Close dropdown after selection, if needed
  };

  if (!FilteredData) return <Loading />;

  const OrdersData = [
    {
      heading: "Total pREMIUM orders",
      orderNumber: premiumHooksData?.premiumProducts,
      todayRevenue: "Total Revenue",
      today: premiumHooksData?.premiumRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/premium-orders",
    },
  ];

  return (
    <div className="mx">
      <Layout>
        {loading ? (
          <Loading />
        ) : (
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
              <SingleCard dashboardData={premiumHooksData} data={OrdersData} />
              <div
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                  padding: "16px",
                  marginTop: "26px",
                }}
              >
                <Chart
                  data={chartData}
                  weekChartData={weekChartData}
                  yearChartData={yearChartData}
                />
              </div>
            </div>
            <div className="post-order-text">
              <p>Premium orders</p>
              <div className="filter-section">
                <div className="drop-down-wrapper">
                  <div
                    className="flex-item"
                    onClick={() => setProduct(!product)}
                  >
                    <p>Products</p>
                    <ChevronDown
                      className={`drop-down-icon ${product ? "rotate" : ""}`}
                      onClick={() => setProduct(!product)}
                    />
                  </div>
                  {product && (
                    <div
                      className="select-drop-down"
                      onClick={() => setProduct(false)}
                    >
                      {data?.map((f, i) => (
                        <p
                          key={i}
                          onClick={() => handleProductSelect(f.productName)}
                        >
                          {f.productName}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
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
                          onClick={() =>
                            setFilterOrder(IOrdersCategory.shipping)
                          }
                        >
                          Shipping
                        </p>
                        <p
                          onClick={() =>
                            setFilterOrder(IOrdersCategory.delivery)
                          }
                        >
                          Delivered
                        </p>
                      </div>
                    </>
                  )}
                </div>
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
                  {FilteredData.length === 0 ? (
                    <h2
                      style={{
                        color: "#462d85",
                        // paddingTop: "24px",
                      }}
                    >
                      No orders
                    </h2>
                  ) : (
                    FilteredData.map((f, index) => (
                      <CardComponent
                        key={index}
                        data={f}
                        filterOrder={filterOrder}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default PremiumOrder;

interface ICardComponent {
  data: IPremiumData;
  filterOrder: IOrdersCategory;
}

const CardComponent: React.FC<ICardComponent> = ({ data, filterOrder }) => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);

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
      const docRef = doc(db, "users", data.userId);

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
      {filterOrder ? (
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
                {data.sizes.sizeVarient.size} -{" "}
                {data.sizes.sizeVarient.measurement}
              </td>
              <td>{data.createdAt.toDate().toISOString().split("T")[0]}</td>
              <td>
                <PDFDownloadLink
                  document={<PremiumPdf data={data} userData={userData} />}
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
                  <PremiumModal
                    onClose={handleModalCloseToggle}
                    data={data}
                    user={userData}
                  />
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
      ) : (
        <p>No orders</p>
      )}
    </>
  );
};
