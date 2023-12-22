import React, { useState } from "react";
import Button from "../../../../components/button";
import { IReturnOrdersData } from "../../../../constants/types";
import LayoutModule from "../../../../components/layoutModule";
import { ReactComponent as Close } from "../../../../assets/icons/close.svg";
import BG from "../../../../assets/images/bg-img.png";
import StatusUpdate from "../statusUpdate";

interface IReturnOrders {
  returnData: IReturnOrdersData | undefined;
}
const ReturnOrders: React.FC<IReturnOrders> = ({ returnData }) => {
  const [active, setActive] = useState(false);
  const [statusUpdate, setStatusIpdate] = useState(false);
  const handleToggle = () => {
    setStatusIpdate(!statusUpdate);
  };

  return (
    <tr>
      <td>vicky</td>
      <td>White-Tshirt</td>
      <td>{returnData?.status}</td>
      <td>
        <Button varient="primary" onClick={() => setActive(true)}>
          View
        </Button>
      </td>
      <td>
        {returnData && returnData.createdAt
          ? returnData.createdAt.toDate().toISOString().split("T")[0]
          : "No date"}
      </td>
      <td>
        {returnData && returnData.updatedAt
          ? returnData.updatedAt.toDate().toISOString().split("T")[0]
          : "No date"}
      </td>
      <td>
        <Button varient="primary" onClick={handleToggle}>
          View
        </Button>
      </td>
      {statusUpdate && (
        <LayoutModule handleToggle={handleToggle}>
          <StatusUpdate data={returnData} setStatusIpdate={setStatusIpdate} />
        </LayoutModule>
      )}
      {active && (
        <LayoutModule handleToggle={() => setActive(false)}>
          <div className="return-module">
            <div className="close">
              <h4>Reasons</h4>
              <div onClick={() => setActive(false)}>
                <Close />
              </div>
            </div>
            <div className="details">
              <div className="return-img">
                {returnData?.Image ? (
                  <img src={returnData?.Image} alt="" />
                ) : (
                  <img src={BG} alt="" />
                )}
              </div>
              <div className="contents">
                <div>
                  <h5>Product name</h5>
                  <p>White-Tshirt</p>
                </div>
                <div>
                  <h5>Size</h5>
                  <p>Euro-M</p>
                </div>
                <div>
                  <strong>
                    <h5>Price</h5>
                  </strong>
                  <p>100 INR</p>
                </div>
                <div>
                  <h5>Issues</h5>
                  <p>{returnData?.issues}</p>
                </div>
                <div className="discriprition">
                  <h5>Discription</h5>
                  <p>{returnData?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </LayoutModule>
      )}
    </tr>
  );
};

export default ReturnOrders;
