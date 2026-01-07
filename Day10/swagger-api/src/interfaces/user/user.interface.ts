/* eslint-disable prettier/prettier */
import { UserRole } from "src/enum/user-role.enum";
export interface User {
    id: number,
    name: string,
    email: string,
    role: UserRole,
    phone: string
}
