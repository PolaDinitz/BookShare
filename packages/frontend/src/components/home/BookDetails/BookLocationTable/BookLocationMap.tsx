import { Rating } from "@mui/material";
import { marker } from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  MarkerProps,
} from "react-leaflet";
import {
  Coordinates,
  getCoordinatesFromAddress,
} from "../../../../utils/distance-calculation";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationMapProps = {
  location: Coordinates | null;
  bookLocationData: BookLocationType[] | null;
};

type MapMarkerType<T> = Partial<T> & {
  coordinates: Coordinates;
};

const createMarkers = async (
  data: BookLocationType[] | null
): Promise<MapMarkerType<BookLocationType>[]> => {
  return await Promise.all(
    data!.map(async (marker) => {
      return {
        ...marker,
        coordinates: await getCoordinatesFromAddress(marker.address),
      };
    })
  );
};

const BookLocationMap = (props: BookLocationMapProps) => {
  const map = useMap();
  
  const [markers, setMarkers] = useState<
    MapMarkerType<BookLocationType>[] | null
  >(null);

  useEffect(() => {
    const createMarkersData = async () => {
      const createdMarkers = await createMarkers(props.bookLocationData);
      setMarkers(createdMarkers);
    };

    createMarkersData().catch(console.error);
  }, []);

  return (
    <MapContainer
      style={{ width: "500px", height: "300px" }}
      center={
        props.location
          ? [props.location.lat, props.location.lon]
          : [31.72, 35.079]
      }
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers?.map((marker) => {
        <Marker
          position={{
            lat: marker.coordinates.lat,
            lng: marker.coordinates.lon,
          }}
        >
          <Popup>
            {marker.fullname} <br />
            {marker.distance} <br />
            <Rating name="Rating" value={marker.rating} readOnly size="small" />
          </Popup>
        </Marker>;
      })}
    </MapContainer>
  );
};

export default BookLocationMap;
