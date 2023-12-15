import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/icons/cart.svg";
import TShirtImg from "../../../assets/images/t-shirt-two.png";
import "../SingleCard/SingleCard.scss";
import { Link } from "react-router-dom";
import LoadingCard from "../../loadingCard";

interface SingleCardProps {
  data: {
    heading: string;
    orderNumber: number | undefined;
    todayRevenue: string;
    today: number | undefined;
    orders: string;
    image: string;
    navigation: string;
  }[];
  postHooksData: {
    postProducts: number;
    postRevenue: number;
  } | null;
}

const PostCard: React.FC<SingleCardProps> = ({ data, postHooksData }) => {
  return (
    <div className="orders-card-wrapper">
      {data.map((f, i) => (
        <div className="orders-content" key={i}>
          <div className="orders-first-part">
            <h4>{f.heading}</h4>

            <h1>
              {postHooksData ? postHooksData.postProducts : <LoadingCard />}
            </h1>
            <div className="flex-content">
              <p>{f.todayRevenue}</p>
              <h3>{postHooksData?.postRevenue}</h3>
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

export default PostCard;
