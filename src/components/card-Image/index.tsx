import React from "react";
import "../../styles/uploadDesign.scss";
import Button from "../button";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

const CardImage = () => {
  return (
    <div className="upload-image">
      <h3>images</h3>

      <div className="design-wrap">
        <div className="plus-icon">
          <Plus />
        </div>
        <Button varient="primary">Add image</Button>
      </div>
    </div>
  );
};

export default CardImage;
