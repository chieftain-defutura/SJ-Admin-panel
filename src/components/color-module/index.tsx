import React, { useState } from "react";
import Button from "../button";
import LayoutModule from "../layoutModule";

interface IModule {
  handleToggle: () => void;
  handleChange: (color: string) => void;
  setActive: (value: React.SetStateAction<boolean>) => void;
}

const ColorModule: React.FC<IModule> = ({
  handleToggle,
  setActive,
  handleChange,
}) => {
  const [color, setColor] = useState("#00000");
  return (
    <LayoutModule handleToggle={handleToggle} className="color-layout">
      <div className="colorname">
        <h3>Colour</h3>

        <h3>Hex code</h3>
      </div>
      <div className="color-details">
        <div className="choose-color">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="color-code">
          <h2>{color}</h2>
        </div>
      </div>
      <div className="done-btn">
        <Button
          varient="primary"
          onClick={() => {
            setActive(false);
            handleChange(color);
          }}
        >
          Done
        </Button>
      </div>
    </LayoutModule>
  );
};

export default ColorModule;
