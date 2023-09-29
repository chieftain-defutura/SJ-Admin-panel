import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/post";
import PendingPost from "./pages/post/component/pendingPost";
import ApprovedPost from "./pages/post/component/approvePost";
import DenyPost from "./pages/post/component/denyPost";
import MidlevelSection from "./pages/delivery/component/mid-level";
import PremiumDelivery from "./pages/delivery/component/premium";
import PostSection from "./pages/delivery/component/post";
import DeliveryProduct from "./pages/delivery/component/mid-level/component/product";
import DeliveryRoute from "./pages/delivery";
import DeliveryAccessoriy from "./pages/delivery/component/mid-level/component/accessorey";
import Notification from "./pages/notification";
import Orders from "./pages/orders";
import Product from "./pages/orders/component/midlevel-Order/component/product";
import Accessorey from "./pages/orders/component/midlevel-Order/component/accessorey";
import PremiumOrders from "./pages/orders/component/premium-Order";
import PostOrders from "./pages/orders/component/post-Order";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/post" element={<Post children={undefined} />} />
        <Route path="/post/pendingpost" element={<PendingPost />} />
        <Route path="/post/approved" element={<ApprovedPost />} />
        <Route path="/post/deny" element={<DenyPost />} />

        <Route
          path="/delivery/midlevel-delivery"
          element={<MidlevelSection children={undefined} />}
        />
        <Route
          path="/delivery/premium-delivery"
          element={<PremiumDelivery />}
        />
        <Route path="/delivery/post-delivery" element={<PostSection />} />
        <Route
          path="/delivery/midlevel-delivery/product"
          element={<DeliveryProduct />}
        />
        <Route
          path="/delivery/midlevel-delivery/accessory"
          element={<DeliveryAccessoriy />}
        />
        <Route path="/notification" element={<Notification />} />
        {/* <Route path="/orders" element={<Orders children={undefined} />} /> */}
        <Route path="/orders/midlevel-orders/products" element={<Product />} />
        <Route
          path="/orders/midlevel-orders/accessory"
          element={<Accessorey />}
        />
        <Route path="/orders/premium-orders" element={<PremiumOrders />} />
        <Route path="/orders/post-orders" element={<PostOrders />} />
      </Routes>
    </div>
  );
};

export default App;
