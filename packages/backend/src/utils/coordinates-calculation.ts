import axios from "axios";
import { HttpException, HttpStatus } from "@nestjs/common";

export type Coordinates = {
    lat: number;
    lon: number;
};

export const getCoordinatesFromAddress = async (
    address: string
): Promise<Coordinates> => {

    let response = await axios.get(`https://nominatim.openstreetmap.org/search.php`, {
        params: {
            q: address,
            polygon_geojson: '1',
            format: 'jsonv2'
        }
    });

    if (response.data.length === 0)
        throw new HttpException("Couldn't find matching coordinates for the address", HttpStatus.BAD_REQUEST);

    return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
    };
};