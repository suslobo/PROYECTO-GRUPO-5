import { House } from "./house.model";
import { User } from "./user.model";

export interface Rating {

    id: number;

  title: string;
  address: string;
  phone: string;
  email: string;
  places: string;
  bedrooms: number;
  bathrooms: number;
  price: number;

  meters: number;
  destination: string;

  petFriendly: boolean;
  pool: boolean;
  garden: boolean;
  terrace: boolean;
  wifi: boolean;
  air: boolean;

  description: string;
  photoUrls: string [];

  user?: User;
  book?: House;
}