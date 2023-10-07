import React, { useCallback, useEffect, useState } from "react";
import "../../styles/premium.scss";
import PremiumLayout from "../../layout/premium-layout";
import { query, collection, getDocs, where } from "firebase/firestore/lite";
import { NavLink } from "react-router-dom";
import Button from "../../components/button";
import LayoutModule from "../../components/layoutModule";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../constants/types";
import { db } from "../../utils/firebase";

const Premium = () => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };
  const handleGetData = useCallback(async () => {
    try {
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.PREMIUM)
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
          <NavLink to="/products/premium/create">
            <h4>Add style</h4>
          </NavLink>
        </div>
        <div className="product-card-layout">
          {data.map((f, i) => (
            <div className="product-card" key={i}>
              <div className="product-img">
                <img
                  src={f.productImage}
                  alt="products"
                  width={200}
                  height={250}
                />
              </div>

              <div className="product-details">
                <h3>{f.styles}</h3>
                <Button varient="primary" onClick={handleToggle}>
                  View
                </Button>
              </div>
              {active && (
                <LayoutModule
                  handleToggle={handleToggle}
                  className="product-module"
                >
                  <h2>preview</h2>

                  <div className="product-preview">
                    <div>
                      <h2>Style</h2>
                      <h3>{f.styles}</h3>
                    </div>
                    <div>
                      <h2>Normal price</h2>
                      <h3>{f.normalPrice}</h3>
                    </div>
                    <div>
                      <h2>Offer price</h2>
                      <h3>{f.offerPrice}</h3>
                    </div>
                  </div>
                </LayoutModule>
              )}
            </div>
          ))}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default Premium;
