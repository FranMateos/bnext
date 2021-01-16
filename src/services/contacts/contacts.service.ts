import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../../models/contact';
import { Repository } from 'typeorm';
import * as mongo from 'mongodb';
import { NeutrinoService } from '../neutrino/neutrino.service';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact) private readonly contactRepository: Repository<Contact>,
        private readonly neutrinoService: NeutrinoService
    ) { }

    async getAll() {
        return await this.contactRepository.find();
    }

    async get(id: string) {
        return await this.contactRepository.findOne(id);
    }

    async getForIdUser(id_user: string) {
        return await this.contactRepository.find({ id_user });
    }

    async create(contact: Contact[]) {
        if (this.verifyPhones(contact.map(c => c.phone))) {
            return await this.contactRepository.save(contact);
        } else {
            return null;
        }
    }

    async update(contact: Contact) {
        return await this.contactRepository.update({ _id: new mongo.ObjectId(contact._id) }, contact);
    }

    async getBetweenUsers(userId1, userId2) {
        return (await this.contactRepository.find({})).filter(c => c.id_user == userId1 || c.id_user == userId2);
    }

    async delete(id: string) {
        return await this.contactRepository.delete(id);
    }

    verifyPhones(phones: Array<string>) {
        console.log(JSON.stringify(phones));
        var count = 0;
        do {
            for (var i = 0; i < phones.length; i++) {
                console.log(`Verificando ${phones[i]}`);
                if (this.neutrinoService.verifyNumber(phones[i])) {
                    return false;
                }
                count++;
            }
        } while (count!=phones.length);
        return true;
    }
}