import { Role } from "../enums/role.enum";

export interface Payload {
    sub: string,
    email: string,
    role: Role
}