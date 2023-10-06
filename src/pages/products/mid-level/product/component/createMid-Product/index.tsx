import React, { ChangeEvent, useMemo, useState } from "react";
import { Field, FieldArray, Form, Formik, FormikValues } from "formik";
import "../../../../../../styles/createProduct.scss";
import Input from "../../../../../../components/input";
import Button from "../../../../../../components/button";
import { v4 } from "uuid";
import LayoutModule from "../../../../../../components/layoutModule";
import { ReactComponent as Plus } from "../../../../../../assets/icons/plus-2.svg";
import { ReactComponent as Delete } from "../../../../../../assets/icons/delete.svg";
import { NavLink } from "react-router-dom";
import {
  Country,
  Sizes,
  defaultSizes,
} from "../../../../../../data/midproductSize";
import CreateProductLayout from "../../../../../../layout/createProduct-layout";
import { addDoc, collection } from "firebase/firestore/lite";
import { db, storage } from "../../../../../../utils/firebase";
import { PRODUCTS_COLLECTION_NAME } from "../../../../../../constants/firebaseCollection";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ToggleSwitch from "../../../../../../components/toggleSwitch";

const initialValue = {
  styles: "",
  productName: "",
  normalPrice: "",
  offerPrice: "",
  colors: ["#000000"],
  colorPickerOpen: true,
  sizes: [
    {
      gender: "",
      country: "",
      sizeVarients: [{ size: "", maturements: 0, show: false }],
    },
  ],
  detailedFutures: [{ materials: "", cloth: "" }],
};

interface IFiles {
  productImage: File;
  productVideo: File;
}

interface Material {
  index: number;
}

