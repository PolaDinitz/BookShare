import { Role } from "src/enums/role.enum";

export interface Payload {
    sub: string,
    email: string,
    role: Role
}