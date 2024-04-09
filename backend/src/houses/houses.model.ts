import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()

export class House {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    title: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    phone: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    places: string;

    @Column({nullable: true})
    bedrooms: number;

    @Column({nullable: true})
    bathrooms: number;

    @Column({nullable: true})
    price: number;

    @Column({nullable: true})
    meters: number;

    @Column({nullable: true})
    destination: string;

    @Column({nullable: true})
    petFriendly: boolean;

    @Column({nullable: true})
    pool: boolean;

    @Column({nullable: true})
    garden: boolean;

    @Column({nullable: true})
    terrace: boolean;

    @Column({nullable: true})
    wifi: boolean;

    @Column({nullable: true})
    air: boolean;

    @Column({length: 3000})
    description: string;

    @Column({nullable: true})
    people: number;

   /*  @Column({type: 'simple-array'})
    photoUrls: string[];  */
    @Column({nullable: true})
    photoUrl : string;
   
}