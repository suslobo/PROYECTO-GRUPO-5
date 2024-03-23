import { House } from "src/house/house.model";
import { User } from "src/user/user.model";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
    people?: number;

    @Column()
    destination: string;

    @Column()
    available: boolean;

    @ManyToOne(() => User, {eager: true})
    users: User;

    @ManyToOne(() => House, {eager: true})
    house: House;

    @Column()
    totalPrice: number;



}