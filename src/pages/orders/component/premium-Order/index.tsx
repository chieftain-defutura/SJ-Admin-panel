import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
import TotalRevenue from "../../../../components/dashboard/totalRevenue";
import SingleCard from "../../../../components/dashboard/SingleCard";
import "../../../../styles/postOrder.scss";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import PremiumModal from "../../ordersModals/premiumModal";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { IPremiumData, IUserData } from "../../../../constants/types";

const PremiumOrder: React.FC = () => {
  const [active, setActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [data, setData] = useState<IPremiumData[]>();

  const getData = useCallback(async () => {
    const productData = await getDocs(collection(db, "Orders"));
    const fetchProduct = productData.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    setData(fetchProduct);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const FilteredData = data?.filter((f) => f.type === "Premium-Level");

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleModalToggle = () => {
    setActive(true);
  };

  const handleModalCloseToggle = () => {
    setActive(false);
  };

  if (!FilteredData) return <p>no data</p>;

  return (
    <div className="mx">
      <Layout>
        <div className="post-order-wrapper">
          <div className="post-order-head">
            <p>Orders</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {/* <SingleCard data={data} /> */}
            <div style={{ marginTop: "18px" }}>
              <TotalRevenue />
            </div>
          </div>
          <div className="post-order-text">
            <p>Premium orders</p>

            <div className="drop-down-wrapper">
              <div className="flex-item" onClick={handleToggle}>
                <p>Place orders</p>
                <ChevronDown
                  className={`drop-down-icon ${isActive ? "rotate" : ""}`}
                  onClick={handleToggle}
                />
              </div>
              {isActive && (
                <div className="select-drop-down">
                  <p>Manufacture</p>
                  <p>Ready to ship</p>
                  <p>Shipping</p>
                  <p>Delivered</p>
                </div>
              )}
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <span>User name</span>
                  </th>
                  <th>
                    <span>Product</span>
                  </th>
                  {/* <th>
                    <span>Quantity</span>
                  </th> */}
                  <th>
                    <span>Price</span>
                  </th>
                  <th>
                    <span>Size</span>
                  </th>
                  <th>
                    <span>Address</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {FilteredData.map((f, index) => (
                  <CardComponent key={index} data={f} />
                ))}
              </tbody>
            </table>
          </div>
          {active && (
            <LayoutModule
              handleToggle={handleModalToggle}
              className="layout-module"
            >
              <PremiumModal onClose={handleModalCloseToggle} />
            </LayoutModule>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default PremiumOrder;

interface ICardComponent {
  data: IPremiumData;
}
const CardComponent: React.FC<ICardComponent> = ({ data }) => {
  const [userData, setUserData] = useState<IUserData>();
  const docRef = doc(db, "users", data.userId); // Replace 'documentId' with the actual document ID you want to retrieve

  // Use getDoc to fetch the document
  const fetchData = useCallback(async () => {
    try {
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        // Document exists, you can access its data
        const data = documentSnapshot.data();
        console.log("Document data:", data);
        setUserData(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(userData);

  return (
    <tr>
      <td>
        <div className="flex-item row-header">
          <img src={userData?.profile} alt="" />
          <p>{userData?.name}</p>
        </div>
      </td>
      <td>{data.productName}</td>
      <td>{data.price}</td>
      {/* <td>{data.styles}</td>
      <td>{f.sizes}</td>
      <td>{item.address}</td>  */}

      <td>
        <Button
          varient="primary"
          style={{ padding: "9px 38px", fontSize: "12px" }}
          // onClick={handleModalToggle}
        >
          View details
        </Button>
      </td>
    </tr>
  );
};
