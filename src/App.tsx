import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/post";
import ApprovedPost from "./pages/post/component/approvePost";
import Notification from "./pages/notification";
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
import MidLevelPdf from "./components/PdfFile/MidLevelPdf";
import AdminManagement from "./pages/adminManagement";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<Post children={undefined} />} />
        <Route path="/post/all-post" element={<Allpost />} />
        <Route path="/post/approved" element={<ApprovedPost />} />
        <Route path="/post/pending" element={<PendingPost />} />
        {/* <Route path="/notification" element={<Notification />} /> */}
        <Route path="/admin-management" element={<AdminManagement />} />
        <Route path="/orders/premium-orders" element={<PremiumOrders />} />
        <Route path="/orders/post-orders" element={<PostOrders />} />
        <Route path="/orders/midlevel-orders" element={<MidlevelOrder />} />
        <Route path="/orders/midlevel-pdf" element={<MidLevelPdf />} />

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
          path="/products/mid-level/accessory/create"
          element={<CreateAccessory index={0} />}
        />
        <Route path="/products/premium" element={<Premium />} />
        <Route
          path="/products/premium/create"
          element={<CreatePremium index={0} />}
        />
        <Route path="/products/premium/edit/:id" element={<EditPremium />} />
        <Route path="/subscription" element={<Subscription />} />
      </Routes>
    </div>
  );
};

export default App;
