import React, { useState } from "react";
import "../../styles/toggleSwitch.scss";
interface IToogle {
  label: "";
}

const ToggleSwitch: React.FC<IToogle> = ({ label }) => {
  const [checked, setCheked] = useState(false);

  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setCheked(!checked)}
        />
        <span className="slider" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
