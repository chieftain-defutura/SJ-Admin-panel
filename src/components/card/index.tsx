import React, { useState } from "react";
import Button from "../button";
import ProductModule from "../productLayoutModule";
import { IProductdata } from "../../constants/types";
import LayoutModule from "../layoutModule";
import { deleteDoc, doc } from "firebase/firestore";
import { PRODUCTS_COLLECTION_NAME } from "../../constants/firebaseCollection";
import { db } from "../../utils/firebase";
import { Link } from "react-router-dom";

interface ICardModuleData extends IProductdata {
  productType: "medium" | "premium";
}

const CardModule: React.FC<ICardModuleData> = ({
  gender,
  productImage,
  styles,
  productName,
  normalPrice,
  offerPrice,
  description,
  id,
  sizes,
  colors,
  productType,
}) => {
  const [active, setActive] = useState(false);
  const [isactive, setIsActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };
  console.log(sizes);

  const handleDelete = async () => {
    const DeleteRef = doc(db, PRODUCTS_COLLECTION_NAME, id);

    try {
      await deleteDoc(DeleteRef);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="product-card-layout">
        <div className="product-card">
          <div className="product-img">
            <img src={productImage} alt="" width={200} height={250} />
          </div>
          <div className="product-details">
            <h3>{styles}</h3>
            <Button varient="primary" onClick={handleToggle}>
              View
            </Button>
          </div>

          {active && (
            <ProductModule handleToggle={handleToggle}>
              <>
                <div className="product-preview-img">
                  <h2>Product image</h2>
                  <div className="product-img">
                    <img
                      src={productImage}
                      alt="products"
                      width={176}
                      height={234}
                    />
                  </div>
                </div>
                <div className="product-preview-img">
                  <h2>Preview</h2>
                  <div className="content">
                    <div>
                      <h4>style</h4>
                      <h3>{styles}</h3>
                    </div>{" "}
                    <div>
                      <h4>Normal Price</h4>
                      <h3>{normalPrice}</h3>
                    </div>
                    <div>
                      <h4>Offer Price</h4>
                      <h3>{offerPrice}</h3>
                    </div>
                    <div>
                      <h4>Product name</h4>
                      <h3>{productName}</h3>
                    </div>
                    <div>
                      <h4>Gender</h4>
                      <h3>{gender}</h3>
                    </div>
                  </div>

                  {/* {sizes.sizeVarients.map((s, i) => (
                    <div className="size-content" key={i}>
                      <div>
                        <h3>Size</h3>
                        <h3>{sizes.country}</h3>
                        <h3>{sizes.gender}</h3>
                      </div>
                      <div>
                        <h3>{s.type}</h3>
                      </div>
                    </div>
                  ))} */}
                  {/* <div className="detailed-future">
                    <h4>Detailed Features</h4>
                  </div> */}

                  <div className="content-material">
                    <div>
                      <h4>Description</h4>
                      <h3>{description}</h3>
                    </div>
                  </div>

                  {/* <div>
                    <select name="sizes">
                      {sizes.map((v, index) => (
                        <option id={v.country} value={v.country} key={index}>
                          {v.country}
                        </option>
                      ))}
                    </select>
                    <table>
                      <tr>
                        <th>Size</th>
                        <th>measurement</th>
                        <th>Quntity</th>
                      </tr>

                      {sizes.map((v, index) => (
                        <>
                          {v.country === v.country ? (
                            <div key={index}>
                              {v.sizeVarients.map((f, i) => (
                                <>
                                  <tr key={i}>
                                    <td>{f.size}</td>
                                    <td>{f.measurement}</td>
                                    <td>{f.quantity}</td>
                                  </tr>
                                </>
                              ))}
                            </div>
                          ) : null}
                        </>
                      ))}
                    </table>
                  </div> */}

                  {/* <pre>{JSON.stringify(sizes, null, 2)}</pre> */}

                  {colors && (
                    <div className="colors">
                      <h4>Colors :</h4>
                      {colors.map((color, i) => (
                        <div className="color-section">
                          <div
                            style={{
                              backgroundColor: color.color,
                            }}
                            className="color-circle"
                            key={i}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="edit-btn">
                    <Button
                      varient="secondary"
                      onClick={(e) => setIsActive(true)}
                    >
                      Delete
                    </Button>
                    <Link to={`/products/${productType}/edit/${id}`}>
                      <Button varient="primary">Edit</Button>
                    </Link>
                  </div>
                  {isactive && (
                    <LayoutModule
                      handleToggle={() => setIsActive(false)}
                      className="delete-module"
                    >
                      <div className="content-delete">
                        <h3>Delete</h3>
                      </div>
                      <div className="content-delete">
                        <p>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam,""
                        </p>
                      </div>
                      <div className="delete-section-btn">
                        <Button
                          varient="notifi"
                          onClick={() => setIsActive(false)}
                        >
                          Cancel
                        </Button>
                        <Button varient="primary" onClick={handleDelete}>
                          Done
                        </Button>
                      </div>
                    </LayoutModule>
                  )}
                </div>
              </>
            </ProductModule>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModule;
