import React, { useState } from "react";
import PremiumLayout from "../../../../layout/premium-layout";
import { addDoc, collection } from "firebase/firestore/lite";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, Field, FieldArray, Form } from "formik";
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
import { ReactComponent as Delete } from "../../../../assets/icons/delete-icon.svg";
import { ReactComponent as Plus } from "../../../../assets/icons/plus.svg";
import { useNavigate } from "react-router-dom";

const initialValue = {
  styles: "",
  productName: "",
  normalPrice: "",
  offerPrice: "",
  detailedFutures: [{ materials: "", cloth: "" }],
};

const CreateAccessory: React.FC<Material> = ({ index }) => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState<IFiles[]>([]);
  const [material, setMaterial] = useState<Material[]>([]);
  console.log(material);
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
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {({ values, setValues, handleChange }) => (
          <Form>
            <div className="create-product">
              <div className="style-section">
                <h3>Select styles</h3>

                <div className="styles-wrap">
                  <div className="imageupload">
                    <Field as="select" name="styles">
                      <option value="">select styles</option>
                      <option value="pillow">pillow</option>
                      <option value="Bed">Bed</option>
                      <option value="Bed-shit">Bed shit</option>
                      <option value="Bed-cover">Bed cover</option>
                    </Field>
                    <div className="video-image">
                      <div className="bg-video">
                        <h4>Image</h4>
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
                            accept="image/jpg,image/png"
                          />
                          <div className="bg-image">
                            <img
                              src={image}
                              alt=""
                              width={200}
                              height={200}
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </label>
                      </div>
                      <div className="bg-video">
                        <h4>3D Video</h4>
                        <label htmlFor="3dvideo" className="custom-file-upload">
                          <input
                            type="file"
                            id="3dvideo"
                            name="video"
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              setFiles((e) => ({
                                ...e,
                                productVideo: file,
                              }));
                              const fileReader = new FileReader();
                              fileReader.onload = (r) => {
                                setVideo(r.target?.result as string);
                              };
                              fileReader.readAsDataURL(file);
                            }}
                            accept="video/mp4,video/x-m4v,video/*"
                          />
                          <div className="bg-image">
                            <video src={video} width={200} height={200} />
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
                  </div>
                </div>
              </div>
              <div className="detailes">
                <FieldArray name="detailedFutures">
                  {(arrayHelpers) => (
                    <>
                      <div className="add-btn">
                        <h3>Detailed Features</h3>
                      </div>

                      <div className="materials">
                        {values.detailedFutures.map((product, i) => (
                          <div className="input-colums">
                            <>
                              <Input
                                name={`detailedFutures[${i}].materials`}
                                type="text"
                                placeholder="Material"
                                key={i}
                              />
                              <Input
                                name={`detailedFutures[${i}].cloth`}
                                type="text"
                                placeholder="Cloth"
                              />
                              <div
                                className="delete"
                                onClick={() => {
                                  setMaterial((c) => {
                                    arrayHelpers.remove(i);
                                    return c.filter((i) => i.index !== index);
                                  });
                                }}
                              >
                                <Delete />
                              </div>
                              <div
                                className="plus-icon "
                                onClick={() => {
                                  arrayHelpers.push({
                                    materials: "",
                                    cloth: "",
                                  });
                                }}
                              >
                                <Plus />
                              </div>
                            </>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </FieldArray>
              </div>
              <div className="btn-submit">
                <Button varient="primary" type="submit">
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PremiumLayout>
  );
};

export default CreateAccessory;
