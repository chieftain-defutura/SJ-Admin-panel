import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout";
import "../../styles/adminManagement.scss";
import Button from "../../components/button";
import LayoutModule from "../../components/layoutModule";
import { Form, Formik } from "formik";
import Input from "../../components/input";
import { ReactComponent as Users } from "../../assets/icons/user.svg";
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import * as Yup from "yup";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { FirebaseError } from "firebase/app";
import { ADMIN_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { IAdminData } from "../../constants/types";
import AdminList from "./adminLists";

const initialValues = {
  userName: "",
  email: "",
  password: "",
  role: "",
  actions: "",
};

const AdminManagement: React.FC<IAdminData> = ({ id }) => {
  const [active, setActive] = useState(false);
  const [data, setData] = useState<IAdminData[]>([]);

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, "username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const dataStore = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      ).then((userCredential) => {
        console.log(userCredential);
      });

      console.log(values);

      const dataRef = await addDoc(collection(db, ADMIN_COLLECTION_NAME), {
        ...values,
      });
      console.log(dataRef);

      console.log("dataStore", dataStore);
      setActive(false);
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError) {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          // setErrorMessage("Invalid password");
        } else if (error.code === AuthErrorCodes.USER_DELETED) {
          // setErrorMessage("User not found");
        }
      }
    }
  };

  const handleGetData = useCallback(async () => {
    try {
      const adminData = query(collection(db, ADMIN_COLLECTION_NAME));
      const documentSnapshots = await getDocs(adminData);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log(lastVisible);
      const data = await getDocs(adminData);
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
    <Layout>
      <div className="admin-control">
        <div className="admin-management">
          <h3>Management users</h3>
          <div className="total-users">
            <h3>Total users</h3>
            <Users />
            {data.map((a, i) => (
              <h3 key={i}>{a.id.length}</h3>
            ))}
          </div>
        </div>
        <div className="add-btn">
          <Button varient="primary" onClick={() => setActive(true)}>
            Add users
          </Button>
        </div>
        {active && (
          <LayoutModule handleToggle={() => setActive(false)}>
            <div className="admin-form">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form>
                  <h3>Account management</h3>
                  <Input name="userName" type="text" placeholder="Name" />
                  <Input name="email" type="email" placeholder="Email" />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  <Input name="role" type="text" placeholder="Role" />
                  <Input name="actions" type="text" placeholder="Action" />
                  <Button varient="primary" type="submit">
                    <Send />
                    Done
                  </Button>
                </Form>
              </Formik>
            </div>
          </LayoutModule>
        )}
        <div className="admin-info">
          <div className="title">
            <h4>Username</h4>
            <h4>Email ID</h4>
            <h4>Role</h4>
            <h4>Actions</h4>
          </div>
          {data.map((a, i) => (
            <AdminList {...a} key={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminManagement;
