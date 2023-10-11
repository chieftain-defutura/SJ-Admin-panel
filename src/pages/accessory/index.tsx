import React, { useCallback, useEffect, useState } from "react";
import "../../styles/premium.scss";
import PremiumLayout from "../../layout/premium-layout";
import { query, collection, getDocs, where } from "firebase/firestore/lite";
import { NavLink } from "react-router-dom";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../constants/types";
import { db } from "../../utils/firebase";
import AccessoryCardModule from "../../components/accessoryCard";

const AccessoryHome = () => {
  const [data, setData] = useState<IProductdata[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.ACCESSORY)
      );
      const data = await getDocs(productData);
      const fetchedData = data.docs.map((d) => ({
        id: d.id,
        ...(d.data() as any),
      }));
      console.log(fetchedData);
      setData(fetchedData);
    } catch (error) {
      console.log(error);
    }
  }, [setData]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <PremiumLayout>
      <div className="product-layout">
        <div className="mid-header">
          <NavLink to="/products/mid-level/accessory/create">
            <h4>Add style</h4>
          </NavLink>
        </div>
        <div className="product-card-layout">
          {data.map((f, i) => (
            <AccessoryCardModule {...f} key={i} />
          ))}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default AccessoryHome;
