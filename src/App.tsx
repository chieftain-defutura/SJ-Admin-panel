import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
import Post from "./pages/post";
import ApprovedPost from "./pages/post/component/approvePost";
import PremiumOrders from "./pages/orders/component/premium-Order";
import PostOrders from "./pages/orders/component/post-Order";
import MidProducts from "./pages/products/mid-level/product";
import CreateMidProduct from "./pages/products/mid-level/product/component/createMid-Product";
import UploadmidProductImage from "./pages/products/mid-level/product/component/uploadDesign-Image";
import Textimage from "./pages/products/mid-level/product/component/textImage";
import Premium from "./pages/premium";
import CreatePremium from "./pages/premium/component/createPremiumproduct";
import AccessoryHome from "./pages/accessory";
import MidlevelOrder from "./pages/orders/component/midlevel-Order";
import AccessoriesOrder from "./pages/orders/component/accessories-orders";
import UserPostList from "./pages/dashboard/component/userPostList";
import UserSubscription from "./pages/dashboard/component/userSubscription";
import CreateAccessory from "./pages/accessory/component/createAccessory";
import Allpost from "./pages/post/component/allPost";
import PendingPost from "./pages/post/component/pendingPosts";
import Subscription from "./pages/subscription";
import EditMidform from "./pages/products/mid-level/product/component/createMid-Product/EditMidform";
import EditPremium from "./pages/premium/component/EditPremium";
import Login from "./pages/login";
import AdminManagement from "./pages/adminManagement";
import Settings from "./pages/settings";
import { useAdminStore } from "./store/adminUser";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./utils/firebase";
import {
  query,
  collection,
  where,
  onSnapshot,
  setLogLevel,
} from "firebase/firestore";
import { ADMIN_COLLECTION_NAME } from "./constants/firebaseCollection";
import Loading from "./components/loading";
import EditAccessory from "./pages/accessory/component/EditAccessory";
import Notification from "./pages/notification";

const App: React.FC = () => {
  const [loading, setIsLoading] = useState(false);
  const admin = useAdminStore((user) => user.admin);
  const adminDetails = useAdminStore((user) => user.adminDetails);
  const setAdminDetails = useAdminStore((user) => user.setAdminDetails);
  const setAdmin = useAdminStore((user) => user.setAdmin);
  console.log(admin);
  console.log(adminDetails);
  const handleGetData = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!adminDetails) return;
      const q = query(
        collection(db, ADMIN_COLLECTION_NAME),
        where("email", "==", adminDetails.email)
      );
      onSnapshot(q, (querySnap) => {
        console.log(querySnap.docs.length);
        querySnap.docs.forEach((d) => {
          setAdmin(d.data() as any);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [adminDetails, setAdmin]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  useEffect(() => {
    return onAuthStateChanged(auth, (datas) => {
      setIsLoading(true);
      if (datas) {
        setAdminDetails(datas);
        setIsLoading(false);
      }
    });
  }, [setAdminDetails]);

  return (
    <div>
      <Routes>
        {loading && !admin ? (
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to={"/login"} />} />
          </Route>
        ) : (
          <Route>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/post" element={<Post children={undefined} />} />
            <Route path="/post/all-post" element={<Allpost />} />
            <Route path="/post/approved" element={<ApprovedPost />} />
            <Route path="/post/pending" element={<PendingPost />} />
            <Route path="/admin-management" element={<AdminManagement />} />
            <Route path="/orders/premium-orders" element={<PremiumOrders />} />
            <Route path="/orders/post-orders" element={<PostOrders />} />
            <Route path="/orders/midlevel-orders" element={<MidlevelOrder />} />
            <Route path="/notification" element={<Notification />} />
            <Route
              path="/orders/accessories-orders"
              element={<AccessoriesOrder />}
            />
            <Route path="/user-post-list" element={<UserPostList />} />
            <Route path="/user-subscription" element={<UserSubscription />} />
            <Route
              path="/products/mid-level/product/styles"
              element={<MidProducts />}
            />
            <Route
              path="/products/mid-level/product/create"
              element={<CreateMidProduct index={0} />}
            />
            <Route path="/products/medium/edit/:id" element={<EditMidform />} />

            <Route
              path="/products/mid-level/product/image"
              element={<UploadmidProductImage isActiveImage={true} />}
            />
            <Route
              path="/products/mid-level/product/text-image"
              element={<Textimage isActiveImage={true} />}
            />
            <Route
              path="/products/mid-level/accessory"
              element={<AccessoryHome />}
            />
            <Route
              path="/products/mid-level/accessory/edit/:id"
              element={<EditAccessory />}
            />
            <Route
              path="/products/mid-level/accessory/create"
              element={<CreateAccessory index={0} />}
            />
            <Route path="/products/premium" element={<Premium />} />
            <Route
              path="/products/premium/create"
              element={<CreatePremium index={0} />}
            />
            <Route
              path="/products/premium/edit/:id"
              element={<EditPremium />}
            />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
