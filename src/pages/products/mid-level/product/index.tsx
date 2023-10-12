import React, { useCallback, useEffect, useState } from "react";
import MidprodcutLayout from "../../../../layout/midproduct-layout";
import "../../../../styles/productLayout.scss";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";
import { IProductCategory, IProductdata } from "../../../../constants/types";
import CardModule from "../../../../components/card";
import Loading from "../../../../components/loading";

const MidProducts: React.FC<IProductdata> = ({ id }) => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  const handleDelete = async () => {
    const DeleteRef = doc(db, PRODUCTS_COLLECTION_NAME, id);

    try {
      const removeDoc = await deleteDoc(DeleteRef);
      console.log(removeDoc);
    } catch (error) {
      console.log(error);
    }
  };
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
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-card-layout">
            {data.map((f, i) => (
              <CardModule handleDelete={handleDelete} {...f} key={i} />
            ))}
          </div>
        )}
      </div>
    </MidprodcutLayout>
  );
};

export default MidProducts;
