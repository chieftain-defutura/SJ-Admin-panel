import React, { useCallback, useEffect, useState } from "react";
import "./deliveryDetailsModal.scss";
import Button from "../../../../../components/button";
import { IPost } from "../../../../../constants/types";
import { Form, Formik } from "formik";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../utils/firebase";
import { ORDERS_COLLECTION_NAME } from "../../../../../constants/firebaseCollection";
import ConfirmOrder from "../../premiumModal/deliveryDetails/confirmOrder";

export const initialValues = {
  orderStatus: {
    delivery: { createdAt: "", description: "", status: false },
    manufacturing: { createdAt: "", description: "", status: false },
    orderPlaced: { createdAt: "", description: "", status: false },
    readyToShip: { createdAt: "", description: "", status: false },
    shipping: { createdAt: "", description: "", status: false },
  },
};
interface IDetailsdata {
  data: IPost;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeliveryDetailsModal: React.FC<IDetailsdata> = ({
  data,
  setIsActive,
}) => {
  const [initialData, setInitialData] = useState(initialValues);

  const fetchData = useCallback(async () => {
    try {
      const docRef = doc(db, ORDERS_COLLECTION_NAME, data.id); // Replace "your_collection_name" with your actual collection name
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        setInitialData(fetchedData as any);
        console.log("fetchedData", fetchedData);
      }
    } catch (error) {
      console.log(error);
    }
  }, [data.id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSubmit = async (value: typeof initialValues) => {
    console.log(value);
    try {
      const updateRef = doc(db, ORDERS_COLLECTION_NAME, data.id);
      await updateDoc(updateRef, {
        orderStatus: value,
      });
      console.log(updateRef);
      console.log(value);
    } catch (error) {
      console.log("updateError", error);
    } finally {
      setIsActive(false);
    }
  };

  return (
    <div className="delivery-details-modal-wrapper">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialData}
        enableReinitialize
      >
        {() => (
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
