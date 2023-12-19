import React, { useState } from "react";
import ToggleSwitch from "../../../../components/toggleSwitch";
import { IProductdata } from "../../../../constants/types";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/filter-2.svg";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";

interface IData extends IProductdata {
  index: number;
  dragPerson: React.MutableRefObject<number>;
  draggedOverPerson: React.MutableRefObject<number>;

  handleSort: () => void;
}

const DragAndDrop: React.FC<IData> = ({
  productName,
  index,
  dragPerson,
  draggedOverPerson,
  id,

  handleSort,
}) => {
  const [hidde, setHidde] = useState(false);

  const handleToggleUpdate = async () => {
    try {
      setHidde(!hidde);

      const docRef = doc(db, PRODUCTS_COLLECTION_NAME, id);
      await updateDoc(docRef, {
        activePost: hidde,
        index: dragPerson,
        indexEnd: draggedOverPerson,
      });

      //   setHidde(false);
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handleDelete = async () => {
    try {
      const docRef = doc(db, PRODUCTS_COLLECTION_NAME, id);
      await deleteDoc(docRef);

      // window.location.reload();
    } catch (error) {
      console.log("Delete docs", error);
    }
  };

  return (
    <div>
      <div
        className="heading"
        draggable
        onDragStart={() => (dragPerson.current = index)}
        onDragEnter={() => (draggedOverPerson.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault}
      >
        {/* <h4>{data.length}</h4> */}
        <div className="product-name">
          <FilterIcon />
          <h4>{productName}</h4>
        </div>
        <ToggleSwitch value={hidde} setValue={handleToggleUpdate} />
        <Delete onClick={handleDelete} />
      </div>
    </div>
  );
};

export default DragAndDrop;
