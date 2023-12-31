import React, { useCallback, useEffect, useMemo, useState } from "react";
import PremiumLayout from "../../../layout/premium-layout";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Formik, Field, Form } from "formik";
import { v4 } from "uuid";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { PRODUCTS_COLLECTION_NAME } from "../../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../../constants/types";
import { defaultSizes, Country } from "../../../data/midproductSize";
import { storage, db } from "../../../utils/firebase";
import { IFiles } from "../../products/mid-level/product/component/createMid-Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import MOdalPopUp from "../../../components/ModalPopupBox";
import Bgimg from "../../../assets/images/bg-img.png";
import { validationSchema } from "../../../constants/validations";

const initialValue = {
  styles: "",
  productName: "",
  normalPrice: "",
  offerPrice: "",
  netWeight: "",
  description: "",
  gender: "MALE",
};

const EditPremium: React.FC = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [files, setFiles] = useState<IFiles[]>([]);
  const [fabricImage, setFabricImage] = useState("");

  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [data, setData] = useState<typeof initialValue | null>(null);
  const { id } = useParams();

  const [sizes, setSizes] = useState<
    {
      country: string;
      sizeVarients: {
        size: string;
        quantity: number;
        measurement: number;
        show: boolean;
      }[];
    }[]
  >([]);

  const handleGetData = useCallback(async () => {
    try {
      if (!id) return;
      //   setIsLoading(true);
      const docref = doc(db, PRODUCTS_COLLECTION_NAME, id);
      const data = await getDoc(docref);

      if (data.exists()) {
        const tempData = data.data() as IProductdata;
        console.log(data.data());
        setData({
          description: tempData.description,
          gender: tempData.gender,
          normalPrice: tempData.normalPrice,
          offerPrice: tempData.offerPrice,
          productName: tempData.productName,
          styles: tempData.styles,
          netWeight: tempData.netWeight,
        });
        setImage(tempData.productImage);
        setSizes(tempData.sizes);
        setVideo(tempData.productVideo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      //   setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleSubmit = async (value: typeof initialValue) => {
    try {
      if (!id) return alert("id is not found");
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

      const dataRef = doc(db, PRODUCTS_COLLECTION_NAME, id);
      await updateDoc(dataRef, {
        ...value,
        ...urls,
        sizes: sizes,
        type: IProductCategory.PREMIUM,
      });

      console.log(dataRef);
      navigate("/products/premium");
    } catch (error) {
      console.log("error", error);
    }
    console.log("value", value);
  };

  const getSizesLists = useMemo(() => {
    if (!country) return undefined;

    const data = sizes.find((f) => f.country === country);
    console.log(data);
    if (!data) {
      setSizes((e) => [
        ...e,
        {
          country: country,
          sizeVarients: [...defaultSizes],
        },
      ]);
      return;
    } else {
      return data;
    }
  }, [country, sizes]);
  console.log("getSizesLists", getSizesLists);
  return (
    <PremiumLayout>
      <Formik
        initialValues={data || initialValue}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setValues, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="create-product">
              <div className="style-section">
                <div className="gender-update">
                  <h3>Select styles</h3>

                  <div className="gender">
                    <div
                      className="male"
                      onClick={() => setFieldValue("gender", "MALE")}
                    >
                      <h3
                        style={{
                          color: values.gender === "MALE" ? "" : "#777",
                          borderBottom:
                            values.gender === "MALE" ? "2px solid #8C73CB" : "",
                        }}
                      >
                        Male
                      </h3>
                    </div>
                    <div
                      className="female"
                      onClick={() => setFieldValue("gender", "FEMALE")}
                    >
                      <h3
                        style={{
                          color: values.gender === "FEMALE" ? "" : "#777",
                          borderBottom:
                            values.gender === "FEMALE"
                              ? "2px solid #8C73CB"
                              : "",
                        }}
                      >
                        Female
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="styles-wrap">
                  <div className="imageupload">
                    <div className="drop_down">
                      <Field as="select" name="styles">
                        <option value="">select styles</option>
                        <option value="Saree">Saree</option>
                        <option value="Blazers">Blazers</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Jacket">Jacket</option>
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
                                src={Bgimg}
                                alt=""
                                width={70}
                                height={70}
                                style={{ objectFit: "contain" }}
                              />
                            )}
                          </div>
                        </label>
                      </div>
                      <div className="bg-video">
                        <h4>Fabric image</h4>
                        <label
                          htmlFor="fabric-image"
                          className="custom-file-upload"
                        >
                          <input
                            type="file"
                            id="fabric-image"
                            name="image"
                            onChange={(e: any) => {
                              const file = e.target.files[0];
                              setFiles((e) => ({
                                ...e,
                                fabricImage: file,
                              }));
                              const fileReader = new FileReader();
                              fileReader.onload = (r) => {
                                setFabricImage(r.target?.result as string);
                              };
                              fileReader.readAsDataURL(file);
                            }}
                            // files={files}
                            // accept="image/jpg,image/png"
                          />
                          <div className="bg-image">
                            {fabricImage ? (
                              <img
                                src={fabricImage}
                                alt=""
                                width={120}
                                height={120}
                                style={{ objectFit: "contain" }}
                              />
                            ) : (
                              <img
                                src={Bgimg}
                                alt=""
                                width={70}
                                height={70}
                                style={{ objectFit: "contain" }}
                              />
                            )}
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
                            {video ? (
                              <video src={video} width={120} height={120} />
                            ) : (
                              <img
                                src={Bgimg}
                                width={70}
                                height={70}
                                alt="bg"
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
                <div className="color-section">
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
                        {/* <div className="gender">
                          <div
                            className="male"
                            onClick={() => setGender("MALE")}
                          >
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
                                  gender === "FEMALE"
                                    ? "2px solid #8C73CB"
                                    : "",
                              }}
                            >
                              Female
                            </h3>
                          </div>
                        </div> */}
                      </div>
                      <div className="sizes">
                        <div>
                          {sizes.map((m, i) => (
                            <>
                              {m.country === country ? (
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
                                      <input
                                        type="number"
                                        value={s.quantity}
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
                                                    quantity: Number(
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
                  <div className="description">
                    <h3>Description</h3>
                    <Field
                      as="textarea"
                      placeholder="description"
                      name="description"
                      rows="3"
                      value={values.description}
                      style={{
                        maxWidth: "500px",
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
                  <Link to="/products/premium">
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

export default EditPremium;
