import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import {
  Coordinates,
  getCoordinatesFromAddress,
} from "../../../../utils/distance-calculation";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationMapProps = {
  location: Coordinates | null;
  markersData: BookLocationType[] | null;
};

type MapMarkerType<BookLocationType> = Partial<BookLocationType> & {
  coordinates: Coordinates;
};

const createMarkers = async (
  markersData: BookLocationType[]
): Promise<BookLocationType[]> => {
  return await Promise.all(
    markersData.map(async (marker) => {
      return {
        ...marker,
        coordinates: await getCoordinatesFromAddress(marker.address),
      };
    })
  );
};

const BookLocationMap = (props: BookLocationMapProps) => {
  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={
        props.location
          ? [props.location.lat, props.location.lon]
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
