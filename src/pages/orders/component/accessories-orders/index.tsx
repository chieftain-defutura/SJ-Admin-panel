import React, { useState } from "react";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import SingleCard from "../../../../components/dashboard/SingleCard";
import TotalRevenue from "../../../../components/dashboard/totalRevenue";
import Table from "../../../../components/dashboard/table";
import { PostTableData } from "../../../../data/postTableData";
import "../../../../styles/postOrder.scss";

const data = {
  heading: "Today post orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const AccessoriesOrder: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mx">
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
            <SingleCard data={data} />
            <div style={{ marginTop: "18px" }}>
              <TotalRevenue />
            </div>
          </div>
          <div className="post-order-text">
            <p>Accessories Order</p>
            <div className="drop-down-wrapper">
              <div className="flex-item" onClick={handleToggle}>
                <p>Place orders</p>
                <ChevronDown
                  className={`drop-down-icon ${isActive ? "rotate" : ""}`}
                  onClick={handleToggle}
                />
              </div>
              {isActive && (
                <div className="select-drop-down">
                  <p>Manufacture</p>
                  <p>Ready to ship</p>
                  <p>Shipping</p>
                  <p>Delivered</p>
                </div>
              )}
            </div>
          </div>
          <Table data={PostTableData} />
        </div>
      </Layout>
    </div>
  );
};

export default AccessoriesOrder;
