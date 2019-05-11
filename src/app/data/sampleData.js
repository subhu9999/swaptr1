const sampleData = {
  listings: [
    {
      id: "1",
      category: "Men",
      title: "Supreme Shoes",
      date: "2018-03-18",
      listingMainPhoto:
        "https://images.unsplash.com/photo-1480544967375-135f88f06bc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80",

      description:
        "Very Nice shoes Bought in New condition . Like To Trade It For A Laptop !",
      city: "Bangalore,India",

      userName: "Rupesh Dinkar",
      profilePic: "https://randomuser.me/api/portraits/men/42.jpg",
      phoneNumber: "8923437589",
      userRating: 3,

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
      date: "2018-03-18",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto:
        "https://sc01.alicdn.com/kf/HTB1SUfHKFXXXXbrXpXXq6xXFXXXV/52-YEARS-OLD-TABLE-FAN.jpg_350x350.jpg",
      city: "Kolkata,India",
      userName: "Chaitra Sen",
      profilePic: "https://randomuser.me/api/portraits/women/42.jpg",
      phoneNumber: "7973376891",
      userRating: 4,
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
      date: "2018-05-11",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto:
        "https://teja8.kuikr.com/i4/20190327/As-good-as-new--Office-table-and-chair-set-on-sale-VB201705171774173-ak_LWBP497182068-1553691905.webp",
      city: "Dombivali",

      userName: "John Ken",
      profilePic: "https://randomuser.me/api/portraits/men/52.jpg",
      phoneNumber: "8983375891",
      userRating: 5,
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
      date: "2019-04-18",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto:
        "http://cdn.rentone.in/upload/l/1183/LARGE_1459193371477.jpg",
      city: "Dombivali",

      userName: "Shalurya Kiad",
      profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
      phoneNumber: "8983375891",
      userRating: 2,
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
      date: "2018-03-18",
      listingMainPhoto:
        "https://apollo-singapore.akamaized.net/v1/files/u7iii75p6u2g1-IN/image;s=300x600;q=60",
      description:
        "Very Nice shoes Bought in New condition . Like To Trade It For A Laptop !",
      city: "Bangalore,India",

      userName: "Shawn Nigga",
      profilePic: "https://randomuser.me/api/portraits/men/19.jpg",
      phoneNumber: "8983375891",
      userRating: 1,
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
      date: "2018-06-18",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto:
        "https://images.unsplash.com/photo-1534601135412-16737e74d914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      city: "Kolkata,India",

      userName: "Nicky Fury",
      profilePic: "https://randomuser.me/api/portraits/women/22.jpg",
      phoneNumber: "8983375891",
      userRating: 3,
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
      date: "2018-03-18",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto:
        "https://apollo-singapore.akamaized.net/v1/files/ph20jn8demit3-IN/image;s=300x600;q=60",
      city: "Kolkata,India",

      userName: "Sheik Ba",
      profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
      phoneNumber: "8983375891",
      userRating: 1,
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
      date: "2018-03-18",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis tenetur quaerat reprehenderit laboriosam, ipsa molestias? Nostrum voluptatum excepturi deserunt minima!",
      listingMainPhoto: "/assets/swaptr-listing.jpg",
      city: "Kolkata,India",

      userName: "Jessica Rein",
      profilePic: "https://randomuser.me/api/portraits/women/66.jpg",
      phoneNumber: "8983375891",
      userRating: 0,
      followers: [
        {
          id: "22",
          name: "Rumesh",
          userPhotoUrl: "https://randomuser.me/api/portraits/women/22.jpg"
        }
      ]
    }
  ]
};

export default sampleData;
