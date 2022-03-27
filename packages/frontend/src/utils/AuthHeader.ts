import { AxiosRequestHeaders } from "axios";

export const accessTokenAuthHeader = () : AxiosRequestHeaders => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user !== '{}' && user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
    } else {
        return {};
    }
}

export const refreshTokenAuthHeader = (): AxiosRequestHeaders => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user !== '{}' && user && user.refresh_token) {
        return { Authorization: 'Bearer ' + user.refresh_token };
    } else {
        return {};
    }
}