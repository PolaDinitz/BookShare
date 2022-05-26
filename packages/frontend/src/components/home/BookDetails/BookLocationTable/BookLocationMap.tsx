import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const BookLocationMap = () => {
  return (
        <MapContainer style={{width: "50%", height: "500px"}} center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
      <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
};

export default BookLocationMap;
