// import { FETCH_LOCATIONS } from "./testConstants";
import axios from "axios";

export const fetchLocations = () => {
  axios
    .get(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/bang.json?access_token=pk.eyJ1Ijoic3ViaHU5OTk5IiwiYSI6ImNqdmFsNjV0YjEwMXA0YW15aXNlbXY5am4ifQ.3tcp5MgXqPwCkuoG8OkC8A"
    )
    .then(res => {
      const locations = res.data.features;

      console.log(locations.map(place => place.place_name));
    })

    .catch(err => console.log(err));
};
