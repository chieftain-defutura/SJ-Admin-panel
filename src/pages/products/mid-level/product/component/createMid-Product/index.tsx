import React, { useMemo, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import "../../../../../../styles/createProduct.scss";
import Input from "../../../../../../components/input";
import Button from "../../../../../../components/button";
import { v4 } from "uuid";
import { ReactComponent as Plus } from "../../../../../../assets/icons/plus-2.svg";
import { ReactComponent as Delete } from "../../../../../../assets/icons/delete.svg";
import { Country, defaultSizes } from "../../../../../../data/midproductSize";
import CreateProductLayout from "../../../../../../layout/createProduct-layout";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../../../../../utils/firebase";
import { PRODUCTS_COLLECTION_NAME } from "../../../../../../constants/firebaseCollection";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ToggleSwitch from "../../../../../../components/toggleSwitch";
import ColorModule from "../../../../../../components/color-module";
import { IProductCategory } from "../../../../../../constants/types";
import { useNavigate } from "react-router-dom";
import MOdalPopUp from "../../../../../../components/ModalPopupBox";

const initialValue = {
  styles: "",
  productName: "",
  normalPrice: "",
  offerPrice: "",
  colors: ["#000000"],
  detailedFutures: [{ materials: "", cloth: "" }],
  showDesign: false,
  showTextDesign: false,
  frontSide: false,
  backSide: false,
  leftSide: false,
  rightSide: false,
};

export interface IFiles {
  productImage: File;
  productVideo: File;
}

export interface Material {
  index: number;
}

const CreateMidProduct: React.FC<Material> = ({ index }) => {
  const [image, setImage] = useState("");
  // const [video, setVideo] = useState("");
  const [files, setFiles] = useState<IFiles[]>([]);
  const [active, setActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  const [material, setMaterial] = useState<Material[]>([]);
  console.log(material);

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
  const navigate = useNavigate();

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
        sizes: sizes,
        type: IProductCategory.MID,
      });
      console.log(dataRef);
      navigate("/products/mid-level/product/styles");
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
  }, [gender, country, sizes]);
  console.log("getSizesLists", getSizesLists);

  console.log(sizes);
  return (
    <CreateProductLayout>
      <Formik initialValues={initialValue} onSubmit={handleSubmit}>
        {({ values, setValues, isSubmitting }) => (
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
                      {/* <div className="bg-video">
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
                      </div> */}
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
                      <div className="color-wrap" key={index}>
                        <div
                          style={{
                            backgroundColor: color,
                          }}
                          className="color-circle"
                          key={index}
                        ></div>
                        <Delete
                          onClick={() => {
                            const updatedColors = values.colors.filter(
                              (f) => f !== color
                            );
                            setValues((c) => ({ ...c, colors: updatedColors }));
                          }}
                        />
                      </div>
                    ))}

                    {active && (
                      <ColorModule
                        handleToggle={handleToggle}
                        setActive={setActive}
                        handleChange={(color) =>
                          setValues((v) => ({
                            ...v,
                            colors: [...v.colors, color],
                          }))
                        }
                      />
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
                        <div className="male" onClick={() => setGender("MALE")}>
                          <h3
                            style={{
                              color: gender === "MALE" ? "" : "#777",
                              borderBottom:
                                gender === "MALE" ? "2px solid #8C73CB" : "",
                            }}
                          >
                            Male
                          </h3>
                        </div>
                        <div
                          className="female"
                          onClick={() => setGender("FEMALE")}
                        >
                          <h3
                            style={{
                              color: gender === "FEMALE" ? "" : "#777",
                              borderBottom:
                                gender === "FEMALE" ? "2px solid #8C73CB" : "",
                            }}
                          >
                            Female
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="sizes">
                      <div>
                        {sizes.map((m, i) => (
                          <>
                            {m.country === country && m.gender === gender ? (
                              <div className="types" key={i}>
                                {m.sizeVarients.map((s, j) => (
                                  <div className="input-box" key={j}>
                                    <input
                                      type="checkbox"
                                      checked={s.show}
                                      onChange={(e) => {
                                        const newSizes = [...sizes];
                                        setSizes([
                                          ...newSizes.map((m, ii) => {
                                            console.log(ii !== i);
                                            if (ii !== i) return { ...m };
                                            const sizeVarients =
                                              m.sizeVarients.map((s, jj) => {
                                                if (jj !== j) return { ...s };
                                                return {
                                                  ...s,
                                                  show: e.target.checked,
                                                };
                                              });
                                            return { ...m, sizeVarients };
                                          }),
                                        ]);
                                      }}
                                    />
                                    <span>{s.size}</span>
                                    <input
                                      type="number"
                                      value={s.measurement}
                                      onChange={(e) => {
                                        const newSizes = [...sizes];

                                        setSizes([
                                          ...newSizes.map((m, ii) => {
                                            if (ii !== i) return { ...m };
                                            const sizeVarients =
                                              m.sizeVarients.map((s, jj) => {
                                                if (jj !== j) return { ...s };
                                                return {
                                                  ...s,
                                                  measurement: Number(
                                                    e.target.value
                                                  ),
                                                };
                                              });
                                            return { ...m, sizeVarients };
                                          }),
                                        ]);
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detailed-futures">
                <div className="toggle-image">
                  <div className="active-img">
                    <h3>Active image</h3>
                    <ToggleSwitch
                      value={values.showDesign}
                      setValue={(value) =>
                        setValues((v) => ({ ...v, showDesign: value }))
                      }
                    />
                  </div>
                  <div className="active-img">
                    <h3>Text image</h3>
                    <ToggleSwitch
                      value={values.showTextDesign}
                      setValue={(value) =>
                        setValues((v) => ({ ...v, showTextDesign: value }))
                      }
                    />
                  </div>
                </div>
                <div className="position-toggle">
                  <div>
                    <h2>Image positions :</h2>

                    <div className="toggle-positions">
                      <div className="toggles">
                        <ToggleSwitch
                          value={values.frontSide}
                          setValue={(value) =>
                            setValues((v) => ({ ...v, frontSide: value }))
                          }
                        />
                        <h3>Front side:</h3>
                      </div>
                      <div className="toggles">
                        <ToggleSwitch
                          value={values.backSide}
                          setValue={(value) =>
                            setValues((v) => ({ ...v, backSide: value }))
                          }
                        />
                        <h3>Back side:</h3>
                      </div>
                      <div className="toggles">
                        <ToggleSwitch
                          value={values.leftSide}
                          setValue={(value) =>
                            setValues((v) => ({ ...v, leftSide: value }))
                          }
                        />
                        <h3>Left side:</h3>
                      </div>
                      <div className="toggles">
                        <ToggleSwitch
                          value={values.rightSide}
                          setValue={(value) =>
                            setValues((v) => ({ ...v, rightSide: value }))
                          }
                        />
                        <h3>Right side:</h3>
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
                                  className="delete-icon"
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
              <div className="btn-submit">
                <Button varient="primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Uploading" : "submit"}
                </Button>
              </div>
              {isSubmitting && <MOdalPopUp />}
            </div>
          </Form>
        )}
      </Formik>
    </CreateProductLayout>
  );
};

export default CreateMidProduct;
