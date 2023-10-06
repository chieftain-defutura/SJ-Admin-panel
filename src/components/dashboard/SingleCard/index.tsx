import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import TShirtImg from "../../../assets/images/t-shirt-two.png";
import "./SingleCard.scss";
import { Link } from "react-router-dom";

interface SingleCardProps {
  data: {
    heading: string;
    orderNumber: number;
    todayRevenue: string;
    today: string;
    orders: string;
    image: string;
    navigation: string;
  };
}

const SingleCard: React.FC<SingleCardProps> = ({ data }) => {
  return (
    <div className="orders-card-wrapper">
      <div className="orders-content">
        <div className="orders-first-part">
          <h4>{data.heading}</h4>
          <h1>{data.orderNumber}</h1>
          <div className="flex-content">
            <p>{data.todayRevenue}</p>
            <h3>{data.today}</h3>
          </div>
        </div>
        <div className="orders-second-part">
          <div className="flex-item">
            <CartIcon />
            <h4>{data.orders}</h4>
          </div>
          <div className="tShirt-img">
            <img src={TShirtImg} alt="" />
          </div>
          <Link to={data.navigation}>
            <p>View more</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
