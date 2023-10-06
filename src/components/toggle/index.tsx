import React, { useState } from "react";
import "../../styles/toggleSwitch.scss";

const Toggle: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  return (
    <div className="toggle-container">
      <div className={`toggle-btn ${toggle ? "enable" : "disable"}`}></div>
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch-checkbox"
          checked={toggle}
          onChange={() => setToggle(true)}
          name="toggleSwitch"
          id="toggleSwitch"
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
          <span className="toggle-switch-inner" />
          <span className="toggle-switch-switch" />
        </label>
      </div>
    </div>
  );
};

export default Toggle;
