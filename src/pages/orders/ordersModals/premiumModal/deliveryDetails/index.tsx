import React from "react";
import "./deliveryDetailsModal.scss";
import Button from "../../../../../components/button";
import { IPremiumData } from "../../../../../constants/types";
import { Form, Formik } from "formik";
import ConfirmOrder from "./confirmOrder";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { ORDERS_COLLECTION_NAME } from "../../../../../constants/firebaseCollection";

export const initialValues = {
  orderStatus: {
    delivery: { createdAt: null, description: "", status: false },
    manufacturing: { createdAt: null, description: "", status: false },
    orderPlaced: { createdAt: null, description: "", status: false },
    readyToShip: { createdAt: null, description: "", status: false },
    shipping: { createdAt: null, description: "", status: false },
  },
};
interface IDetailsdata {
  data: IPremiumData;
}

const DeliveryDetailsModal: React.FC<IDetailsdata> = ({ data }) => {
  console.log("DeliveryDetailsModal", data);

  const handleSubmit = async (value: typeof initialValues) => {
    console.log(value);
    try {
      const updateRef = doc(db, ORDERS_COLLECTION_NAME, data.id);
      await updateDoc(updateRef, {
        orderStatus: {
          delivery: value.orderStatus.delivery,
          manufacturing: value.orderStatus.manufacturing,
          orderPlaced: value.orderStatus.orderPlaced,
          readyToShip: value.orderStatus.readyToShip,
          shipping: value.orderStatus.shipping,
        },
      });
      console.log(updateRef);
      console.log(value);
    } catch (error) {
      console.log("updateError", error);
    }
  };

  return (
    <div className="delivery-details-modal-wrapper">
      <Formik onSubmit={handleSubmit} initialValues={data.orderStatus as any}>
        {({ values, setValues }) => (
          <Form>
            <>
              <div className="order-conformed-content">
                <ConfirmOrder
                  title="Order placed"
                  status={"orderStatus.orderPlaced.status"}
                  creayedAt={"orderStatus.orderPlaced.createdAt"}
                  descriptionName={"orderStatus.orderPlaced.description"}
                />
                <ConfirmOrder
                  title="manifacturing"
                  status={"orderStatus.manufacturing.status"}
                  creayedAt={"orderStatus.manufacturing.createdAt"}
                  descriptionName={"orderStatus.manufacturing.description"}
                />
              </div>
              <div className="order-conformed-content">
                <ConfirmOrder
                  title="Ready to ship"
                  status={"orderStatus.readyToShip.status"}
                  creayedAt={"orderStatus.readyToShip.createdAt"}
                  descriptionName={"orderStatus.readyToShip.description"}
                />
                <ConfirmOrder
                  title="Shipping"
                  status={"orderStatus.shipping.status"}
                  creayedAt={"orderStatus.shipping.createdAt"}
                  descriptionName={"orderStatus.shipping.description"}
                />
              </div>
              <div className="order-conformed-content">
                <ConfirmOrder
                  title="Deliverd"
                  status={"orderStatus.delivery.status"}
                  creayedAt={"orderStatus.delivery.createdAt"}
                  descriptionName={"orderStatus.delivery.description"}
                />
              </div>
            </>

            <div className="done-btn">
              <Button varient="primary" type="submit">
                Done
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryDetailsModal;
