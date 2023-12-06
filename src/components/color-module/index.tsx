import React, { useState } from "react";
import Button from "../button";
import LayoutModule from "../layoutModule";
import { ColorData } from "../../pages/products/mid-level/product/component/createMid-Product";

interface IModule {
  handleAddColor: (colors: ColorData) => void;
  handleToggle: () => void;
}

const ColorModule: React.FC<IModule> = ({ handleAddColor, handleToggle }) => {
  const [colors, setColors] = useState<ColorData>({
    color: "#000000",
    colorName: "",
  });

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors((prevValues) => ({
      ...prevValues,
      color: e.target.value,
    }));
  };
  const handleColorNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors((prevValues) => ({
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
          <input type="color" onChange={handleColorChange} />
        </div>

        <div className="color-code">
          <h2>{colors.color}</h2>
        </div>
      </div>
      <div className="colornameinput">
        <input type="text" onChange={handleColorNameChange} />
      </div>
      <div className="done-btn">
        <Button
          varient="primary"
          onClick={() => {
            handleAddColor(colors);
          }}
        >
          Done
        </Button>
      </div>
    </LayoutModule>
  );
};

export default ColorModule;
