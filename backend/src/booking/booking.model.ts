import { House } from "src/houses/houses.model";
import { User } from "src/users/users.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    entryDate: Date;

    @Column({type: 'date'})
    departureDate: Date;

    @Column({type: 'decimal', precision: 14, scale: 2})
    price: number;

    @Column()
    people: number;

    @Column()
    destination: string;

    @Column()
    available: boolean;

    @Column()
    creditCard: string;

    @Column()
    status: string;

    
    
    @ManyToOne(() => User, {eager: true})
    user: User;

    @ManyToOne(() => House, {eager: true})
     house: House;



    // @ManyToOne(() => Payment, {eager: true})
    // payment: Payment;

    // @ManyToOne(() => BookingStatus, {eager: true})
    // status: BookingStatus;
    

}
