import React from "react";
import "../../../styles/subscription.scss";

const SubscriptionCard: React.FC = () => {
  return (
    <div className="card-border">
      <div className="validation">
        <div>
          <h4>Validation period</h4>
          <select name="validation-period" id="">
            <option value="1 Month">1 Month</option>
            <option value="2 Month">2 Month</option>
            <option value="3 Month">3 Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
