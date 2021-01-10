import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
       @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async getAll(){
        return await this.userRepository.find();
    }

    async get(id:string){
        return await this.userRepository.findOne(id);
    }

    async create(user:User){
        return await this.userRepository.save(user);
    }

    async update(user:User){
        return await this.userRepository.update(user._id, user);
    }

    async delete(id:string){
        return await this.userRepository.delete(id);
    }
}
