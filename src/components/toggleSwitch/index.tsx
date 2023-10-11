import React from "react";
import "../../styles/toggleSwitch.scss";
interface IToogle {
  name?: string;
  value: boolean;
  setValue: (val: boolean) => void;
}

const ToggleSwitch: React.FC<IToogle> = ({ name, value, setValue }) => {
  return (
    <div>
      <label className="switch">
        <input
          name={name}
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
