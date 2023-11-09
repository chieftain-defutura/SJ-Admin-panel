import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { PRODUCTS_COLLECTION_NAME } from "../../../../constants/firebaseCollection";
import { db } from "../../../../utils/firebase";
import ToggleSwitch from "../../../../components/toggleSwitch";
import { IProductdata } from "../../../../constants/types";
import { ReactComponent as FilterIcon } from "../../../../assets/icons/filter-2.svg";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";

interface IData extends IProductdata {
  index: number;
  data: IProductdata[];
  setData: React.Dispatch<React.SetStateAction<IProductdata[]>>;
}

const DragAndDrop: React.FC<IData> = ({
  id,
  productName,
  index,
  data,
  setData,
}) => {
  const [hidde, setHidde] = useState(true);
  const dragPerson = useRef<number>(0);
  const draggedOverPerson = useRef<number>(0);
  const handleToggleUpdate = async () => {
    try {
      setHidde(!hidde);
      const docRef = doc(db, PRODUCTS_COLLECTION_NAME, id);
      await updateDoc(docRef, {
        activePost: hidde,
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
      window.location.reload();
    } catch (error) {}
  };

  const handleSort = () => {
    const peopleClone = [...data];
    const temp = peopleClone[dragPerson.current];
    peopleClone[draggedOverPerson.current] = temp;
    setData(peopleClone);
  };
  console.log(data);

  return (
    <div>
      <div
        className="heading"
        draggable
        onDragStart={() => (dragPerson.current = index)}
        onDragEnter={() => (draggedOverPerson.current = index)}
        onDragEnd={handleSort}
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
