import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import "../../styles/login.scss";
import Input from "../../components/input";
import Button from "../../components/button";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
// import { ReactComponent as Mail } from "../../assets/icons/mail.svg";
// import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

const initialValue = {
  Email: "",
  Password: "",
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(errorMessage);

  const parent = useRef(null);

  const validationSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: typeof initialValue) => {
    try {
      setLoading(true);

      const dataStore = await signInWithEmailAndPassword(
        auth,
        values.Email,
        values.Password
      ).then((userCredential) => {
        console.log(userCredential);
      });
      navigate("/");
      console.log(values);
      console.log("dataStore", dataStore);
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid user or password");
      // if (error instanceof FirebaseError) {
      //   if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
      //     setErrorMessage("Invalid password");
      //   } else if (error.code === AuthErrorCodes.USER_DELETED) {
      //     setErrorMessage("User not found");
      //   }
      // }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="mx">
      {loading ? (
        <Loading />
      ) : (
        <div className="login-home">
          <Formik
            initialValues={initialValue}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <div ref={parent}>
                {errorMessage && (
                  <div className="error-window">
                    <p style={{ color: "red", textAlign: "center" }}>
                      {errorMessage}
                    </p>
                  </div>
                )}
              </div>
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
      )}
    </div>
  );
};

export default Login;
