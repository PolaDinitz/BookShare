import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";

import {
  getCoordinatesFromAdress,
  Coordinates,
} from "../../../../utils/distance-calculation";
import { User } from "../../../../features/user/user.model";
import userService from "../../../../services/user.service";
import { RootState } from "../../../../types/types";

const BookLocationMap = () => {
  const userId = useSelector((state: RootState) => state.auth.user!.id);
  const [user, setUser] = useState({} as User);
  const [currCoordinates, setCurrCoordinates] = useState<null | Coordinates>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      return await userService.getUserById(userId);
    };
    fetchUser().then((user: User) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    getCoordinatesFromAdress(user.address).then((response: Coordinates) => {
      setCurrCoordinates(response);
    });
  }, []);

  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={
        currCoordinates
          ? [currCoordinates.lon, currCoordinates.lat]
          : [31.72, 35.079]
      }
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default BookLocationMap;
