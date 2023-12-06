import React, { useState } from "react";
import Button from "../button";
import LayoutModule from "../layoutModule";

interface IModule {
  handleToggle: () => void;
  setActive: (value: React.SetStateAction<boolean>) => void;
}

interface ColorData {
  color: string;
  colorName: string;
}

const ColorModule: React.FC<IModule> = ({ handleToggle, setActive }) => {
  const [color, setColor] = useState({
    color: "#000000",
    colorName: "",
  });
  console.log(color);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevValues) => ({
      ...prevValues,
      color: e.target.value,
    }));
  };

  const handleColorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor((prevValues) => ({
      ...prevValues,
      colorName: e.target.value,
    }));
  };
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
            value={color.color}
            onChange={handleColorChange}
          />
        </div>

        <div className="color-code">
          <h2>{color.color}</h2>
        </div>
      </div>
      <div className="colornameinput">
        <input
          type="text"
          value={color.colorName}
          onChange={handleColorNameChange}
        />
      </div>
      <div className="done-btn">
        <Button
          varient="primary"
          onClick={() => {
            setActive(false);
            setColor(color);
          }}
        >
          Done
        </Button>
      </div>
    </LayoutModule>
  );
};

export default ColorModule;
