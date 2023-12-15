import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import TShirtImg from "../../../assets/images/t-shirt-two.png";
import "../SingleCard/SingleCard.scss";
import { Link } from "react-router-dom";
import { useGetDashboardData } from "../../../hooks/useGetDashboardData";
import LoadingCard from "../../loadingCard";
import { MidGetData } from "../../../hooks/midData";

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
  isdate: Date | undefined;
}

const MidCard: React.FC<SingleCardProps> = ({ data, isdate }) => {
  const { data: dashboardData } = MidGetData({ date: isdate });

  return (
    <div className="orders-card-wrapper">
      <div className="orders-content">
        <div className="orders-first-part">
          <h4>{data.heading}</h4>

          <h1>{dashboardData ? dashboardData.midProducts : <LoadingCard />}</h1>
          <div className="flex-content">
            <p>{data.todayRevenue}</p>
            <h3>{dashboardData?.midLevelRevenue}</h3>
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

export default MidCard;
