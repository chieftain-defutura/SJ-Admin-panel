import React from "react";
import { ReactComponent as UserIcon } from "../../../../assets/icons/user.svg";
import "./userSubscription.scss";
import Layout from "../../../../layout";
import Button from "../../../../components/button";
import { userSubscription } from "../../../../data/userSubscriptionData";

const UserSubscription: React.FC = () => {
  return (
    <div className="mx">
      <Layout>
        <div className="user-subscription-wrapper">
          <div className="user-subscription-container flex-item">
            <h2>User subscription</h2>
            <div className="center-text">
              <h3>Total subscription</h3>
              <h1>120k</h1>
            </div>
            <div className="third-text flex-item">
              <p>Total subscription</p>
              <div className="flex-item contact-icon">
                <UserIcon />
                <p>524</p>
              </div>
            </div>
          </div>
          <Button varient="premium">Premium</Button>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <span>User name</span>
                  </th>
                  <th>
                    <span>Membership</span>
                  </th>
                  <th>
                    <span>Month</span>
                  </th>
                  <th>
                    <span>Amount</span>
                  </th>
                  <th>
                    <span>Features</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userSubscription.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex-item row-header">
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td>{item.membership}</td>
                    <td>{item.month}</td>
                    <td>{item.amount}</td>
                    <td>{item.features}</td>
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

export default UserSubscription;
