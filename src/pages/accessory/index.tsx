import React, { useCallback, useEffect, useState } from "react";
import "../../styles/premium.scss";
import PremiumLayout from "../../layout/premium-layout";
import { query, collection, getDocs, where } from "firebase/firestore/lite";
import { NavLink } from "react-router-dom";
import Button from "../../components/button";
import LayoutModule from "../../components/layoutModule";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../constants/types";
import Tshirt from "../../assets/images/t-shirt-two.png";
import { db } from "../../utils/firebase";
import ProductModule from "../../components/productLayoutModule";

const AccessoryHome = () => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [active, setActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
  };
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
                <ProductModule handleToggle={handleToggle}>
                  {f.detailedFutures.map((item, index) => (
                    <>
                      <div className="product-preview-img" key={index}>
                        <h2>Product image</h2>
                        <div className="product-img">
                          <img
                            src={f.productImage}
                            alt="products"
                            width={176}
                            height={234}
                          />
                        </div>
                        {/* <h3>{f.productName}</h3> */}
                      </div>
                      <div className="product-preview-img">
                        <h2>Preview</h2>
                        <div className="content">
                          <div>
                            <h4>style</h4>
                            <h3>{f.styles}</h3>
                          </div>{" "}
                          <div>
                            <h4>Normal Price</h4>
                            <h3>{f.normalPrice}</h3>
                          </div>
                          <div>
                            <h4>Normal Price</h4>
                            <h3>{f.offerPrice}</h3>
                          </div>
                        </div>
                        <div className="detailed-future">
                          <h4>Detailed Features</h4>
                        </div>
                        <div className="content-material">
                          <div>
                            <h4>Material</h4>
                            <h3>{item.materials}</h3>
                          </div>
                          <div>
                            <h4>Cloth</h4>
                            <h3>{item.cloth}</h3>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </ProductModule>
              )}
            </div>
          ))}
        </div>
      </div>
    </PremiumLayout>
  );
};

export default AccessoryHome;
