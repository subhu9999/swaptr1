import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { deleteListing } from "../listing/listingActions";

const Admin = () => {
  // const [token, setToken] = useState("");
  const [listingId, setListingId] = useState("");
  // const [userId, setUserId] = useState("");
//   const dispatch = useDispatch();
  // const pass = "pravinkanet";

  const handleDelete = () => {
    if (listingId.length > 0) {
    //   dispatch(deleteListing(listingId));

      setListingId("");
    }
  };
  return (
    <div>
      <div>
        token
        {/* <input onChange={(event) => setToken(event.target.value)} /> */}
      </div>
      {/* {
       token === pass &&   */}

      <div>
        listing id
        <input onChange={(event) => setListingId(event.target.value)} />
        <button onClick={handleDelete}>delete</button>
      </div>
      {/* } */}
    </div>
  );
};

export default Admin;
