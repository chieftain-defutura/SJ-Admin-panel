import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import TShirtImg from "../../../assets/images/t-shirt-two.png";
import "./ordersCard.scss";
import { Link } from "react-router-dom";

interface OrdersCardProps {
  data: {
    heading: string;
    orderNumber: number;
    todayRevenue: string;
    today: string;
    orders: string;
    image: string;
    navigation: string;
  }[];
}

const OrdersCard: React.FC<OrdersCardProps> = ({ data }) => {
  return (
    <div className="orders-wrapper">
      {data.map((f, index) => (
        <div key={index} className="orders-content">
          <div className="orders-first-part">
            <h4>{f.heading}</h4>
            <h1>{f.orderNumber}</h1>
            <div className="flex-content">
              <p>{f.todayRevenue}</p>
              <h3>{f.today}</h3>
            </div>
          </div>
          <div className="orders-second-part">
            <div className="flex-item">
              <CartIcon />
              <h4>{f.orders}</h4>
            </div>
            <div className="tShirt-img">
              <img src={TShirtImg} alt="" />
            </div>
            <Link to={f.navigation}>
              <p>View more</p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersCard;
