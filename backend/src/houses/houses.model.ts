import { Transform } from "class-transformer";
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

    @Transform(({value}) => value === 'true')
    @Column({nullable: true})

    petFriendly: boolean;

    @Transform(({value}) => value === 'true')

    @Column({nullable: true})
    pool: boolean;

    @Transform(({value}) => value === 'true')
    @Column({nullable: true})
 
    garden: boolean;

    @Transform(({value}) => value === 'true')
    @Column({nullable: true})
 
    terrace: boolean;

    @Column({nullable: true})
    @Transform(({value}) => value === 'true')
    wifi: boolean;

    @Transform(({value}) => value === 'true')
    @Column({nullable: true})
    air: boolean;

    @Column({length: 3000})
    description: string;

    @Column({nullable: true})
    people: number;

    @Column({nullable: true})
    photoUrl : string;

}