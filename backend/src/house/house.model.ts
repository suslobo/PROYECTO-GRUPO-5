import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class House {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({unique:true})
    email: string;

    @Column()
    places: string;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column({type: 'decimal', precision: 14, scale: 2})
    price: number

    @Column()
    meters: number; 
        
    @Column()
    destination: string;

    @Column({type: 'boolean', default: false})
    petFriendly: boolean;

    @Column({type: 'boolean', default: false})
    pool: boolean;

    @Column({type: 'boolean', default: false})
    garden: boolean;

    @Column({type: 'boolean', default: false})
    terrace: boolean;

    @Column({type: 'boolean', default: false})
    wifi: boolean;

    @Column({type: 'boolean', default: false})
    air: boolean;

    @Column()
    description: string;

    @Column()
    photoUrls: string ;


}