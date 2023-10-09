import React from "react";
import "./deliveryDetailsModal.scss";
import Button from "../../../../../components/button";

const DeliveryDetailsModal: React.FC = () => {
  return (
    <div className="delivery-details-modal-wrapper">
      <div className="order-conformed-content">
        <div className="first-column">
          <div className="flex-content">
            <div className="checkbox-input">
              <ul className="unstyled">
                <li>
                  <input
                    className="styled-checkbox"
                    type="checkbox"
                    id="styled-checkbox-1"
                    value="value1"
                  />
                  <label htmlFor="styled-checkbox-1">Order conformed</label>
                </li>
              </ul>
            </div>
            <div className="calender-content">
              <input type="date" />
            </div>
          </div>
          <div className="text-area-input">
            <textarea
              name=""
              id=""
              cols={47}
              rows={3}
              placeholder="Message..."
            ></textarea>
          </div>
        </div>
        <div className="first-column">
          <div className="flex-content">
            <div className="checkbox-input">
              <ul className="unstyled">
                <li>
                  <input
                    className="styled-checkbox"
                    type="checkbox"
                    id="styled-checkbox-1"
                    value="value1"
                  />
                  <label htmlFor="styled-checkbox-1">Order conformed</label>
                </li>
              </ul>
            </div>
            <div className="calender-content">
              <input type="date" />
            </div>
          </div>
          <div className="text-area-input">
            <textarea
              name=""
              id=""
              cols={44}
              rows={3}
              placeholder="Message..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="order-conformed-content">
        <div className="first-column">
          <div className="flex-content">
            <div className="checkbox-input">
              <ul className="unstyled">
                <li>
                  <input
                    className="styled-checkbox"
                    type="checkbox"
                    id="styled-checkbox-1"
                    value="value1"
                  />
                  <label htmlFor="styled-checkbox-1">Order conformed</label>
                </li>
              </ul>
            </div>
            <div className="calender-content">
              <input type="date" />
            </div>
          </div>
          <div className="text-area-input">
            <textarea
              name=""
              id=""
              cols={47}
              rows={3}
              placeholder="Message..."
            ></textarea>
          </div>
        </div>
        <div className="first-column">
          <div className="flex-content">
            <div className="checkbox-input">
              <ul className="unstyled">
                <li>
                  <input
                    className="styled-checkbox"
                    type="checkbox"
                    id="styled-checkbox-1"
                    value="value1"
                  />
                  <label htmlFor="styled-checkbox-1">Order conformed</label>
                </li>
              </ul>
            </div>
            <div className="calender-content">
              <input type="date" />
            </div>
          </div>
          <div className="text-area-input">
            <textarea
              name=""
              id=""
              cols={44}
              rows={3}
              placeholder="Message..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="order-conformed-content">
        <div className="first-column">
          <div className="flex-content">
            <div className="checkbox-input">
              <ul className="unstyled">
                <li>
                  <input
                    className="styled-checkbox"
                    type="checkbox"
                    id="styled-checkbox-1"
                    value="value1"
                  />
                  <label htmlFor="styled-checkbox-1">Order conformed</label>
                </li>
              </ul>
            </div>
            <div className="calender-content">
              <input type="date" />
            </div>
          </div>
          <div className="text-area-input">
            <textarea
              name=""
              id=""
              cols={47}
              rows={3}
              placeholder="Message..."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="done-btn">
        <Button varient="primary">Done</Button>
      </div>
    </div>
  );
};

export default DeliveryDetailsModal;
