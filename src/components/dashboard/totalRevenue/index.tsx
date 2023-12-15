import React from "react";
import "./totalRevenue.scss";
import LoadingCard from "../../loadingCard";

export interface IDashboard {
  data: {
    midProducts: number;
    premiumProducts: number;
    postProducts: number;
    totalRevenue: number;
    midLevelRevenue: number;
    premiumRevenue: number;
    postRevenue: number;
  } | null;
}
const TotalRevenue: React.FC<IDashboard> = ({ data }) => {
  return (
    <div className="total-revenue-wrapper">
      <div className="heading">
        <h5>TOTAL REVENUE</h5>
        <h1>{data ? data.totalRevenue : <LoadingCard />}</h1>
        <p>We have found a way to make your revenue more effective</p>
      </div>
    </div>
  );
};

export default TotalRevenue;
