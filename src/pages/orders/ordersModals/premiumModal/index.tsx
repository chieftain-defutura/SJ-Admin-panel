import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import ProductDetailsModal from "./productDetails";
import "../../../../styles/postModal.scss";
import { getDocs, collection, where, query } from "firebase/firestore";
import { ORDERS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { IPremiumData, IUserData } from "../../../../constants/types";
import { db } from "../../../../utils/firebase";

interface IPremiumModal {
  onClose: () => void;
  data: IPremiumData;
  user: IUserData | undefined;
}

const PremiumModal: React.FC<IPremiumModal> = ({ onClose, data, user }) => {
  console.log(data);

  const getData = useCallback(async () => {
    const Premium = collection(db, ORDERS_COLLECTION_NAME);
    const premiumProducts = query(
      Premium,
      where("type", "==", "Premium-Level"),
      where("paymentStatus", "==", "SUCCESS")
    );
    const premiumData = await getDocs(premiumProducts);
    const fetchProduct = premiumData.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    console.log(fetchProduct);
  }, []);

  useEffect(() => {
    getData();
    // ordersFetchData();
  }, [getData]);

  // const FilteredData = data?.filter((f) => f.type === "Premium-Level");

  return (
    <div className="mx">
      <div className="post-modal-wrapper">
        <div className="post-modal-container flex-item">
          <div className="active">
            <p>Product details</p>
            <div className="border-bottom"></div>
          </div>

          {/* <div
            className={activeSection === "delivery" ? "active" : ""}
            onClick={handleDeliveryClick}
          >
            <p>Delivery status</p>
            <div className="border-bottom"></div>
          </div> */}
        </div>
        <div className="close-icon" onClick={onClose}>
          <CloseIcon />
        </div>
        {/* {data.map(
          (f, i) =>
            activeSection === "product" && (
              <DeliveryDetailsModal {...f} key={i} />
            )
        )} */}

        <>
          <ProductDetailsModal data={data} user={user} onClose={onClose} />

          {/* {activeSection === "delivery" && (
            <DeliveryDetailsModal setActive={setActive} data={data} />
          )} */}
        </>
      </div>
    </div>
  );
};

export default PremiumModal;
