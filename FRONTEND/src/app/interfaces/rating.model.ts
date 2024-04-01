import { House } from "./house.model";
import { User } from "./user.model";

export interface Rating {

    id: number;

  score: number;
  comment: string;
  createdDate: Date;
  userId: string;
  houseId: number;
  
}