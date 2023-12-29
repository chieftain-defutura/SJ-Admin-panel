import React, { useState } from "react";
import PremiumLayout from "../../../../layout/premium-layout";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, Field, Form } from "formik";
import { v4 } from "uuid";
import Button from "../../../../components/button";
import Input from "../../../../components/input";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { IProductCategory } from "../../../../constants/types";
import { storage, db } from "../../../../utils/firebase";
import {
  IFiles,
  Material,
} from "../../../products/mid-level/product/component/createMid-Product";

import { Link, useNavigate } from "react-router-dom";
import MOdalPopUp from "../../../../components/ModalPopupBox";
import { validationSchema } from "../../../../constants/validations";
import BGimg from "../../../../assets/images/bg-img.png";

const initialValue = {
  styles: "",
  productName: "",
  normalPrice: "",
  offerPrice: "",
  description: "",
  netWeight: "",
};

const CreateAccessory: React.FC<Material> = ({ index }) => {
  const [image, setImage] = useState("");
  // const [video, setVideo] = useState("");
  const [files, setFiles] = useState<IFiles[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (value: typeof initialValue) => {
    try {
      let urls = {};

      const imageFiles = Object.entries(files).map((d) => d);

      let UploadFiles = 0;

      await Promise.all(
        imageFiles.map(async (f) => {
          const imageRef = ref(storage, `ProductsImages/${v4()}`);
          const uploadFile = uploadBytesResumable(imageRef, f[1] as any);

          await uploadFile;

          const downloadURL = await getDownloadURL(uploadFile.snapshot.ref);
          console.log("file URL", downloadURL);
          UploadFiles += 1;
          console.log(UploadFiles);
          urls = { ...urls, [f[0]]: downloadURL };
        })
      );
      console.log(urls);

      const dataRef = await addDoc(collection(db, PRODUCTS_COLLECTION_NAME), {
        ...value,
        ...urls,
        type: IProductCategory.ACCESSORY,
      });
      console.log(dataRef);
      navigate("/products/mid-level/accessory");
    } catch (error) {
      console.log("error", error);
    }
    console.log("value", value);
  };

  return (
    <PremiumLayout>
      <Formik
        initialValues={initialValue}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setValues, isSubmitting }) => (
          <Form>
            <div className="create-product">
              <div className="style-section">
                <div className="gender-update">
                  <h3>Select styles</h3>
                </div>

                <div className="styles-wrap">
                  <div className="imageupload">
                    <div className="drop_down">
                      <Field as="select" name="styles">
                        <option value="">select styles</option>
                        <option value="Saree">Pillow</option>
                        <option value="Blazers">Bedsheet</option>
                        <option value="Shirt">Bed cover</option>
                        <option value="Jacket">Pillow cover</option>
                      </Field>
                    </div>
                    <div className="video-image">
                      <div className="bg-video">
                        <h4> Product image</h4>
                        <label
                          htmlFor="product-image"
                          className="custom-file-upload"
                        >
                          <input
                            type="file"
                            id="product-image"
                            name="image"
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              setFiles((e) => ({
                                ...e,
                                productImage: file,
                              }));
                              const fileReader = new FileReader();
                              fileReader.onload = (r) => {
                                setImage(r.target?.result as string);
                              };
                              fileReader.readAsDataURL(file);
                            }}
                            // files={files}
                            // accept="image/jpg,image/png"
                          />
                          <div className="bg-image">
                            {image ? (
                              <img
                                src={image}
                                alt=""
                                width={120}
                                height={120}
                                style={{ objectFit: "contain" }}
                              />
                            ) : (
                              <img
                                src={BGimg}
                                alt=""
                                width={70}
                                height={70}
                                style={{ objectFit: "contain" }}
                              />
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="product-info">
                    <div>
                      <Input
                        name="productName"
                        type="text"
                        placeholder="Enter your Product"
                        label="Product Name"
                        value={values.productName}
                      />
                    </div>
                    <div>
                      <Input
                        name="normalPrice"
                        type="text"
                        placeholder="Enter normal price"
                        label="Normal Price"
                        value={values.normalPrice}
                      />
                    </div>
                    <div>
                      <Input
                        name="offerPrice"
                        type="text"
                        placeholder="Enter offer price"
                        label="Offer Price"
                        value={values.offerPrice}
                      />
                    </div>
                    <div>
                      <Input
                        name="netWeight"
                        type="text"
                        placeholder="Enter product weight"
                        label="Net weight"
                        value={values.netWeight}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="sizes-futures">
                <div className="description-section">
                  <div className="description">
                    <h3>Description</h3>
                    <Field
                      as="textarea"
                      placeholder="description"
                      name="description"
                      rows="3"
                      value={values.description}
                      style={{
                        maxWidth: "100%",
                        width: "100%",
                        fontSize: "16px",
                        padding: "16px 18px",
                        outline: "none",
                        border: "1px solid #e1e1e1",
                        marginTop: "16px",
                      }}
                    />
                    {/* <Input
                     name="description"
                    type="text"
                     value={values.description}
                  /> */}
                  </div>
                </div>
                <div className="btn-submit">
                  <Link to="/products/mid-level/accessory">
                    <Button varient="notifi">Cancel</Button>
                  </Link>
                  <Button
                    varient="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Uploading" : "submit"}
                  </Button>
                            
                </div>
                {isSubmitting && <MOdalPopUp />}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PremiumLayout>
  );
};

export default CreateAccessory;
