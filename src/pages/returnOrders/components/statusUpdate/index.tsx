import React, { useCallback, useEffect, useState } from "react";
import { IReturnOrdersData } from "../../../../constants/types";
import ConfirmOrder from "../../../orders/ordersModals/premiumModal/deliveryDetails/confirmOrder";
import { Form, Formik } from "formik";
import Button from "../../../../components/button";
import "./status.scss";
import { db } from "../../../../utils/firebase";
import { doc as d, doc, getDoc, updateDoc as update } from "firebase/firestore";
import { ReactComponent as Close } from "../../../../assets/icons/close.svg";
import { RETURN } from "../../../../constants/firebaseCollection";

interface Idata {
  setStatusIpdate: React.Dispatch<React.SetStateAction<boolean>>;
  data: IReturnOrdersData;
}
const initialValues = {
  refundStatus: {
    orderReturned: { createdAt: "", discription: "", status: false },
    paymentInitiated: { createdAt: "", discription: "", status: false },
    paymenyCompleted: { createdAt: "", discription: "", status: false },
  },
};

const StatusUpdate: React.FC<Idata> = ({ data, setStatusIpdate }) => {
  const [address, setAddress] = useState(initialValues);
  const handleSubmit = async (value: typeof initialValues) => {
    try {
      const returnOrders = d(db, "Returns", data?.id);
      await update(returnOrders, {
        refundStatus: {
          orderReturned: value.refundStatus.orderReturned,
          paymentInitiated: value.refundStatus.paymentInitiated,
          paymenyCompleted: value.refundStatus.paymenyCompleted,
        },
        status:
          value.refundStatus.paymenyCompleted.status === true
            ? "Success"
            : "pending",
      });
      console.log(value);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusIpdate(false);
    }
  };

  const handleGetData = useCallback(async () => {
    try {
      // setLoading(true);

      const user = doc(db, RETURN, data.id);
      const userDocumentSnapshot = await getDoc(user);

      if (userDocumentSnapshot.exists()) {
        const data = userDocumentSnapshot.data();
        console.log("Document dataa:", data);
        setAddress(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }, [data.id]);
  useEffect(() => {
    handleGetData();
  }, [handleGetData]);
  return (
    <div>
      <div
        onClick={() => setStatusIpdate(false)}
        style={{ display: "flex", justifyContent: "flex-end", padding: "12px" }}
      >
        <Close />
      </div>
      <Formik
        initialValues={address}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="order-conformed-content">
            <ConfirmOrder
              title="Order Returned"
              status={"refundStatus.orderReturned.status"}
              creayedAt={"refundStatus.orderReturned.createdAt"}
              descriptionName={"refundStatus.orderReturned.discription"}
            />
            <ConfirmOrder
              title="Order Initiated"
              status={"refundStatus.paymentInitiated.status"}
              creayedAt={"refundStatus.paymentInitiated.createdAt"}
              descriptionName={"refundStatus.paymentInitiated.discription"}
            />
            <ConfirmOrder
              title="Order Completed"
              status={"refundStatus.paymenyCompleted.status"}
              creayedAt={"refundStatus.paymenyCompleted.createdAt"}
              descriptionName={"refundStatus.paymenyCompleted.discription"}
            />
          </div>
          <div className="done-btn">
            <Button varient="primary" type="submit">
              Done
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default StatusUpdate;
