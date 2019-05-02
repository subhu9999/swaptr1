import React from "react";

const ShowNumberToggle = ({ defaultChecked, onChange }) => {
  return (
    <div className="form-group ">
      <span className=" lead font-italic">Show Number On Ads</span>

      <label className="switch text-center">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <span className="slider round" />
      </label>
    </div>
  );
};

export default ShowNumberToggle;
