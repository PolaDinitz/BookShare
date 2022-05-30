import axios, { Axios, AxiosResponse } from "axios";

export const API_KEY = "AIzaSyCuLDHRexzdajcdHrIfMUX8DeduAir9nNo";

export type Coordinates = {
  lon: number;
  lat: number;
};

export const getCoordinatesFromAdress = async (
  address: string
): Promise<Coordinates> => {

  let response = await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address.replace(
        " ",
        "+"
      )}&key=${API_KEY}`
    );

    return {
        lon: response.data["results"][0]["geometry"]["location"]["lng"],
        lat: response.data["results"][0]["geometry"]["location"]["lat"],
      };
};

export const calcDistanceFromAdress = async (
  adress: string,
  currLocation: Coordinates
): Promise<number> => {
  let coordinatesFromAdress = await getCoordinatesFromAdress(adress);

  return getDistanceFromLatLonInKm(coordinatesFromAdress.lat, coordinatesFromAdress.lon, currLocation.lat, currLocation.lon);
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
