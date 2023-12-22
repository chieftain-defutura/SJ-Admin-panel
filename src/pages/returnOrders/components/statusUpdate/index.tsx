import React from "react";
import { IReturnOrdersData } from "../../../../constants/types";
import ConfirmOrder from "../../../orders/ordersModals/premiumModal/deliveryDetails/confirmOrder";
import { Form, Formik } from "formik";
import Button from "../../../../components/button";
import "./status.scss";
import { db } from "../../../../utils/firebase";
import { doc as d, updateDoc as update } from "firebase/firestore";
import { ReactComponent as Close } from "../../../../assets/icons/close.svg";

interface Idata {
  setStatusIpdate: React.Dispatch<React.SetStateAction<boolean>>;
  data: IReturnOrdersData | undefined;
}
const initialValues = {
  RefundStatus: {
    initiated: { createdAt: "", discription: "", status: false },
    completed: { createdAt: "", discription: "", status: false },
  },
};

const StatusUpdate: React.FC<Idata> = ({ data, setStatusIpdate }) => {
  const handleSubmit = async (value: typeof initialValues) => {
    try {
      const returnOrders = d(db, "Returns", "xQH1XUEENAEM50g3r4ud");
      await update(returnOrders, {
        RefundStatus: {
          initiated: value.RefundStatus.initiated,
          completed: value.RefundStatus.completed,
        },
        status:
          value.RefundStatus.completed.status === true ? "Success" : "pending",
      });
      console.log(value);
    } catch (error) {
      console.log(error);
    } finally {
      setStatusIpdate(false);
    }
  };
  return (
    <div>
      <div
        onClick={() => setStatusIpdate(false)}
        style={{ display: "flex", justifyContent: "flex-end", padding: "12px" }}
      >
        <Close />
      </div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <div className="order-conformed-content">
            <ConfirmOrder
              title="Order Initiated"
              status={"RefundStatus.initiated.status"}
              creayedAt={"RefundStatus.initiated.createdAt"}
              descriptionName={"RefundStatus.initiated.discription"}
            />
            <ConfirmOrder
              title="Completed"
              status={"RefundStatus.completed.status"}
              creayedAt={"RefundStatus.completed.createdAt"}
              descriptionName={"RefundStatus.completed.discription"}
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
