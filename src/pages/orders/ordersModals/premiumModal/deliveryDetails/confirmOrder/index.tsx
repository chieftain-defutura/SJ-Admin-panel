import { Field } from "formik";
import React from "react";
interface IPropdata {
  title: string;
  creayedAt: string;
  descriptionName: string;
  status: string;
}
const ConfirmOrder: React.FC<IPropdata> = ({
  title,
  status,
  creayedAt,
  descriptionName,
}) => {
  return (
    <div>
      <div className="first-column">
        <div className="flex-content">
          <div>
            <div className="checkbox-input">
              <ul className="unstyled">
                <Field
                  name={status}
                  className="styled-checkbox"
                  type="checkbox"
                  id={title}
                />
                <label htmlFor={title}> {title}</label>
              </ul>
            </div>
          </div>

          <div className="calender-content">
            <Field name={creayedAt} type="date" />
          </div>
        </div>
        <div className="text-area-input">
          <Field
            name={descriptionName}
            id=""
            cols={47}
            rows={3}
            placeholder="Message..."
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
