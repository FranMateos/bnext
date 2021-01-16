import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

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
