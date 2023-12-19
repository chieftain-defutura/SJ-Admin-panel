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
import { Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { DESIGN_TEXT_IMAGE } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";

interface IData extends IUploadFiles {
  // uploadImage: IDesigns;
  // handleFilechange: (e: any) => void;
}
const ImageCardModule: React.FC<IData> = ({ Images, id, OriginalImages }) => {
  const [active, setActive] = useState(false);
  const [isactive, setIsActive] = useState(false);
  const [isActiveImage, setActiveImage] = useState(true);
  const [uploadImage, setUploadImage] = useState<IDesigns>({});
  const [image, setImage] = useState("");

  const handleActive = () => {
    setActive(true);
  };
  const handleDelete = async () => {
    const DeleteRef = doc(db, DESIGN_TEXT_IMAGE, id);

    try {
      await deleteDoc(DeleteRef);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilechange = (e: any) => {
    const file = e.target.files[0];
    setUploadImage((e) => ({
      ...e,
      Images: file,
    }));
    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      setImage(r.target?.result as string);
    };

    fileReader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    try {
      setActiveImage(!isActiveImage);
      const docRef = doc(db, DESIGN_TEXT_IMAGE, id);

      await updateDoc(docRef, {
        activePost: isActiveImage,
        Images: image,
        created: Timestamp.now(),
      });
      console.log("Document successfully updated!");
      window.location.reload();

      setIsActive(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handleToggleUpdate = async () => {
    try {
      setActiveImage(!isActiveImage);
      const docRef = doc(db, DESIGN_TEXT_IMAGE, id);
      await updateDoc(docRef, {
        activePost: isActiveImage,
      });
      console.log("Document successfully updated!");
      setIsActive(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div>
      <div className="design-wrap">
        <div className="toggle-switch">
          <h3>Active</h3>
          <ToggleSwitch setValue={handleToggleUpdate} value={isActiveImage} />
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
              <p>Would you like me to delete the post?</p>
            </div>
            <div className="delete-section-btn">
              <Button varient="notifi" onClick={() => setIsActive(false)}>
                Cancel
              </Button>
              <Button varient="primary" onClick={handleDelete}>
                Done
              </Button>
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
                <img src={image} alt="products" width={176} height={234} />
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
                <Button varient="primary" onClick={handleUpdate}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </ProductModule>
      )}
    </div>
  );
};

export default ImageCardModule;
