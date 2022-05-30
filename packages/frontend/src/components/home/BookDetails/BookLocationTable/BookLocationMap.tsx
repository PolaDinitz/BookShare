import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

import {
  getCoordinatesFromAddress,
  Coordinates,
} from "../../../../utils/distance-calculation";

type BookLocationMapProps = {
  address: string;
};

const BookLocationMap = (props: BookLocationMapProps) => {
 
  const [currCoordinates, setCurrCoordinates] = useState<null | Coordinates>(
    null
  );

  useEffect(() => {
    getCoordinatesFromAddress(props.address).then((response: Coordinates) => {
      setCurrCoordinates(response);
    });
  }, []);

  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={
        currCoordinates
          ? [currCoordinates.lat, currCoordinates.lon]
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
