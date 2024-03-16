import { Houses } from "./house.model";
import { Users } from "./user.model";

export interface Comment{
    id: number;

    rating: number;
    opinion: string;

    users: User;
    houses: House;
}
