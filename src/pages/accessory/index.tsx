import React, { useCallback, useEffect, useState } from "react";
import "../../styles/premium.scss";
import PremiumLayout from "../../layout/premium-layout";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../constants/types";
import { db } from "../../utils/firebase";
import AccessoryCardModule from "../../components/accessoryCard";
import Loading from "../../components/loading";

const AccessoryHome = () => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.ACCESSORY)
      );
      onSnapshot(productData, (q) => {
        const fetchedData = q.docs.map((d) => ({
          id: d.id,
          ...(d.data() as any),
        }));
        console.log(fetchedData);
        setData(fetchedData);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-card-layout">
            {data.map((f, i) => (
              <AccessoryCardModule productType="accessory" {...f} key={i} />
            ))}
          </div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default AccessoryHome;
