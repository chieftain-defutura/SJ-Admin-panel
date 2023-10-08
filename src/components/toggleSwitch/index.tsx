import React, { useState } from "react";
import "../../styles/toggleSwitch.scss";
interface IToogle {
  label?: string;
  value: boolean;
  setValue: (val: boolean) => void;
}

const ToggleSwitch: React.FC<IToogle> = ({ label, value, setValue }) => {
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={value}
          onChange={() => setValue(!value)}
        />
        <span className="slider" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
