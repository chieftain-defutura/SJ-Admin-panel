import React, { useState } from "react";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
import SingleCard from "../../../../components/dashboard/SingleCard";
import { PostTableData } from "../../../../data/postTableData";
import Button from "../../../../components/button";
import "../../../../styles/postOrder.scss";
import "../../../../components/dashboard/table/table.scss";
import LayoutModule from "../../../../components/layoutModule";
import AccessoriesModal from "../../ordersModals/accessoriesModal";
import Chart from "../../../../components/Chart";

const data = {
  heading: "Today Accessories orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const AccessoriesOrder: React.FC = () => {
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
                  <th>
                    <span>Details</span>
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
              <AccessoriesModal onClose={handleModalCloseToggle} />
            </LayoutModule>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default AccessoriesOrder;
