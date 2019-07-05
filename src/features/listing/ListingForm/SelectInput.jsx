import React from "react";

const options = [
  { key: "Antiques", value: "Antiques", text: "Antiques & Collectibles" },
  { key: "Appliances", value: "Appliances", text: "Appliances" },
  { key: "Arts", value: "Arts", text: "Arts & Crafts" },
  { key: "Auto", value: "Auto", text: "Auto Parts" },
  { key: "Baby", value: "Baby", text: "Baby & Kids" },
  { key: "Bags", value: "Bags", text: "Bags & luggage" },
  { key: "Bicycles", value: "Bicycles", text: "Bicycles" },
  { key: "Books", value: "Books", text: "Books" },
  { key: "Car", value: "Car", text: "Car parts" },
  { key: "Electronics", value: "Electronics", text: "Electronics & computers" },
  { key: "Furniture", value: "Furniture", text: "Furniture" },
  { key: "Garden", value: "Garden", text: "Garden Accessories" },
  { key: "Health", value: "Health", text: "Health & beauty" },
  { key: "Household", value: "Household", text: "Household" },
  { key: "Jewellery", value: "Jewellery", text: "Jewellery & accessories" },
  { key: "Men", value: "Men", text: "Men's clothing & shoes" },
  { key: "Mobile", value: "Mobile", text: "Mobile Phones" },
  { key: "Musical", value: "Musical", text: "Musical Instruments" },
  { key: "Others", value: "Others", text: "Others" },
  { key: "Pet", value: "Pet", text: "Pet supplies" },
  { key: "Sport", value: "Sport", text: "Sport & outdoors" },
  { key: "Tools", value: "Tools", text: "Tools" },
  { key: "Toys", value: "Toys", text: "Toys & games" },
  { key: "Vehicles", value: "Vehicles", text: "Vehicles" },
  { key: "Women", value: "Women", text: "Women's clothing & shoes" }
];

const SelectInput = ({ input, type, meta: { touched, error } }) => {
  return (
    <div className="form-group ml-md-4 ">
      <select
        {...input}
        required
        className={
          "form-control listing-form-select custom-select mb-3" +
          (touched && error
            ? "form-control listing-form-select custom-select mb-3 border-danger"
            : "")
        }
        onChange={e => input.onChange(e.target.value)}
      >
        <option value="" hidden>
          Select Category*
        </option>
        {/* <option value={input.value} key={input.value}>
          {input.value}
        </option> */}

        {options.map(option => {
          return (
            <option key={option.key} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>

      {touched && error && <label className="text-danger ">{error}</label>}
    </div>
  );
};

export default SelectInput;
