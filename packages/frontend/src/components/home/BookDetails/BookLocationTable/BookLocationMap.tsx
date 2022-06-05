import { Rating } from "@mui/material";
import { LatLngBounds, LatLngExpression, marker } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  Circle,
  LayersControl,
} from "react-leaflet";
import { Coordinates } from "../../../../utils/distance-calculation";
import {  MapMarkerType } from "./BookLocationTabs";

type BookLocationMapProps = {
  location: Coordinates | null;
  markers: MapMarkerType[] | null;
};

const BookLocationMap = (props: BookLocationMapProps) => {

  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={{ lat: +props.location!.lat, lng: +props.location!.lon }}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {props.markers ? (
        props.markers.map((marker) => {
          <Circle key={marker.userBookId} center={{ lat: marker.coordinates.lat, lng: marker.coordinates.lon }} radius={500}>
        <Popup>You are here</Popup>
      </Circle>
        })
      ) : (
        <></>
      )}
    </MapContainer>
  );
};

export default BookLocationMap;
