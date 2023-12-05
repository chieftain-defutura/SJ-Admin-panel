import { doc, updateDoc } from "firebase/firestore";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form } from "formik";
import { DESIGN_TEXT_IMAGE } from "../../constants/firebaseCollection";
import { db } from "../../utils/firebase";
import Button from "../button";
import Input from "../input";
import { IUploadFiles } from "../../pages/products/mid-level/product/component/uploadDesign-Image";
const initialValue = {
  FrontAndBack: "",
  LeftAndRight: "",
};
interface IImagePrice {
  data: IUploadFiles[];
}

const ImagePriceCard: React.FC<IImagePrice> = ({ data }) => {
  const [save, setSave] = useState(false);
  const handleUpdate = async (values: typeof initialValue) => {
    try {
      data.map((f) => {
        const updateImageFee = doc(db, DESIGN_TEXT_IMAGE, f.id);
        const dataRef = updateDoc(updateImageFee, {
          imagePrices: values,
        });
        console.log(dataRef);
        setSave(true);
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Formik initialValues={initialValue} onSubmit={handleUpdate}>
        {({ isSubmitting }) => (
          <Form>
            <div className="design-wrap">
              <div>
                <div className="image-price">
                  <Input
                    name="FrontAndBack"
                    placeholder="0"
                    label="Front and back  price"
                    type="text"
                  />
                </div>
                <div className="image-price">
                  <Input
                    name="LeftAndRight"
                    placeholder="0"
                    label="Left arm and right arm price"
                    type="text"
                  />
                </div>
              </div>

              <div className="add-btn">
                <Button varient="primary" type="submit">
                  {save ? "saved" : "Save"}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ImagePriceCard;
