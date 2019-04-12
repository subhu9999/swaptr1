import React, { Component } from "react";
import Listing from "../Listing/Listing";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import Banner from "../../../app/layout/Banner/Banner";

const listings = [
  {
    id: "1",
    title: "Supreme Shoes",
    date: "MAR 12",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/xwt538lr7mmk3-IN/image;",
    description:
      "Very Nice shoes Bought in New condition . Like To Trade It For A Laptop !",
    city: "Bangalore,India",
    owner: "Sheik Ba",
    followers: [
      {
        id: "23",
        name: "Bob",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/27.jpg"
      }
    ]
  },

  {
    id: "2",
    title:
      "Rs 220 Bike 3month old Lorem ipsum dolor sit amet consectetur adipi",
    date: "JUN 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/vp78hjz15u1a-IN/image",
    city: "Kolkata,India",
    owner: "Manoj Ti",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  },
  {
    id: "3",
    title: "solar water heater ",
    date: "MAY 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/ph20jn8demit3-IN/image;s=300x600;q=60",
    city: "KRupesh k",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  },
  {
    id: "4",
    title: "JBL Speakers ",
    date: "MAY 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/enhblvpzwwcp3-IN/image;s=300x600;q=60",
    city: "KRupesh k",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  },
  {
    id: "5",
    title: "Supreme Shoes",
    date: "MAR 12",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/xwt538lr7mmk3-IN/image;",
    description:
      "Very Nice shoes Bought in New condition . Like To Trade It For A Laptop !",
    city: "Bangalore,India",
    owner: "Sheik Ba",
    followers: [
      {
        id: "23",
        name: "Bob",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/27.jpg"
      }
    ]
  },

  {
    id: "6",
    title: "Rs 220 Bike 3month old ",
    date: "JUN 20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/vp78hjz15u1a-IN/image",
    city: "Kolkata,India",
    owner: "Manoj Ti",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  },
  {
    id: "7",
    title: "solar water heater ",
    date: "MAY 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/ph20jn8demit3-IN/image;s=300x600;q=60",
    city: "KRupesh k",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  },
  {
    id: "8",
    title: "I need Chevrolet Beat with low kms and good running condition ",
    date: "MAY 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
    listingPhotoUrl:
      "https://apollo-singapore.akamaized.net/v1/files/enhblvpzwwcp3-IN/image;s=300x600;q=60",
    city: "KRupesh k",
    followers: [
      {
        id: "22",
        name: "Rumesh",
        userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ]
  }
];
class ListingDashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner />
        <div className="row  ml-auto mr-auto">
          {listings.map(listing => (
            <Listing key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    );
  }
}

export default ListingDashboard;
