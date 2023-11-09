import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/icons/close.svg";
import DeliveryDetailsModal from "./deliveryDetails";
import ProductDetailsModal from "./productDetails";
import "../../../../styles/postModal.scss";
import { getDocs, collection } from "firebase/firestore";
import { ORDERS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { IPremiumData } from "../../../../constants/types";
import { db } from "../../../../utils/firebase";

interface IPremiumModal {
  onClose: () => void;
  data: IPremiumData;
}

const PremiumModal: React.FC<IPremiumModal> = ({ onClose, data }) => {
  const [activeSection, setActiveSection] = useState("product");

  const getData = useCallback(async () => {
    const productData = await getDocs(collection(db, ORDERS_COLLECTION_NAME));
    const fetchProduct = productData.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    console.log(fetchProduct);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // const FilteredData = data?.filter((f) => f.type === "Premium-Level");

  const handleProductClick = () => {
    setActiveSection("product");
  };

  const handleDeliveryClick = () => {
    setActiveSection("delivery");
  };

  return (
    <div className="mx">
      <div className="post-modal-wrapper">
        <div className="post-modal-container flex-item">
          <div
            className={activeSection === "product" ? "active" : ""}
            onClick={handleProductClick}
          >
            <p>Product details</p>
            <div className="border-bottom"></div>
          </div>

          <div
            className={activeSection === "delivery" ? "active" : ""}
            onClick={handleDeliveryClick}
          >
            <p>Delivery status</p>
            <div className="border-bottom"></div>
          </div>
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
        {activeSection === "product" && <ProductDetailsModal data={data} />}

        {activeSection === "delivery" && <DeliveryDetailsModal data={data} />}
      </div>
    </div>
  );
};

export default PremiumModal;
