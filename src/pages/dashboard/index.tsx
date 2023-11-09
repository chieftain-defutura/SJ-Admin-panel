import React, { useState } from "react";
import Layout from "../../layout";
import { ReactComponent as SubscribedIcon } from "../../assets/icons/subscribed.svg";
import TotalRevenue from "../../components/dashboard/totalRevenue";
import OrdersCard from "../../components/dashboard/ordersCard";
import "./dashboard.scss";
import { OrdersData } from "../../data/ordersData";
import { Link } from "react-router-dom";
import Chart from "../../components/Chart";
import { Field, Formik } from "formik";

const Continents = ["Europe", "Asia", "USA", "Affrica"];
const initialValues = {
  Continents: "",
  DeliveryFees: "",
};

const Dashboard: React.FC = () => {
  const [continent, setContinent] = useState("");
  const [price, setPrice] = useState("");
  console.log(price);

  console.log(continent);

  const handleSubmit = (values: typeof initialValues) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx">
      <Layout>
        <div className="dashboard-wrapper">
          <div className="dashboard-head">
            <p>Welcome, Sprinkle</p>
            <h5>Today sep28 2023</h5>
          </div>
          <div className="grid-item">
            <TotalRevenue />
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                padding: "16px",
              }}
            >
              <Chart />
            </div>
          </div>
          <div style={{ margin: "32px 0" }}>
            <OrdersCard data={OrdersData} />
          </div>
          <div
            style={{
              display: "flex",
              // alignItems: "center",
              gap: "32px",
              flexWrap: "wrap",
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
              <h1>120</h1>
              <Link to="/user-post-list">
                <h6>View more</h6>
              </Link>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values }) => (
                <div className="dropdown">
                  <h3>Delivery charge</h3>
                  <Field as="select" name="Continents">
                    <option value="">Select continents</option>

                    {Continents.map((f, i) => (
                      <option value={f}>{f}</option>
                    ))}
                  </Field>
                  <div>
                    {Continents.find((m) => (
                      <>
                        {m === continent && (
                          <Field
                            as="text"
                            name="DeliveryFees"
                            placeholder="0 $"
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
