import React from "react";
import Button from "../../button";
import "./table.scss";

interface TableProps {
  data: {
    profileImg: string;
    name: string;
    shirt: string;
    quantity: string;
    price: string;
    size: string;
    address: string;
  }[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>
              <span>User name</span>
            </th>
            <th>
              <span>Product</span>
            </th>
            <th>
              <span>Quantity</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Size</span>
            </th>
            <th>
              <span>Address</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="flex-item row-header">
                  <img src={item.profileImg} alt="" />
                  <p>{item.name}</p>
                </div>
              </td>
              <td>{item.shirt}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.size}</td>
              <td>{item.address}</td>

              <td>
                <Button
                  varient="primary"
                  style={{ padding: "9px 38px", fontSize: "12px" }}
                >
                  View details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
