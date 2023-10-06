import React, { useCallback, useEffect, useState } from "react";
import "../../../../../../styles/uploadDesign.scss";
import MidprodcutLayout from "../../../../../../layout/midproduct-layout";
import { addDoc, collection, getDocs, query } from "firebase/firestore/lite";
import Button from "../../../../../../components/button";
import LayoutModule from "../../../../../../components/layoutModule";
import { DESIGN_TEXT_IMAGE } from "../../../../../../constants/firebaseCollection";
import { db, storage } from "../../../../../../utils/firebase";
import { IDesigns, IUploadFiles } from "../uploadDesign-Image";
import { ReactComponent as Plus } from "../../../../../../assets/icons/plus-2.svg";
import BGimage from "../../../../../../assets/icons/bg-image.svg";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Textimage = () => {
  const [active, setIsActive] = useState(false);
  const [uploadImage, setUploadImage] = useState<IDesigns>({});
  const [textImage, settextImage] = useState("");
  //   const [fileSize, setFileSize] = useState(false);
  const [data, setData] = useState<IUploadFiles[]>([]);
  const [hashTag, setHashtag] = useState("");

  const handleFilechange = (e: any) => {
    const file = e.target.files[0];
    setUploadImage((e) => ({
      ...e,
      TextImage: file,
    }));
    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      settextImage(r.target?.result as string);
    };
    fileReader.readAsDataURL(file);
  };
  console.log(textImage);
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
      });
      console.log(dataRef);
    } catch (error) {}
  };

  const handleGetData = useCallback(async () => {
    try {
      const productData = query(collection(db, DESIGN_TEXT_IMAGE));
      const data = await getDocs(productData);
      const fetchedData = data.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  }, [setData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);
  return (
    <MidprodcutLayout>
      <div className="upload-image">
        <h3>images</h3>
        <div className="upload-wrap">
          <div className="design-wrap" onClick={handleToggle}>
            <div className="plus-icon">
              <Plus />
            </div>
            <Button varient="primary">Add image</Button>
          </div>
          {active && (
            <LayoutModule handleToggle={handleToggle} className="layout-module">
              <h2>Add text image</h2>
              <div className="layout-wrap">
                <div className="upload-area">
                  {uploadImage["TextImage"] ? (
                    <img src={textImage} alt="image" width={200} height={100} />
                  ) : (
                    <img src={BGimage} alt="image" width={200} height={100} />
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
                  Change Image
                </label>
                <Button varient="primary" onClick={handleSubmit}>
                  Done
                </Button>
              </div>
            </LayoutModule>
          )}
          {data.map((i, index) => (
            <div className="design-wrap" key={index}>
              <div className="logo">
                <img src={i.TextImage} alt="" />
              </div>
              <Button varient="primary">view</Button>
            </div>
          ))}
        </div>
      </div>
    </MidprodcutLayout>
  );
};

export default Textimage;