const CreateMidProduct: React.FC<Material> = ({ index }) => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState<IFiles[]>([]);
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [material, setMaterial] = useState<Material[]>([]);
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [country, setCountry] = useState("");
  const [sizes, setSizes] = useState<
    {
      gender: string;
      country: string;
      sizeVarients: {
        size: string;
        measurement: number;
        show: boolean;
      }[];
    }[]
  >([]);

  const handleToggle = () => {
    setActive(true);
    setToggle(true);
  };
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
      });
      console.log(dataRef);
    } catch (error) {
      console.log("error", error);
    }
    console.log("value", value);
  };

  const getSizesLists = useMemo(() => {
    if (!gender || !country) return undefined;

    const data = sizes.find(
      (f) => f.country === country && f.gender === gender
    );
    console.log(data);
    if (!data) {
      setSizes((e) => [
        ...e,
        {
          gender: gender,
          country: country,
          sizeVarients: [...defaultSizes],
        },
      ]);
      return;
    } else {
      return data;
    }
  }, [gender, country]);
  console.log(sizes);
  return (
    <CreateProductLayout>
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
                      <option value="Round Neck">Round Neck</option>
                      <option value="V Neck">V Neck</option>
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
                            <img src={image} alt="" width={200} height={200} />
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
                            <video src={video}></video>
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

              <div className="color-section">
                <div>
                  <h3>Select Colors</h3>
                  <div className="color">
                    <Button varient="primary" onClick={handleToggle}>
                      Add
                    </Button>

                    {values.colors.map((color, index) => (
                      <div className="color-wrap">
                        <div
                          style={{
                            backgroundColor: color,
                          }}
                          className="color-circle"
                          key={index}
                        ></div>
                        <Delete
                          onClick={() => {
                            const updatedColors = [...values.colors];
                            updatedColors.splice(index, 1);
                            setValues({ ...values, colors: updatedColors });
                          }}
                        />
                      </div>
                    ))}

                    {active && (
                      <LayoutModule
                        handleToggle={handleToggle}
                        className="color-layout"
                      >
                        <div className="colorname">
                          <h3>Colour</h3>

                          <h3>Hex code</h3>
                        </div>
                        <div className="color-details">
                          <div className="choose-color">
                            <Input
                              name="color"
                              type="color"
                              value={values.colors[values.colors.length - 1]}
                              onChange={(e) => {
                                const updatedColors = [
                                  ...values.colors,
                                  e.target.value,
                                ];
                                setValues({
                                  ...values,
                                  colors: updatedColors,
                                  colorPickerOpen: false,
                                });
                              }}
                            />
                          </div>

                          <div className="color-code">
                            {values.colors.map((f, index) => (
                              <h2 key={index}>{f}</h2>
                            ))}
                          </div>
                        </div>
                        <div className="done-btn">
                          <Button
                            varient="primary"
                            onClick={() => setActive(false)}
                          >
                            Done
                          </Button>
                        </div>
                      </LayoutModule>
                    )}
                  </div>
                </div>
                <div>
                  <h3>Select Size</h3>
                  <div className="size">
                    <div className="drop-down-section">
                      <div className="drop-down">
                        <select
                          name="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="">Select country</option>
                          {Country.map((f, i) => (
                            <option id={f} value={f} key={i}>
                              {f}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="gender">
                        <div
                          className="male"
                          onClick={(e) => setGender("MALE")}
                        >
                          <h3>Male</h3>
                        </div>
                        <div
                          className="female"
                          onClick={(e) => setGender("FEMALE")}
                        >
                          <h3>Female</h3>
                        </div>
                      </div>
                    </div>
                    <div className="sizes">
                      <div className="types">
                        {sizes
                          // .filter(
                          //   (f) => f.country === country && f.gender === gender
                          // )
                          .map((m) => (
                            <div>
                              /
                              <h2>
                                {m.country} {m.gender}
                              </h2>
                              {m.sizeVarients.map((s, i) => (
                                <div key={i}>
                                  <input
                                    type="checkbox"
                                    checked={s.show}
                                    onChange={(e) => {
                                      const findIndex = sizes.findIndex(
                                        (f) =>
                                          f.country === m.country &&
                                          f.gender === m.gender
                                      );
                                      console.log(findIndex);
                                      const newSizes = [...sizes];
                                      const newSizeVariant = [
                                        ...sizes[findIndex].sizeVarients,
                                      ];
                                      newSizeVariant[i].show = e.target.checked;
                                      newSizes[findIndex].sizeVarients = [
                                        ...newSizeVariant,
                                      ];
                                      console.log(newSizes);

                                      // setSizes(newSizes);
                                    }}
                                  />
                                  <span>{s.size}</span>
                                  <input
                                    type="number"
                                    value={s.measurement}
                                    onChange={(e) => {
                                      const findIndex = sizes.findIndex(
                                        (f) =>
                                          f.country === country &&
                                          f.gender === gender
                                      );
                                      const newSizes = [...sizes];
                                      const newSizeVariant = [
                                        ...newSizes[findIndex].sizeVarients,
                                      ];
                                      newSizeVariant[i].measurement = Number(
                                        e.target.value
                                      );
                                      newSizes[findIndex].sizeVarients =
                                        newSizeVariant;
                                      setSizes(newSizes);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                        <FieldArray name="sizes">
                          {(arrayHelpers) => (
                            <div>
                              {Sizes.map((f, i) =>
                                f.sizeVarients.map((f, i) => (
                                  <div className="input-box" key={i}>
                                    <Input
                                      type="checkbox"
                                      checked={f.show}
                                      name={`sizes[${index}].sizeVarients.show`}
                                      onChange={handleChange}
                                    />
                                    <Input
                                      type="text"
                                      value={f.size}
                                      name={`sizes[${index}].sizeVarients.size`}
                                      onChange={handleChange}
                                    />
                                    <Input
                                      type="number"
                                      value={f.maturements}
                                      name={`sizes[${index}].Varients.maturements`}
                                      onChange={handleChange}
                                    />
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detailed-futures">
                <div className="toggle-image">
                  <div className="active-img">
                    <h3>Active image</h3>
                    <ToggleSwitch label={""} />
                  </div>
                  <div className="active-img">
                    <h3>Text image</h3>
                    <ToggleSwitch label={""} />
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
              </div>
              <Button varient="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CreateProductLayout>
  );
};

export default CreateMidProduct;