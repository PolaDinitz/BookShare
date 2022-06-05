import axios, { Axios, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export type Coordinates = {
  lat: number;
  lon: number;
};

export const getCoordinatesFromAddress = async (
  address: string
): Promise<Coordinates> => {
  let response = await axios.get(
    `https://nominatim.openstreetmap.org/search.php`,
    { params: { q: address, polygon_geojson: "1", format: "jsonv2" } }
  );

  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon,
  };
};

export const calcDistanceFromAddress = async (
  address: string,
  currLocation: Coordinates
): Promise<number> => {
  let coordinatesFromAddress = await getCoordinatesFromAddress(address);

  return getDistanceFromLatLonInKm(
    coordinatesFromAddress.lat,
    coordinatesFromAddress.lon,
    currLocation.lat,
    currLocation.lon
  );
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};
