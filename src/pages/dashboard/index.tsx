import React from "react";
import Layout from "../../layout";
import { ReactComponent as SubscribedIcon } from "../../assets/icons/subscribed.svg";
import TotalRevenue from "../../components/dashboard/totalRevenue";
import OrdersCard from "../../components/dashboard/ordersCard";
import "./dashboard.scss";
import { OrdersData } from "../../data/ordersData";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
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
            <TotalRevenue />
          </div>
          <div style={{ margin: "32px 0" }}>
            <OrdersCard data={OrdersData} />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
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
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
