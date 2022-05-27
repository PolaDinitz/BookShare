import axios, { AxiosError, AxiosResponse } from "axios";

export interface GeocodeResult {
    name: string;
}

const API_KEY = "ApwEnuJCy3nOG4PpvcmOSx6Rhi2JojGumbu9mY5qDY-9FWD7SYS3yp80vDQvtg4O";

const getAddressByName = (address: string) => {
    return axios.get(
        `https://dev.virtualearth.net/REST/v1/Locations?q=${address.replace(" ", "+")}&addressLine=${address.replace(" ", "+")}&key=${API_KEY}`
    )
        .then((response: AxiosResponse) => {
            return response.data.resourceSets[0].resources;
        }).catch((error: AxiosError) => {
            throw new Error(`Something went wrong while trying to get address list from bing, 
                            ${(error.response ? error.response?.data?.message : error.message)}`);
        })
}

const geocodeService = {
    getAddressByName,
};

export default geocodeService;