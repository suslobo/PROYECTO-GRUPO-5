import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.model";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column()
    phone: string;

    @Column({unique: true})
    nif: string;

    @Column()
    password: string;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column()
    postalCode: string;

    @Column()
    role: Role;







   
    
}



