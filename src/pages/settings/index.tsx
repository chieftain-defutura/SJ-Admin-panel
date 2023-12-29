import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout";
import "../../styles/settings.scss";
import ToggleSwitch from "../../components/toggleSwitch";
import Input from "../../components/input";
import { Form, Formik } from "formik";
import Button from "../../components/button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const initialValues = {
  showAccessoryPage: false,
  premiumComingSoonText: "",
};

const Settings: React.FC = () => {
  const [setting, setSettings] = useState(initialValues);
  const [uploading, setUploading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const handleSubmit = async (value: typeof initialValues) => {
    try {
      // const settings = addDoc(collection(db, "Settings", "GeneralSettings"), {
      //   value,
      // });
      setUploading(true);
      const settings = doc(db, "Settings", "GeneralSettings");
      const updateDocs = updateDoc(settings, {
        showAccessoryPage: value.showAccessoryPage,
        premiumComingSoonText: value.premiumComingSoonText,
      });
      console.log("settings", updateDocs);
      setSettings(value);
      console.log(value);
      setUploading(false);
      setIsModified(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = () => {
    setIsModified(true); // Set modification state to true when input changes
  };

  const fetchData = useCallback(async () => {
    try {
      const docRef = doc(db, "Settings", "GeneralSettings"); // Replace "your_collection_name" with your actual collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        setSettings(fetchedData as any);
        console.log("fetchedData", fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <div className="settings">
        <h1>General Settings</h1>
        <Formik
          initialValues={setting}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ values, setValues }) => (
            <Form>
              <div className="general-setting">
                <div
                  className="accessory-toggle"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    paddingTop: "24px",
                  }}
                >
                  <h3>Accessory page :</h3>
                  <ToggleSwitch
                    value={values.showAccessoryPage}
                    setValue={(value) => {
                      setValues((v) => ({ ...v, showAccessoryPage: value }));
                      handleInputChange(); // Call function on toggle change
                    }}
                  />
                </div>
                <div className="input-text">
                  <Input
                    name="premiumComingSoonText"
                    type="text"
                    style={{ width: "200px" }}
                    placeholder="Comming soon"
                    onChange={(e) => {
                      handleInputChange(); // Call function on input change
                      // Additional logic to update the form values
                      setValues((v) => ({
                        ...v,
                        premiumComingSoonText: e.target.value, // Update the form state with the input value
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="btn">
                <Button
                  varient="primary"
                  type="submit"
                  style={{ width: "200px" }}
                  disabled={uploading || !isModified} // Disable if uploading or no modifications
                >
                  {uploading ? "Uploading" : isModified ? "Save" : "Saved"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default Settings;
