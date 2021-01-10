import { Entity, Column, ObjectIdColumn, ObjectID, OneToMany } from "typeorm";
import { Contact } from "./contact";

@Entity()
export class User {
    @ObjectIdColumn({ generated: false })
    _id: ObjectID;
    @Column()
    name: string;
    @Column()
    lastName: string;
    @Column()
    phone: string;
    // to assign contracts
    contacts: Array<Contact>;
}
