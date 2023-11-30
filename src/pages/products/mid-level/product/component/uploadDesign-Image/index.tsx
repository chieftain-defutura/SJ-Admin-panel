import React, { useCallback, useEffect, useState } from "react";
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
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { DESIGN_TEXT_IMAGE } from "../../../../../../constants/firebaseCollection";
import { db, storage } from "../../../../../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { IProductCategory } from "../../../../../../constants/types";

import ImageCardModule from "../../../imageCardModule";
import ImagePriceCard from "../../../../../../components/imagePriceCard";
import Loading from "../../../../../../components/loading";

export interface IDesigns {
  Images?: File;
  OriginalImages?: File;
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
  const [originalImage, setOriginalImage] = useState("");
  const [data, setData] = useState<IUploadFiles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handlechange = (e: any) => {
    const file = e.target.files[0];
    setUploadImage((e) => ({
      ...e,
      OriginalImages: file,
    }));
    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      setOriginalImage(r.target?.result as string);
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
    setIsActive(!active);

    try {
      let urls = {};

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
      console.log(urls);

      const dataRef = await addDoc(collection(db, DESIGN_TEXT_IMAGE), {
        ...urls,
        hashTag,
        type: IProductCategory.DESIGN_IMAGE,
        activePost: isActiveImage,
        created: Timestamp.now(),
      });
      window.location.reload();
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
      const data = await getDocs(productData);
      const fetchedData = data.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

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
                  <div className="upload-area">
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
                  </div>

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
                    Change previw image
                  </label>
                  <label
                    htmlFor="original-image"
                    className="custom-file-upload"
                  >
                    <input
                      type="file"
                      id="original-image"
                      name="collapse-img"
                      onChange={handlechange}
                    />
                    Change original image
                  </label>
                  <Button varient="primary" onClick={handleSubmit}>
                    Done
                  </Button>
                </div>
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
