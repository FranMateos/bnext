import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { User } from 'src/models/user';
import { Contact } from 'src/models/contact';
import * as mongo from 'mongodb';

@Controller('users')
export class UsersController {

    constructor(
        @InjectDb() private readonly db: mongo.Db
    ) { }

    @Get()
    getUsers() {
        return this.db.collection('users').find({}).toArray();
    }

    @Get(':id')
    getUser(@Param() param) {
        if(mongo.ObjectID.isValid(param.id)){
            const result = this.db.collection('users').findOne({_id:new mongo.ObjectId(param.id)});
            if(result&&result.toString().length>0){
                return result;
            }else{
                return {
                    error: 121
                }
            }
        }else{
            return {
                error: 122
            }
        }
    }

    @Post()
    async create(@Body() user: User) {
        const result = await this.db.collection('users').insertOne(user);
        if (result.insertedCount > 0) {
            return "Usuario creado " + JSON.stringify(user);
        } else {
            return {
                error: 131
            }
        }
    }

    @Put('contacts')
    async update(@Body() contact: Contact) {
        const result = await this.db.collection('contacts').updateMany({id_user:contact.id_user}, contact, {upsert:true});
        if (result.modifiedCount > 0) {
            if(result.upsertedCount>0||result.modifiedCount>0){
                return {upsert:result.upsertedCount, modified:result.modifiedCount};
            }else{
                return {
                    error: 141
                }
            }
        } else {
            return {
                error: 142
            }
        }
    }

    @Get(':id1/:id2')
    getContactsBetweenUsers(@Param() params: string[]): string {
        return "getContactsBetweenUsers works " + JSON.stringify({ params });
    }

    @Get(':id')
    getContactsUser(@Param() id: string): string {
        return "getContactsUser works";
    }

}