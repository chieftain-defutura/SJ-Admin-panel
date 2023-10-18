import React from "react";
import Layout from "../../layout";
import "../../styles/subscription.scss";
import SubscriptionCard from "./subscriptionCard";

const Subscription: React.FC = () => {
  return (
    <Layout>
      <div className="subscription-layout">
        <h3>subscription upgrade</h3>
        <SubscriptionCard />
      </div>
    </Layout>
  );
};

export default Subscription;
