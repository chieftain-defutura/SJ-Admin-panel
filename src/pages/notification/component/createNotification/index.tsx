import React, { useState } from "react";
import "./createNotification.scss";
import Button from "../../../../components/button";
import Icon from "../../../../assets/images/post-logo.png";
import { ReactComponent as Plus } from "../../../../assets/icons/plus.svg";
import NotifiyModule from "../moduleLayout";

const CreateNotification: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <div className="notification" onClick={handleToggle}>
        <div className="notification-wrap">
          <img src={Icon} alt="icon" width={40} height={40} />
          <div className="notification-title">
            <h3>Title</h3>
            <h5>Sub title</h5>
          </div>
        </div>
        <div className="plus-svg">
          <Plus />
        </div>
        <div className="btn-notification">
          <Button varient="notifi">create Notification</Button>
        </div>
      </div>
      {isActive && <NotifiyModule handleToggle={handleToggle} />}
    </div>
  );
};

export default CreateNotification;
