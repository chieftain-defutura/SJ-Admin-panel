import React, { useCallback, useEffect, useState } from "react";
import MidprodcutLayout from "../../../../layout/midproduct-layout";
import "../../../../styles/productLayout.scss";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";
import { IProductCategory, IProductdata } from "../../../../constants/types";
import CardModule from "../../../../components/card";

const MidProducts: React.FC = () => {
  const [data, setData] = useState<IProductdata[]>([]);

  const handleGetData = useCallback(async () => {
    try {
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.MID)
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
    <MidprodcutLayout>
      <div className="product-layout">
        <div className="mid-header">
          <NavLink to="/products/mid-level/product/create">
            <h4>Add style</h4>
          </NavLink>
        </div>
        <div className="product-card-layout">
          {data.map((f, i) => (
            <CardModule {...f} key={i} />
          ))}
        </div>
      </div>
    </MidprodcutLayout>
  );
};

export default MidProducts;
