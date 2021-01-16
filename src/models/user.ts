import { type } from "os";
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

    static checkUser(user:User){
        return (user.name&&typeof user.name=='string'&&user.name!='')&&
        (user.lastName&&typeof user.lastName=='string'&&user.lastName!='')&&
        (user.phone&&typeof user.phone=='string'&&user.phone!='');
    }

}
