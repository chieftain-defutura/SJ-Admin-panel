import React from "react";
import Button from "../../../components/button";
import { IAdminData } from "../../../constants/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { ADMIN_COLLECTION_NAME } from "../../../constants/firebaseCollection";

const AdminList: React.FC<IAdminData> = ({
  userName,
  id,
  email,
  role,
  actions,
}) => {
  const handleDelete = async () => {
    const DeleteRef = doc(db, ADMIN_COLLECTION_NAME, id);
    try {
      await deleteDoc(DeleteRef);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="user-details">
        <div className="user-info">
          <div className="user-profile">
            <p>{userName.slice(0, 1)}</p>
          </div>
          <h3>{userName}</h3>
        </div>
        <h3>{email}</h3>
        <h3>{role}</h3>
        <h3>{actions}</h3>
        <Button varient="secondary" onClick={handleDelete}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default AdminList;
