import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    _id: string;
    @Column()
    id:string; // ya sea dni, nie o pasaporte
    @Column()
    name: string;
    @Column()
    surname1: string;
    @Column()
    surname2: string;
    @Column()
    email: string;
    @Column()
    phone: string;
    @Column()
    imei: string;
    @Column()
    updated_at: Date;
    @Column()
    created_at: Date;
}
