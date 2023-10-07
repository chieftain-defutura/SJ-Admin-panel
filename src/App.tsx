import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/post";
import PendingPost from "./pages/post/component/pendingPost";
import ApprovedPost from "./pages/post/component/approvePost";
import DenyPost from "./pages/post/component/denyPost";
import Notification from "./pages/notification";
import Product from "./pages/orders/component/midlevel-Order/component/product";
import Accessorey from "./pages/orders/component/midlevel-Order/component/accessorey";
import PostOrders from "./pages/orders/component/post-Order";
import MidProducts from "./pages/products/mid-level/product";
import CreateMidProduct from "./pages/products/mid-level/product/component/createMid-Product";
import UploadmidProductImage from "./pages/products/mid-level/product/component/uploadDesign-Image";
import Textimage from "./pages/products/mid-level/product/component/textImage";
import Premium from "./pages/premium";
import CreatePremium from "./pages/premium/component/createPremiumproduct";
import PremiumOrder from "./pages/orders/component/premium-Order";
import MidlevelOrder from "./pages/orders/component/midlevel-Order/component/midlevelOrder";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/post" element={<Post children={undefined} />} />
        <Route path="/post/pendingpost" element={<PendingPost />} />
        <Route
          path="/post/approved"
          element={
            <ApprovedPost
              id={""}
              color={""}
              description={""}
              fontStyle={""}
              productName={""}
              createdAt={{
                seconds: 0,
                nanoseconds: 0,
              }}
              productImage={""}
              material={""}
              price={""}
              royalties={""}
              giftVidio={""}
              Style={""}
              fontColor={""}
              username={""}
              hashTag={""}
              updatedAt={{
                seconds: 0,
                nanoseconds: 0,
              }}
              size={[]}
              status={""}
            />
          }
        />
        <Route path="/post/deny" element={<DenyPost />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/orders/midlevel-orders/products" element={<Product />} />

        <Route
          path="/orders/midlevel-orders/accessory"
          element={<Accessorey />}
        />
        <Route path="/orders/premium-orders" element={<PremiumOrder />} />
        <Route path="/orders/midlevel-orders" element={<MidlevelOrder />} />

        <Route path="/orders/post-orders" element={<PostOrders />} />
        <Route
          path="/products/mid-level/product/styles"
          element={<MidProducts />}
        />
        <Route
          path="/products/mid-level/product/create"
          element={<CreateMidProduct index={0} />}
        />
        <Route
          path="/products/mid-level/product/image"
          element={<UploadmidProductImage />}
        />
        <Route
          path="/products/mid-level/product/text-image"
          element={<Textimage />}
        />
        <Route path="/products/premium" element={<Premium />} />
        <Route
          path="/products/premium/create"
          element={<CreatePremium index={0} />}
        />
      </Routes>
    </div>
  );
};

export default App;
