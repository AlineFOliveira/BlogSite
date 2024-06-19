import { Users } from "./users";

export interface Blog {
    id: number;
    name: string;
    handle: string;
    user: Pick<Users, 'id' | 'login'> | null; //pega da interface user o id e o login
}
