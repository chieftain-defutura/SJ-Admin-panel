import React, { useState } from "react";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import TotalRevenue from "../../../../components/dashboard/totalRevenue";
import SingleCard from "../../../../components/dashboard/SingleCard";
import { PostTableData } from "../../../../data/postTableData";
import "../../../../styles/postOrder.scss";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import PremiumModal from "../../ordersModals/premiumModal";

const data = {
  heading: "Today premium orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const PremiumOrder: React.FC = () => {
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleModalToggle = () => {
    setActive(true);
  };

  const handleModalCloseToggle = () => {
    setActive(false);
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
            <p>Premium orders</p>
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
                  <th>
                    <span>Address</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {PostTableData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex-item row-header">
                        <img src={item.profileImg} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td>{item.shirt}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.size}</td>
                    <td>{item.address}</td>

                    <td>
                      <Button
                        varient="primary"
                        style={{ padding: "9px 38px", fontSize: "12px" }}
                        onClick={handleModalToggle}
                      >
                        View details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {active && (
            <LayoutModule
              handleToggle={handleModalToggle}
              className="layout-module"
            >
              <PremiumModal onClose={handleModalCloseToggle} />
            </LayoutModule>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default PremiumOrder;
