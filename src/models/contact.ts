import { Column, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Contact {
    @ObjectIdColumn({ generated: false })
    _id: ObjectID;
    @Column()
    contactName: string;
    @Column()
    phone: string;
    @Column()
    id_user: string;
}
