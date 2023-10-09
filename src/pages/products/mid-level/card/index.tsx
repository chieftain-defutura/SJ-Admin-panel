import React from "react";
import Button from "../../../../components/button";
import ProductModule from "../../../../components/productLayoutModule";
import { IProductdata } from "../../../../constants/types";
import BGimage from "../../../../assets/images/post-logo.png";

interface ICardModuleData {
  data: IProductdata[];
  handleToggle: () => void;
  active: boolean;
}

const CardModule: React.FC<ICardModuleData> = ({
  data,
  handleToggle,
  active,
}) => {
  return (
    <div>
      <div className="product-card-layout">
        <div className="product-card">
          <div className="product-img">
            <img src={BGimage} alt="" width={200} height={250} />
          </div>
          <div className="product-details">
            <h3>style</h3>
            <Button varient="primary" onClick={handleToggle}>
              View
            </Button>
          </div>

          {/* {active && (
                <ProductModule handleToggle={handleToggle} key={i}>
                  <>
                    <div className="product-preview-img" key={i}>
                      <h2>Product image</h2>
                      <div className="product-img">
                        <img
                          src={f.productImage}
                          alt="products"
                          width={176}
                          height={234}
                        />
                      </div>
                      <h3>{f.productName}</h3>
                    </div>
                    <div className="product-preview-img">
                      <h2>Preview</h2>
                      <div className="content">
                        <div>
                          <h4>style</h4>
                          <h3>{f.styles}</h3>
                        </div>{" "}
                        <div>
                          <h4>Normal Price</h4>
                          <h3>{f.normalPrice}</h3>
                        </div>
                        <div>
                          <h4>Normal Price</h4>
                          <h3>{f.offerPrice}</h3>
                        </div>
                      </div>
                      <div className="size-content">
                        <div>
                          <h3>Size</h3>
                          <h3>{f.sizes.country}</h3>
                          <h3>{f.sizes.gender}</h3>
                        </div>
                      </div>
                      <div className="detailed-future">
                        <h4>Detailed Features</h4>
                      </div>
                      <div className="content-material">
                        <div>
                          <h4>Material</h4>
                          <h3>{.materials}</h3>
                        </div>
                        <div>
                          <h4>Cloth</h4>
                          <h3>{item.cloth}</h3>
                        </div>
                      </div>
                      <div className="edit-btn">
                        <Button varient="secondary">Delete</Button>
                        <Button varient="primary">Edit</Button>
                      </div>
                    </div>
                  </>
                </ProductModule>
              )} */}
        </div>
      </div>
    </div>
  );
};

export default CardModule;
