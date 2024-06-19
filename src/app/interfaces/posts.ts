import { Blog } from "./blog";

export interface Posts {
    id: number;
    title: string;
    content?: string;
    date?: string;
    blog: Blog | null;
}
