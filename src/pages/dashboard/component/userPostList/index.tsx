import React from "react";
import "./userPostList.scss";
import Layout from "../../../../layout";
import Button from "../../../../components/button";
import { userPostData } from "../../../../data/userPostListData";

const UserPostList: React.FC = () => {
  return (
    <div className="mx">
      <Layout>
        <div className="user-post-list-wrapper">
          <div className="user-post-container flex-item">
            <h2>User post list</h2>
            <div className="total-text flex-item">
              <p>Total Post</p>
              <p>524</p>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <span>User name</span>
                  </th>
                  <th>
                    <span>Date</span>
                  </th>
                  <th>
                    <span>Time</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {userPostData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex-item row-header">
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>

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
        </div>
      </Layout>
    </div>
  );
};

export default UserPostList;
