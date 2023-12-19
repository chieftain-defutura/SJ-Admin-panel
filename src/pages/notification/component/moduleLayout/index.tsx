import React, { useState } from "react";
import "./moduleLayout.scss";
import LayoutModule from "../../../../components/layoutModule";
import { Form, Formik } from "formik";
import Input from "../../../../components/input";
import { ReactComponent as Uploadicon } from "../../../../assets/icons/upload-icon.svg";
import Button from "../../../../components/button";
import axios from "axios";

interface INote {
  handleToggle: () => void;
}
const initialValuees = {
  Title: "",
  SubTitle: "",
  Date: "",
  Time: "",
  Discription: "",
};

const NotifiyModule: React.FC<INote> = ({ handleToggle }) => {
  const [uploadImage, setUploadImage] = useState("");

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    // if (file.size > maxSize) {
    //   setFileSize(true);
    //   alert("File size exceeds the limit. Please choose a smaller file.");
    //   return;
    // }
    // setUploadFiles((e) => ({
    //   ...e,
    //   bannerImage: file,
    // }));
    const fileReader = new FileReader();
    fileReader.onload = (r) => {
      setUploadImage(r.target?.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const handleSubmit = async (values: typeof initialValuees) => {
    try {
      console.log("values", values);

      const { data } = await axios.post(
        "https://sj-clothing-backend.cyclic.app/pushToken",
        {
          title: values.Title,
          body: values.Discription,
          // time: values.Time,
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mx">
      <LayoutModule handleToggle={handleToggle}>
        <div className="module-layout">
          <h1>Create notification</h1>
          <Formik initialValues={initialValuees} onSubmit={handleSubmit}>
            {({ values }) => (
              <Form>
                <div className="notify-detail">
                  <div className="input-section">
                    <div>
                      <Input
                        name="Title"
                        type="text"
                        id="text"
                        value={values.Title}
                        placeholder="Enter title"
                        label="Title"
                      />
                    </div>
                    <div>
                      {" "}
                      <Input
                        name="SubTitle"
                        type="text"
                        id="text"
                        value={values.SubTitle}
                        placeholder="Enter Subtitle"
                        label="Sub title"
                      />
                    </div>
                  </div>
                  <div className="icon-upload">
                    <div className="image">
                      <h6>Profile image</h6>
                      <div className="border-icon">
                        <label
                          htmlFor="icon-image"
                          className="custom-file-upload"
                        >
                          <Uploadicon />
                          <input
                            type="file"
                            id="icon-image"
                            name="icon"
                            onClick={handleChange}
                          />
                          <h2>Upload image</h2>
                          <img
                            src={uploadImage}
                            alt=""
                            width={200}
                            height={100}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="date">
                      <Input
                        type="date"
                        name="Date"
                        id="dateupdate"
                        value={values.Date}
                        label="Date"
                      />
                      <Input
                        type="time"
                        name="Time"
                        id="timeupdate"
                        value={values.Time}
                        label="Time"
                      />
                    </div>
                  </div>
                  <div className="discription">
                    <Input
                      name="Discription"
                      type="text"
                      id="Discription"
                      value={values.Discription}
                      placeholder="Enter title"
                      label="Discription"
                    />
                  </div>
                </div>
                <div className="btn-bottoms">
                  <Button varient="secondary" onClick={handleToggle}>
                    Remove
                  </Button>
                  <Button
                    varient="primary"
                    type="submit"
                    // onClick={handleToggle}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </LayoutModule>
    </div>
  );
};

export default NotifiyModule;
