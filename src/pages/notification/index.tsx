import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateNotification from "./component/createNotification";
import Layout from "../../layout";
// import Layout from "../../layout";
import "./notification.scss";
import { onMessageListener, requestForToken } from "../../utils/firebase";
import { Toaster } from "react-hot-toast";

const Notification: React.FC = () => {
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    if (notification?.title) {
    }
  }, [notification]);

  requestForToken();

  onMessageListener()
    .then((payload: any) => {
      const newNotification = {
        title: payload?.notification?.title || "Error: No title",
        body: payload?.notification?.body || "Error: No body",
      };
      setNotification(newNotification);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <Layout>
      <div className="header-notifi">
        <div className="notifi-wrap">
          <Link to="/notification">
            <h2>Draft notification</h2>
          </Link>
        </div>
        <div className="layout-children">
          <CreateNotification />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
};

export default Notification;
