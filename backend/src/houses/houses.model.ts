import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    places: string;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    price: number;

    @Column()
    meters: number;

    @Column()
    destination: string;

    @Column()
    petFriendly: boolean;

    @Column()
    pool: boolean;

    @Column()
    garden: boolean;

    @Column()
    terrace: boolean;

    @Column()
    wifi: boolean;

    @Column()
    air: boolean;

    @Column({length: 3000})
    description: string;

    @Column({type: 'simple-array'})
    photoUrls: string[];
}