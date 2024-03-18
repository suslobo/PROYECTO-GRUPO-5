import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class House {

    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'simple-array'})
    photos: string[];
    
}