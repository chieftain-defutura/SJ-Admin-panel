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
import DeliveryAccessoriy from "./pages/delivery/component/mid-level/component/accessorey";
import Notification from "./pages/notification";
import Product from "./pages/orders/component/midlevel-Order/component/product";
import Accessorey from "./pages/orders/component/midlevel-Order/component/accessorey";
import PremiumOrders from "./pages/orders/component/premium-Order";
import PostOrders from "./pages/orders/component/post-Order";
import ProductsLayout from "./pages/products";
import MidProducts from "./pages/products/mid-level/product";
import CreateMidProduct from "./pages/products/mid-level/product/component/createMid-Product";
import UploadmidProductImage from "./pages/products/mid-level/product/component/uploadDesign-Image";
import Textimage from "./pages/products/mid-level/product/component/textImage";
import Premium from "./pages/premium";

const App: React.FC = () => {
  function handleClick(): void {
    throw new Error("Function not implemented.");
  }

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
      </Routes>
    </div>
  );
};

export default App;
