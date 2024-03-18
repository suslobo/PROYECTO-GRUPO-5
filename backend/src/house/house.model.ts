import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    places: string;

    @Column()
    bedrooms: number;

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

    @Column()
    description: string;

    @Column()
    photoUrls: string[];
}
