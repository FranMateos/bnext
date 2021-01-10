import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../models/contact';
import { Repository } from 'typeorm';
import * as mongo from 'mongodb';

@Injectable()
export class ContactsService {
    constructor(
       @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>
    ){}

    async getAll(){
        return await this.contactRepository.find(); 
    }

    async get(id:string){
        return await this.contactRepository.findOne(id);
    }

    async getForIdUser(id_user:string){
        return await this.contactRepository.find({id_user});
    }

    async create(contract:Contact[]){
        return await this.contactRepository.save(contract);
    }

    async update(contact:Contact){
        return await this.contactRepository.update({_id:new mongo.ObjectId(contact._id)}, contact);
    }

    async getBetweenUsers(userId1, userId2){
        /*return await this.contactRepository.find({
            where:[
                {$and:[{id_user:userId1}, {id_user:userId2}]}
            ]
        });*/
        return (await this.contactRepository.find({})).filter(c=>c.id_user==userId1||c.id_user==userId2);
    }

    async delete(id:string){
        return await this.contactRepository.delete(id);
    }
}