import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import TShirtImg from "../../../assets/images/t-shirt-two.png";
import "./ordersCard.scss";
import { Link } from "react-router-dom";
import LoadingCard from "../../loadingCard";

interface OrdersCardProps {
  data: {
    heading: string;
    orderNumber?: number;
    todayRevenue: string;
    today?: number;
    orders: string;
    image: string;
    navigation: string;
  }[];
}

const OrdersCard: React.FC<OrdersCardProps> = ({ data }) => {
  return (
    <div className="orders-wrapper">
      {data.map((f, index) => (
        <Link to={f.navigation}>
          <div key={index} className="orders-content">
            <div className="orders-first-part">
              <h4>{f.heading}</h4>
              <h1>{f ? f?.orderNumber || 0 : <LoadingCard />}</h1>
              <div className="flex-content">
                <p>Today Revenue</p>
                <h3>{f ? f?.today || 0 : <LoadingCard />}</h3>
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
              <p>View more</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OrdersCard;
