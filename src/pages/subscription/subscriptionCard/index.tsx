import React from "react";
import "../../../styles/subscription.scss";
import ToggleSwitch from "../../../components/toggleSwitch";
import { ReactComponent as Diamond } from "../../../assets/icons/diamond.svg";
import Button from "../../../components/button";

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
        <div>
          <p>Active</p>
          <ToggleSwitch
            value={false}
            setValue={function (val: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
      <div className="membership-plan">
        <div className="plan">
          <div className="plan-details">
            <Diamond />
            <div>
              <h1>PREMIUM</h1>
              <h4>Membership</h4>
            </div>
          </div>
          <div className="price">
            <h1>
              Add <span>INR/</span>
            </h1>
            <h4>Month</h4>
          </div>
        </div>{" "}
        <div className="plan">
          <div className="plan-details">
            <Diamond />
            <div>
              <h1>STANDARD</h1>
              <h4>Membership</h4>
            </div>
          </div>
          <div className="price">
            <h1>
              Add <span>INR/</span>
            </h1>
            <h4>Month</h4>
          </div>
        </div>
      </div>
      <Button varient="notifi">Add</Button>
    </div>
  );
};

export default SubscriptionCard;
