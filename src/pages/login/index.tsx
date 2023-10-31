import { Form, Formik } from "formik";
import React from "react";
import "../../styles/login.scss";
import Input from "../../components/input";
import Button from "../../components/button";
import * as Yup from "yup";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
// import { ReactComponent as Mail } from "../../assets/icons/mail.svg";
// import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

const initialValue = {
  Email: "",
  Password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValue) => {
    try {
      const dataStore = await signInWithEmailAndPassword(
        auth,
        values.Email,
        values.Password
      ).then((userCredential) => {
        console.log(userCredential);
      });
      navigate("/dashboard");
      console.log(values);
      console.log("dataStore", dataStore);
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

  return (
    <div className="mx">
      <div className="login-home">
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="login-input">
              <Input type="email" name="Email" placeholder="Email" />
            </div>
            <div className="login-input">
              <Input name="Password" type="password" placeholder="Password" />
            </div>
            <div className="login-btn">
              <Button varient="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
