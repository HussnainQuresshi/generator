import React, { useContext } from "react";
import ListingForm from "./ListingForm.js";
import ListingList from "./ListingList.js";
// import Listing from './Listing.js'
import { UserContext } from "../context/UserProvider.js";

export default function Profile() {
  const {
    user: { username },
    addListing,

    listings,
  } = useContext(UserContext);

  return (
    <div className="profile">
      <h2>You are logged in as "{username}"</h2>
      <h2>Use the form below to generate eBay listings</h2>
      <ListingForm addListing={addListing} listings={listings} />
      {/* <table>
            <thead>
              <h5>eBay Inventory</h5>
              <tr>
                <th>Title</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>SKU</th>
                <th>Categories</th>
                <th>Action</th>
              </tr>
            </thead>
          </table> */}
      <ListingList listings={listings} />
    </div>
  );
}
