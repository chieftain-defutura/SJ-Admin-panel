import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../../../layout";
import { ReactComponent as ChevronDown } from "../../../../assets/icons/chevron-down.svg";
import { ReactComponent as DownloadIcon } from "../../../../assets/icons/downloadIcon.svg";
import TShirtImg from "../../../../assets/images/t-shirt-two.png";
// import SingleCard from "../../../../components/dashboard/SingleCard";
import Button from "../../../../components/button";
import LayoutModule from "../../../../components/layoutModule";
import PostModal from "../../ordersModals/postModal";
import "../../../../styles/postOrder.scss";
import Chart from "../../../../components/Chart";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../utils/firebase";
import { IPost, IUserData } from "../../../../constants/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PostPdf from "../../../../components/PdfFile/PostPdf";
import { POST_COLLECTION_NAME } from "../../../../constants/firebaseCollection";

const datas = {
  heading: "Today post orders",
  orderNumber: 71,
  todayRevenue: "Today Revenue",
  today: "11,500",
  orders: "orders",
  image: TShirtImg,
  navigation: "/orders/post-orders",
};

const PostOrders: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<IPost[]>();

  const getData = useCallback(async () => {
    const productData = await getDocs(collection(db, POST_COLLECTION_NAME));
    const fetchProduct = productData.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as any),
    }));
    setData(fetchProduct);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const FilteredData = data?.filter((f) => f.type === "Post");

  const handleToggle = () => {
    setIsActive(!isActive);
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
              placeContent: "center",
            }}
          >
            {/* <SingleCard data={datas} /> */}

            <div
              style={{
                borderRadius: "10px",
                boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.16)",
                padding: "16px",
                marginTop: "26px",
              }}
            >
              <Chart />
            </div>
          </div>
          <div className="post-order-text">
            <p>Post orders</p>
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
                  <th>
                    <span>Quantity</span>
                  </th>
                  <th>
                    <span>Price</span>
                  </th>
                  <th>
                    <span>Size</span>
                  </th>
                  <th>
                    <span>Address</span>
                  </th>
                  <th>
                    <span>Details</span>
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
        </div>
      </Layout>
    </div>
  );
};

export default PostOrders;

interface ICardComponent {
  data: IPost;
}

const CardComponent: React.FC<ICardComponent> = ({ data }) => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState<IUserData>();
  const docRef = doc(db, "users", data.userId);

  const handleModalToggle = () => {
    setActive(true);
  };

  const handleModalCloseToggle = () => {
    setActive(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const documentSnapshot = await getDoc(docRef);

      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        console.log("Document dataa:", data);
        setUserData(data as any);
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <tr>
      <td>
        <div className="flex-item row-header">
          <img src={userData?.profile} alt="" />
          <p>{userData?.name}</p>
        </div>
      </td>
      <td>{data.productName}</td>
      <td>{data.quantity}</td>
      <td>{data.price} INR</td>
      <td>
        {data.sizes.sizeVarient.map((sizeVarient, index) => (
          <span key={index}>
            {sizeVarient.size} - {sizeVarient.measurement}
          </span>
        ))}
      </td>
      <td>Address</td>
      <td>
        <PDFDownloadLink document={<PostPdf />} fileName="FORM">
          {({ loading }) =>
            loading ? (
              <Button varient="notifi" style={{ fontSize: "12px" }}>
                Loading document...
              </Button>
            ) : (
              <div
                style={{
                  background: "#8C73CB",
                  width: "36px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <DownloadIcon />
              </div>
            )
          }
        </PDFDownloadLink>
      </td>

      <td>
        <Button
          varient="primary"
          style={{ padding: "9px 38px", fontSize: "12px" }}
          onClick={handleModalToggle}
        >
          View details
        </Button>
      </td>
      {active && (
        <LayoutModule
          handleToggle={handleModalToggle}
          className="layout-module"
        >
          <PostModal onClose={handleModalCloseToggle} data={data} />
        </LayoutModule>
      )}
    </tr>
  );
};
