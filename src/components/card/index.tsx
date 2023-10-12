import React, { useState } from "react";
import Button from "../button";
import ProductModule from "../productLayoutModule";
import { IProductdata } from "../../constants/types";
import LayoutModule from "../layoutModule";

interface ICardModuleData extends IProductdata {
  handleDelete: () => Promise<void>;
}

const CardModule: React.FC<ICardModuleData> = ({
  productImage,
  styles,
  productName,
  normalPrice,
  offerPrice,
  detailedFutures,
  handleDelete,
  id,
}) => {
  const [active, setActive] = useState(false);
  const [isactive, setIsActive] = useState(false);
  const handleToggle = () => {
    setActive(!active);
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
                  <div className="detailed-future">
                    <h4>Detailed Features</h4>
                  </div>
                  {detailedFutures.map((f, i) => (
                    <div className="content-material" key={i}>
                      <div>
                        <h4>Material</h4>
                        <h3>{f.materials}</h3>
                      </div>
                      <div>
                        <h4>Cloth</h4>
                        <h3>{f.cloth}</h3>
                      </div>
                    </div>
                  ))}
                  {/* <div className="colors">
                    <h4>Colors :</h4>
                    {colors.map((color, i) => (
                      <div className="color-section">
                        <div
                          style={{
                            backgroundColor: color,
                          }}
                          className="color-circle"
                          key={i}
                        ></div>
                      </div>
                    ))}
                  </div> */}

                  <div className="edit-btn">
                    <Button
                      varient="secondary"
                      onClick={(e) => setIsActive(true)}
                    >
                      Delete
                    </Button>
                    <Button varient="primary">Edit</Button>
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
