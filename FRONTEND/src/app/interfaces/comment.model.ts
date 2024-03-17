import { House} from "./house.model";
import { User} from "./user.model";

export interface Comment{
    id: number;

    rating: number;
    opinion: string;

    users: User;
    houses: House;
}
