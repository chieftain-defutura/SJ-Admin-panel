import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import "../../../../../../styles/uploadDesign.scss";
import MidprodcutLayout from "../../../../../../layout/midproduct-layout";
import { ReactComponent as Plus } from "../../../../../../assets/icons/plus.svg";
import BGimage from "../../../../../../assets/icons/bg-image.svg";
import Button from "../../../../../../components/button";
import LayoutModule from "../../../../../../components/layoutModule";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  DESIGN_TEXT_IMAGE,
  PRODUCTS_COLLECTION_NAME,
} from "../../../../../../constants/firebaseCollection";
import { db, storage } from "../../../../../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { IProductCategory } from "../../../../../../constants/types";

import ImageCardModule from "../../../imageCardModule";
import ImagePriceCard from "../../../../../../components/imagePriceCard";
import Loading from "../../../../../../components/loading";
import UploadColorImage from "./UploadColorImage";

export interface IDesigns {
  Images?: File;
}
export interface IUploadFiles {
  Images: string;
  hashTag: string;
  id: string;
  OriginalImages: string;
  FrontAndBack: string;
  LeftAndRight: string;
}

interface IToggleDate {
  isActiveImage: boolean;
}

const UploadmidProductImage: React.FC<IToggleDate> = ({ isActiveImage }) => {
  const [active, setIsActive] = useState(false);
  const [uploadImage, setUploadImage] = useState<IDesigns>({});
  const [designLogo, setDesignLogo] = useState("");
  const [data, setData] = useState<IUploadFiles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState<string[]>([]);
  const [colorsFile, setColorsFile] = useState<(File | null)[]>([]);
  const [colorsPreviewImage, setColorsPreviewImage] = useState<
    (string | null)[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleGetColors = useCallback(async () => {
    try {
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.MID)
      );
      onSnapshot(productData, (q) => {
        const fetchedData = q.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        const tempColors: string[] = [];
        console.log(fetchedData);
        fetchedData.forEach((m: any) =>
          m.colors.forEach((c: string) => tempColors.push(c))
        );
        console.log(tempColors);
        const uniqColors = _.uniq(tempColors);
        setColors(uniqColors);
        setColorsFile([...uniqColors.map((m) => null)]);
        setColorsPreviewImage([...uniqColors.map((m) => null)]);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleGetColors();
  }, [handleGetColors]);

  const handleFilechange = (e: any) => {
    const file = e.target.files[0];
    setUploadImage((e) => ({
      ...e,
      Images: file,
    }));

    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      setDesignLogo(r.target?.result as string);
    };

    fileReader.readAsDataURL(file);
  };

  const [hashTag, setHashtag] = useState("");
  console.log(designLogo);
  console.log(hashTag);

  const handleToggle = () => {
    setIsActive(true);
  };

  const handleSubmit = async () => {
    if (colorsFile.some((s) => s === null))
      return alert("Upload original images to proceed");

    try {
      setLoading(true);

      let urls = {};
      let originalImages: { url: string; colorCode: string }[] = [];

      let UploadFiles = 0;
      const imageFileUrl = Object.entries(uploadImage).map((f) => f);

      await Promise.all(
        imageFileUrl.map(async (f) => {
          const imageRef = ref(storage, `DesignImages/${v4()}`);
          const uploadFile = uploadBytesResumable(imageRef, f[1]);

          await uploadFile;

          const downloadURL = await getDownloadURL(uploadFile.snapshot.ref);
          UploadFiles += 1;
          console.log("imageurl", downloadURL);
          console.log(UploadFiles);
          urls = { ...urls, [f[0]]: downloadURL };
        })
      );

      await Promise.all(
        colorsFile.map(async (f, index) => {
          if (!f) return null;
          const imageRef = ref(storage, `DesignImages/${v4()}`);
          const uploadFile = uploadBytesResumable(imageRef, f);

          await uploadFile;

          const downloadURL = await getDownloadURL(uploadFile.snapshot.ref);
          console.log("imageurl", downloadURL);
          originalImages.push({ colorCode: colors[index], url: downloadURL });
        })
      );
      console.log(urls);
      console.log(originalImages);

      const dataRef = await addDoc(collection(db, DESIGN_TEXT_IMAGE), {
        ...urls,
        originalImages,
        hashTag,
        type: IProductCategory.DESIGN_IMAGE,
        activePost: isActiveImage,
        created: Timestamp.now(),
      });
      setIsActive(!active);
      setLoading(false);
      console.log(dataRef);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      // const productData = query(
      //   collection(db, DESIGN_TEXT_IMAGE),
      //   where("Designs", "==", uploadImage.Designs)
      // );
      const productData = query(
        collection(db, DESIGN_TEXT_IMAGE),
        where("type", "==", IProductCategory.DESIGN_IMAGE)
      );
      onSnapshot(productData, (q) => {
        const fetchedData = q.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        console.log(fetchedData);
        setData(fetchedData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  const handleChangeColorsFile = (index: number, files: FileList | null) => {
    if (!files) return;
    const file = files[0];

    const tempColorsFile = [...colorsFile];
    tempColorsFile[index] = file;
    setColorsFile([...tempColorsFile]);

    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      const tempColorsPreviewImage = [...colorsPreviewImage];
      tempColorsPreviewImage[index] = r.target?.result as string;
      setColorsPreviewImage([...tempColorsPreviewImage]);
    };

    fileReader.readAsDataURL(file);
  };

  console.log(colors);

  return (
    <MidprodcutLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="upload-image">
          <h3>images</h3>
          <div className="upload-wrap">
            <ImagePriceCard data={data} />

            <div className="design-wrap" onClick={handleToggle}>
              <div className="plus-icon">
                <Plus />
              </div>
              <div className="add-btn">
                <Button varient="primary">Add image</Button>
              </div>
            </div>
            {active && (
              <LayoutModule
                handleToggle={() => setIsActive(!active)}
                className="layout-module"
              >
                <h2>Add image</h2>
                <div className="layout-wrap">
                  <div className="upload-area">
                    {uploadImage["Images"] ? (
                      <img
                        src={designLogo}
                        alt="design-logo"
                        // width={164}
                        // height={160}
                      />
                    ) : (
                      <img src={BGimage} alt="Bg" width={200} height={100} />
                    )}
                  </div>
                  {/* <div className="upload-area">
                    {uploadImage["OriginalImages"] ? (
                      <img
                        src={originalImage}
                        alt="design-logo"
                        // width={164}
                        // height={160}
                      />
                    ) : (
                      <img src={BGimage} alt="Bg" width={200} height={100} />
                    )}
                  </div> */}

                  <div className="input-area">
                    <label htmlFor="tag">
                      #tag
                      <input
                        type="text"
                        value={hashTag}
                        onChange={(e) => setHashtag(e.target.value)}
                        id="tag"
                        placeholder="#tag"
                      />
                    </label>
                  </div>
                </div>
                <div className="btn-upload">
                  <label htmlFor="icon-image" className="custom-file-upload">
                    <input
                      type="file"
                      id="icon-image"
                      name="icon"
                      onChange={handleFilechange}
                    />
                    Change preview image
                  </label>
                  {/* <label htmlFor="original-image" className="custom-file-upload">
                    <input
                      type="file"
                      id="original-image"
                      name="collapse-img"
                      onChange={handlechange}
                    />
                    Change original image
                  </label> */}
                </div>
                <div className="colors-list">
                  {colors.map((color, index) => (
                    <UploadColorImage
                      key={index.toString()}
                      index={index}
                      color={color}
                      handleChangeColorsFile={handleChangeColorsFile}
                      previewImage={colorsPreviewImage[index]}
                    />
                  ))}
                </div>
                <Button
                  disabled={loading}
                  varient="primary"
                  style={{ width: "100%" }}
                  onClick={handleSubmit}
                >
                  {loading ? "Uploading please wait..." : "Done"}
                </Button>
              </LayoutModule>
            )}

            {data.map((i, index) => (
              <ImageCardModule {...i} key={index} />
            ))}
          </div>
        </div>
      )}
    </MidprodcutLayout>
  );
};

export default UploadmidProductImage;
