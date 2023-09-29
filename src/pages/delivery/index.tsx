import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./delivery.scss";
import Layout from "../../layout";

interface IDeliveryLayoutProps {
  children: React.ReactNode;
}
const Delivery: React.FC<IDeliveryLayoutProps> = ({ children }) => {
  const [isactive, setIsActive] = useState("");

  const handleClick = (event: any) => {
    setIsActive(event.target.id);
  };
  console.log(isactive);

  return (
    <div>
      <Layout>
        <div className="delivery-header">
          <div className="delivery-wrap">
            <div>
              <NavLink to="/delivery/midlevel-delivery/product">
                <h2>Mid level delivery details </h2>
              </NavLink>
            </div>
            <div>
              <NavLink to="/delivery/premium-delivery">
                <h2>Premium delivery details </h2>
              </NavLink>
            </div>

            <div>
              <NavLink to="/delivery/post-delivery">
                <h2>Post delivery details </h2>
              </NavLink>
            </div>
          </div>
          <div className="layout-children">{children}</div>
        </div>
      </Layout>
    </div>
  );
};

export default Delivery;
