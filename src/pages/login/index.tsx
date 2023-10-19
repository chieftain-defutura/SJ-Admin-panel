import { Formik } from "formik";
import React from "react";
import "../../styles/login.scss";
import Input from "../../components/input";
import Button from "../../components/button";
// import { ReactComponent as Mail } from "../../assets/icons/mail.svg";
// import { ReactComponent as Lock } from "../../assets/icons/lock.svg";

const initialValue = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const handleSubmit = (values: typeof initialValue) => {
    console.log(values);
  };
  return (
    <div className="mx">
      <div className="login-home">
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          {({ values }) => (
            <>
              <div className="login-input">
                <Input
                  type="email"
                  name="email"
                  value={values.email}
                  placeholder="Email"
                />
                {/* <Mail /> */}
              </div>
              <div className="login-input">
                <Input
                  name="password"
                  type="password"
                  value={values.password}
                  placeholder="Password"
                />
                {/* <Lock /> */}
              </div>
              <div className="login-btn">
                <Button varient="primary" type="submit">
                  Submit
                </Button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
