import { Avatar, Rating } from "@mui/material";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { config } from "../../../../config/config";
import { Coordinates } from "../../../../utils/distance-calculation";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationMapProps = {
  location: Coordinates | null;
  markers: BookLocationType[] | null;
};

const BookLocationMap = (props: BookLocationMapProps) => {
  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={
        props.location ? [+props.location.lat, +props.location.lon] : undefined
      }
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.location ? (
        <Marker
          position={{
            lat: props.location.lat,
            lng: props.location.lon,
          }}
        >
          <Popup>You're here</Popup>
        </Marker>
      ) : (
        <></>
      )}
      {props.markers &&
        props.markers.map((marker) => (
          <CircleMarker
            key={marker.userBookId}
            center={{
              lat: marker.coordinates.lat,
              lng: marker.coordinates.lon,
            }}
            radius={50}
            color="red"
          >
          <Popup>
          <Avatar src={`${config.apiUrl}/${marker.avatar}`}/>
            {marker.fullName} <br />
            {`${marker.distance.toFixed(1)} Km`} <br />
            <Rating name="Rating" value={marker.rating} precision={0.5} readOnly size="small" />
          </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
};

export default BookLocationMap;
