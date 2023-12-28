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

  const handleSubmit = async (value: typeof initialValues) => {
    try {
      // const settings = addDoc(collection(db, "Settings", "GeneralSettings"), {
      //   value,
      // });
      const settings = doc(db, "Settings", "GeneralSettings");
      const updateDocs = updateDoc(settings, {
        showAccessoryPage: value.showAccessoryPage,
        premiumComingSoonText: value.premiumComingSoonText,
      });
      console.log("settings", updateDocs);
      setSettings(updateDocs as any);

      console.log(value);
    } catch (error) {
      console.log(error);
    }
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
                    setValue={(value) =>
                      setValues((v) => ({ ...v, showAccessoryPage: value }))
                    }
                  />
                </div>
                <div className="input-text">
                  <Input
                    name="premiumComingSoonText"
                    type="text"
                    style={{ width: "200px" }}
                    placeholder="Comming soon"
                  />
                </div>
              </div>
              <div className="btn">
                <Button
                  varient="primary"
                  type="submit"
                  style={{ width: "200px" }}
                >
                  {setting ? "Saved" : "saved"}
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
