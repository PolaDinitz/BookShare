import { MapContainer, TileLayer } from "react-leaflet";
import { Coordinates } from "../../../../utils/distance-calculation";

type BookLocationMapProps = {
    address: string;
    location: Coordinates | null;
};

const BookLocationMap = (props: BookLocationMapProps) => {

    return (
        <MapContainer
            style={{width: "500px", height: "300px"}}
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
