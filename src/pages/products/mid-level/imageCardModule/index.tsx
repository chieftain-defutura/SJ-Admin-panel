import React, { useState } from "react";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import ToggleSwitch from "../../../../components/toggleSwitch";
import {
  IDesigns,
  IUploadFiles,
} from "../product/component/uploadDesign-Image";
import { ReactComponent as Deleteicon } from "../../../../assets/icons/delete.svg";
import ProductModule from "../../../../components/productLayoutModule";

interface IData extends IUploadFiles {
  isActiveImage: boolean;
  handleDelete: (id: string) => Promise<void>;
  handleUpdate: () => Promise<void>;
  uploadImage: IDesigns;

  handleFilechange: (e: any) => void;
}
const ImageCardModule: React.FC<IData> = ({
  Images,
  isActiveImage,
  handleDelete,
  handleUpdate,
  uploadImage,
  handleFilechange,
}) => {
  const [active, setActive] = useState(false);
  const [isactive, setIsActive] = useState(false);

  const handleActive = () => {
    setActive(true);
  };
  return (
    <div>
      <div className="design-wrap">
        <div className="toggle-switch">
          <h3>Active</h3>
          <ToggleSwitch value={isActiveImage} setValue={() => handleUpdate} />
        </div>
        <div className="logo">
          <img
            src={Images}
            alt=""
            width={200}
            height={250}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="update">
          <div onClick={() => setIsActive(true)}>
            <Deleteicon />
          </div>

          <Button varient="primary" onClick={handleActive}>
            view
          </Button>
        </div>
        {isactive && (
          <LayoutModule
            handleToggle={() => setIsActive(false)}
            className="delete-module"
          >
            <div className="content-delete">
              <h3>Delete</h3>
            </div>
            <div className="content-delete">
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam,""
              </p>
            </div>
            <div className="delete-section-btn">
              <Button varient="notifi" onClick={() => setIsActive(false)}>
                Cancel
              </Button>
              <Button varient="primary">Done</Button>
            </div>
          </LayoutModule>
        )}
      </div>
      {active && (
        <ProductModule handleToggle={() => setActive(false)}>
          <div className="product-preview-img">
            <h3>Change image</h3>
            <div className="product-img">
              {uploadImage["Images"] ? (
                <img src={Images} alt="products" width={176} height={234} />
              ) : (
                <img src={Images} alt="products" width={176} height={234} />
              )}
            </div>
            <div className="layout-wrap">
              {/* <div className="upload-area">
                {uploadImage["Images"] ? (
                  <img src={Images} alt="text" width={200} height={100} />
                ) : (
                  <img src={BGimage} alt="bg" width={200} height={100} />
                )}
              </div> */}
              <div className="change-img">
                <label htmlFor="icon-image" className="custom-file-upload">
                  <input
                    type="file"
                    id="icon-image"
                    name="icon"
                    onChange={handleFilechange}
                  />
                  Change Image
                </label>
              </div>
              <div className="done-btn">
                <Button varient="primary">Done</Button>
              </div>
            </div>
          </div>
        </ProductModule>
      )}
    </div>
  );
};

export default ImageCardModule;
