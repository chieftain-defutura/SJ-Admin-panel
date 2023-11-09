import React, { useCallback, useEffect, useState } from "react";
import "../../styles/premium.scss";
import PremiumLayout from "../../layout/premium-layout";
import { query, collection, getDocs, where } from "firebase/firestore";
import { NavLink } from "react-router-dom";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { IProductCategory, IProductdata } from "../../constants/types";
import { db } from "../../utils/firebase";
import CardModule from "../../components/card";
import Loading from "../../components/loading";
import { ReactComponent as Filter } from "../../assets/icons/filter-icon.svg";
import LayoutModule from "../../components/layoutModule";
import DragAndDrop from "./component/DragAndDrop";
const Premium: React.FC<{}> = () => {
  const [data, setData] = useState<IProductdata[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false);

  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      const productData = query(
        collection(db, PRODUCTS_COLLECTION_NAME),
        where("type", "==", IProductCategory.PREMIUM)
        // limit(3)
      );
      const documentSnapshots = await getDocs(productData);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      console.log(lastVisible);

      // const getProductData = query(
      //   collection(db, PRODUCTS_COLLECTION_NAME),
      //   where("type", "==", IProductCategory.PREMIUM),
      //   startAfter(lastVisible)
      // );

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
          <div onClick={() => setActive(true)}>
            <Filter />
          </div>
        </div>
        {active && (
          <LayoutModule handleToggle={() => setActive(false)}>
            <div className="drag-and-drop">
              <div className="heading">
                {/* <h3>No</h3> */}
                <h3>Product name</h3>
                <h3>Visible/Hidden</h3>
                <h3>Delete</h3>
              </div>
              <div className="products">
                {data.map((f, index) => (
                  <DragAndDrop
                    {...f}
                    index={index}
                    data={data}
                    setData={setData}
                  />
                ))}
              </div>
            </div>
          </LayoutModule>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="product-card-layout">
            {data.map((f, i) => (
              <CardModule productType="premium" {...f} key={i} />
            ))}
          </div>
        )}
      </div>
    </PremiumLayout>
  );
};

export default Premium;
