export interface Users {
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    activated: boolean;
    langKey: string;
    createdBy: string;
    createdDate: string;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    authorities: string[];
}