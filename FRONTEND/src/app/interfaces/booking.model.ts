import { BookingStatus } from "./booking-status.model";
import { House } from "./house.model";
import { Payment } from "./payment.model";
import { User} from "./user.model";

export interface Booking {
        id: number;

        entryDate: Date;
        departureDate: Date,
        people: number;
        destination: string;
        available: boolean;

        users: User;
        houses: House;
        payment: Payment;
        status: BookingStatus;

}
