import { BookingStatus } from "./booking-status.model";
import { House } from "./house.model";
import { Payment } from "./payment.model";
import { User} from "./user.model";

export interface Booking {
        id: number;

        entryDate: Date;
        departureDate: Date;
        people: number;
        destination?: string;
        available?: boolean;
        price: number;
        

        users?: User;
        house?: House;
        //payment?: Payment;
        //status?: BookingStatus;
        totalPrice?: number;

}
