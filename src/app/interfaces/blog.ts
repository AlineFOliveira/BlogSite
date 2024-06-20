import { Users } from "./users";

export interface Blog {
    id: number;
    name: string;
    handle: string;
    user: Pick<Users, 'id' | 'login'> | null; //pega da interface user o id e o login
}

export type newBlog = Omit<Blog, 'id'> & { id: null } //cria um novo tipo apartir de blog, omitindo o id e definindo um id como nulo