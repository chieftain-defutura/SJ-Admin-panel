import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../layout";
import { ReactComponent as SubscribedIcon } from "../../assets/icons/subscribed.svg";
import TotalRevenue from "../../components/dashboard/totalRevenue";
import OrdersCard from "../../components/dashboard/ordersCard";
import "./dashboard.scss";
import { OrdersData } from "../../data/ordersData";
import { Link } from "react-router-dom";
import Chart from "../../components/Chart";
import { Field, Form, Formik } from "formik";
import Input from "../../components/input";
import Button from "../../components/button";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const Continents = ["Europe"];

interface IDeliverData {
  Continents: string;
  DeliveryFees: string;
  id: string;
}
const initialValues = {
  Continents: "",
  DeliveryFees: "",
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState<IDeliverData[]>([]);
  const [save, setSave] = useState(false);
  // const [Active, setActive] = useState(false);
  // const handleToggle = () => {
  //   setActive(!Active);
  // };
  console.log(data);

  const handleUpdateData = (value: typeof initialValues) => {
    try {
      data.map((f) => {
        const updateFee = doc(db, "DeliveryFees", f.id);
        const dataRef = updateDoc(updateFee, {
          ...value,
        });
        console.log(dataRef);
        setSave(true);
        return null;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getData = useCallback(async () => {
    try {
      const DeliveryData = await getDocs(collection(db, "DeliveryFees"));

      const fetchProduct = DeliveryData.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setData(fetchProduct);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);

  // const handleSubmit = async (values: typeof initialValues) => {
  //   try {
  //     if (data) {
  //       const DeliveryData = await addDoc(collection(db, "DeliveryFees"), {
  //         ...values,
  //       });
  //       console.log(DeliveryData);
  //     } else {
  //       // const updateData= doc(db,"DeliveryFees",)
  //       // await updateDoc(updateData)
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="mx">
      <Layout>
        <div className="dashboard-wrapper">
          <div className="dashboard-head">
            <p>Welcome, Sprinkle</p>
            <h5>Today sep28 2023</h5>
          </div>
          <div className="grid-item">
            <TotalRevenue />
            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                padding: "16px",
              }}
            >
              <Chart />
            </div>
          </div>
          <div style={{ margin: "32px 0" }}>
            <OrdersCard data={OrdersData} />
          </div>
          <div
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            <div className="subscription-content flex-item">
              <div className="total-subscription-text flex-item">
                <SubscribedIcon />
                <h5>Total subscription</h5>
              </div>
              <h1>120k</h1>
              <h2>premium</h2>
              <Link to="/user-subscription">
                <h6>View more</h6>
              </Link>
            </div>
            <div className="subscription-content flex-item">
              <div className="total-subscription-text flex-item">
                <h5>User total post</h5>
              </div>
              <h1>120</h1>
              <Link to="/user-post-list">
                <h6>View more</h6>
              </Link>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleUpdateData}>
              <Form>
                <div className="dropdown">
                  <h3>Delivery charge</h3>
                  <div className="deliveryfee">
                    <Field as="select" name="Continents">
                      <option value="">Select continents</option>

                      {Continents.map((f, i) => (
                        <option value={f} key={i}>
                          {f}
                        </option>
                      ))}
                    </Field>
                    <div>
                      <Input
                        type="number"
                        name="DeliveryFees"
                        placeholder="0 $"
                        disabled={save}
                      />
                    </div>
                  </div>

                  <Button
                    varient="primary"
                    type="submit"
                    // onClick={() => handleUpdateData}
                  >
                    {save ? "saved" : "save"}
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
