import React, { useCallback, useEffect, useState } from "react";
import MidprodcutLayout from "../../../../layout/midproduct-layout";
import "../../../../styles/productLayout.scss";
import { NavLink } from "react-router-dom";
import { collection, doc, getDocs, query } from "firebase/firestore/lite";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";
import { IProductdata } from "../../../../constants/types";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";

// const sizes=[
//   {
//     map:"S",
//     value:32,
//     show:false
//   }
// ]

// {
//   country:"india",
//   gen:"male",sizes:sizes
// }

const MidProducts: React.FC = () => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };
  const handleGetData = useCallback(async () => {
    try {
      const productData = query(collection(db, PRODUCTS_COLLECTION_NAME));
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
            <div className="product-card" key={i}>
              <img src={f.productImage} alt="" width={200} height={250} />
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
    </MidprodcutLayout>
  );
};

export default MidProducts;
