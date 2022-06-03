import { Role } from "../enums/role.enum";

export interface ResponsePayload {
    refresh_token : string,
    access_token: string,
    email : string,
    role : Role,
    firstName: string,
    lastName: string,
    imageUrl: string,
    id: string
}