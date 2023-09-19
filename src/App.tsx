import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Post from "./pages/post";
import PendingPost from "./components/pendingPost";
import ApprovedPost from "./components/approvePost";
import DenyPost from "./denyPost";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/post" element={<Post children={undefined} />} />
        <Route path="/post/pendingpost" element={<PendingPost />} />
        <Route path="/post/approved" element={<ApprovedPost />} />
        <Route path="/post/deny" element={<DenyPost />} />
      </Routes>
    </div>
  );
};

export default App;
