import React from "react";
import Layout from "../../../../layout";
import "./postOrder.scss";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import ProfileImg from "../../../../assets/images/profile-img.png";
import Button from "../../../../components/button";
import TotalRevenue from "../../../../components/dashboard/totalRevenue";
import SingleCard from "../../../../components/dashboard/SingleCard";

const data = {
  heading: "Today post orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const PostOrders: React.FC = () => {
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
            <p>Post orders</p>
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
                {[...Array(10)].map((_, i) => (
                  <tr key={i.toString()}>
                    <td>
                      <div className="flex-item row-header">
                        <img src={ProfileImg} alt="" />
                        <p>John devid</p>
                      </div>
                    </td>
                    <td>White shirt</td>
                    <td>3 pcs</td>
                    <td>₹1200</td>
                    <td>M- 32cm</td>
                    <td>Chennai</td>

                    <td>
                      <Button varient="primary">View details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default PostOrders;
