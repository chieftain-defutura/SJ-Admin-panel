import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout";
import { ReactComponent as SubscribedIcon } from "../../assets/icons/subscribed.svg";
import TotalRevenue from "../../components/dashboard/totalRevenue";
import OrdersCard from "../../components/dashboard/ordersCard";
import "./dashboard.scss";
import { Link } from "react-router-dom";
import Chart from "../../components/Chart";
import { Field, Form, Formik } from "formik";
import Input from "../../components/input";
import Button from "../../components/button";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import {
  useGetDashboardChartData,
  useGetDashboardData,
} from "../../hooks/useGetDashboardData";
import TShirtImg from "../../assets/images/t-shirt-two.png";
import LoadingCard from "../../components/loadingCard";
import { useAdminStore } from "../../store/adminUser";

const Continents = ["Europe"];

interface IDeliverData {
  Continents: string;
  DeliveryFees: string;
  id: string;
}
const initialValues = {
  Continents: "",
  DeliveryFees: "",
};
export interface IDashboard {
  midProducts: number;
  premiumProducts: number;
  postProducts: number;
  totalRevenue: number;
  midLevelRevenue: number;
  premiumRevenue: number;
  postRevenue: number;
}
const Dashboard: React.FC = () => {
  const [data, setData] = useState<IDeliverData[]>([]);
  const [save, setSave] = useState(false);
  const [isdate, setDate] = useState<Date>(new Date());
  console.log("date", isdate);
  const { data: dashboardData } = useGetDashboardData({ date: isdate });
  const { data: chartData } = useGetDashboardChartData({ date: isdate });
  const adminDetails = useAdminStore((user) => user.adminDetails);

  const handleUpdateData = (value: typeof initialValues) => {
    try {
      data.map((f) => {
        const updateFee = doc(db, "DeliveryFees", f.id);
        const dataRef = updateDoc(updateFee, {
          ...value,
        });
        console.log(dataRef);
        setSave(true);
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const DeliveryData = await getDocs(collection(db, "DeliveryFees"));
      const fetchProduct = DeliveryData.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setData(fetchProduct);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const OrdersData = [
    {
      heading: "Today post orders",
      orderNumber: dashboardData?.postProducts,
      todayRevenue: "Today Revenue",
      today: dashboardData?.postRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/post-orders",
    },
    {
      heading: "Today mID LEVEL orders",
      orderNumber: dashboardData?.midProducts,
      todayRevenue: "Today Revenue",
      today: dashboardData?.midLevelRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/midlevel-orders",
    },
    {
      heading: "Today pREMIUM orders",
      orderNumber: dashboardData?.premiumProducts,
      todayRevenue: "Today Revenue",
      today: dashboardData?.premiumRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/premium-orders",
    },
    {
      heading: "Today Other accessories orders",
      orderNumber: dashboardData?.accessoryProducts,
      todayRevenue: "Today Revenue",
      today: dashboardData?.accessoryRevenue,
      orders: "orders",
      image: TShirtImg,
      navigation: "/orders/accessories-orders",
    },
  ];

  return (
    <div className="mx">
      <Layout>
        {isdate && (
          <div className="dashboard-wrapper">
            <div className="dashboard-head">
              <p>
                WELCOME,
                {adminDetails?.displayName
                  ? adminDetails.displayName
                  : adminDetails?.email}
              </p>
              <input
                type="date"
                id="customDateInput"
                value={isdate.toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
            </div>
            <div className="grid-item">
              <TotalRevenue data={dashboardData} />
              <div
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                  padding: "16px",
                }}
              >
                <Chart data={chartData} />
              </div>
            </div>
            <div style={{ margin: "32px 0" }}>
              <OrdersCard data={OrdersData} />
            </div>
            <div
              style={{
                display: "flex",
                // alignItems: "center",
                // justifyContent: "space-between",
                gap: "32px",
                // flexWrap: "wrap",
              }}
            >
              <div className="subscription-content flex-item">
                <div className="total-subscription-text flex-item">
                  <SubscribedIcon />
                  <h5>Total subscription</h5>
                </div>
                <h1>120k</h1>
                <h2>premium</h2>
                <Link to="/user-subscription">
                  <h6>View more</h6>
                </Link>
              </div>
              <div className="subscription-content flex-item">
                <div className="total-subscription-text flex-item">
                  <h5>User total post</h5>
                </div>
                <h1>
                  {dashboardData ? dashboardData?.postRevenue : <LoadingCard />}
                </h1>
                <Link to="/user-post-list">
                  <h6>View more</h6>
                </Link>
              </div>
              {data.map((f, i) => (
                <Formik key={i} initialValues={f} onSubmit={handleUpdateData}>
                  <Form>
                    <div className="dropdown">
                      <h3>Delivery charge</h3>
                      <div className="deliveryfee">
                        <div className="drop_down">
                          <Field as="select" name="Continents">
                            <option value="">Select continents</option>

                            {Continents.map((f, i) => (
                              <option value={f} key={i}>
                                {f}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="deliveryfees-input">
                          <Input
                            type="number"
                            name="DeliveryFees"
                            placeholder="0 $"
                            style={{ border: "1px solid #e1e1e1" }}
                            // disabled={save}
                          />
                        </div>
                      </div>
                      <div className="save-btn">
                        <Button
                          varient="primary"
                          type="submit"
                          // onClick={() => handleUpdateData}
                        >
                          {save ? "Saved" : "Save"}
                        </Button>
                                  
                      </div>
                    </div>
                  </Form>
                </Formik>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Dashboard;
