import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { User } from 'src/models/user';
import { Contact } from 'src/models/contact';
import * as mongo from 'mongodb';
import { UsersService } from 'src/services/users/users.service';
import { ContactsService } from 'src/services/contacts/contacts.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService,
        private readonly contactsService: ContactsService
    ) { }

    // get list of users
    @Get()
    async getUsers(@Res() res) {
        const result = await this.usersService.getAll();
        if (result) {
            res.status(HttpStatus.OK).json({
                code: 101,
                message: 'list all',
                success: true,
                users: result
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 102,
                message: 'error on process',
                success: false
            });
        }
    }

    @Get('contacts')
    async getContacts(@Res() res){
        const result = await this.contactsService.getAll();
        if (result) {
            res.status(HttpStatus.OK).json({
                code: 101,
                message: 'list all',
                success: true,
                contacts: result
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 102,
                message: 'error on process',
                success: false
            });
        }
    }
    // find user by ID
    @Get(':id')
    async getUser(@Res() res, @Param() param) {
        if (mongo.ObjectID.isValid(param.id)) {
            const result = await this.usersService.get(param.id);
            if (result) {
                res.status(HttpStatus.OK).json({
                    code: 121,
                    message: 'list user',
                    success: true,
                    user: result
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    code: 122,
                    message: 'error on process',
                    success: false
                });
            }
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 123,
                message: 'id not valid',
                success: false
            });
        }
    }

    // create user and contacts if are provided
    @Post()
    async create(@Res() res, @Body() user: User) {
        const u = new User();
        u.name = user.name;
        u.lastName = user.lastName;
        u.phone = user.phone;
        const result = await this.usersService.create(u);
        const contacts = user.contacts;
        if (result) {
            // save contacts
            if (contacts) {
                // var cs = new Array<Contact>();
                contacts.map(c => { c.id_user, c.contactName, c.phone });
                // contacts.map(c => result._id ?{...c, id_user:result._id.toString(), contactName:c.contactName, phone:c.phone}:[]);
                contacts.forEach(ct => {
                    ct.id_user = result._id.toString();
                });
                const resu = await this.contactsService.create(contacts);
                if (resu) {
                    res.status(HttpStatus.CREATED).json({
                        code: 131,
                        message: 'successfully user created',
                        success: true,
                        user: user,
                        contacts: resu
                    });
                } else {
                    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                        code: 132,
                        message: 'creation contacts error',
                        success: false,
                        user: user
                    });
                }
            } else {
                res.status(HttpStatus.CREATED).json({
                    code: 133,
                    message: 'successfully user created',
                    success: true,
                    user: user
                });
            }
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 134,
                message: 'creation error',
                success: false
            });
        }
    }

    @Post('contacts')
    async createContacts(@Res() res, @Body() contact: Contact[]) {
        const result = await this.contactsService.create(contact);
        if (result) {
            res.status(HttpStatus.CREATED).json({
                code: 141,
                message: 'successfully created',
                success: true,
                user: result
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 142,
                message: 'error',
                success: false
            });
        }
    }

    @Get('contacts/:id')
    async getAllContactsUser(@Res() res, @Param() param) {
        if (mongo.ObjectID.isValid(param.id)) {
            const result = await this.contactsService.getForIdUser(param.id);
            if (result && result.length > 0) {
                res.status(HttpStatus.OK).json({
                    code: 151,
                    message: 'successfully extract data',
                    success: true,
                    contacts: result
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    code: 152,
                    message: 'not found error',
                    success: false
                });
            }
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 153,
                message: 'error',
                success: false
            });
        }
    }

    @Put('contacts')
    async upsertContact(@Res() res, @Body() contact:Contact) {
        console.log(`Contactos vale ${JSON.stringify(contact)}`);
        if (contact&&JSON.stringify(contact)!="{}") {
            const result = await this.contactsService.update(contact);
            if (result && result.affected > 0) {
                res.status(HttpStatus.OK).json({
                    code: 161,
                    message: 'successfully extract data',
                    success: true,
                    contacts: result
                });
            } else {
                res.status(HttpStatus.NOT_FOUND).json({
                    code: 162,
                    message: 'not found error',
                    success: false
                });
            }
        }else{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 163,
                message: 'not received object error',
                success: false
            });
        }
    }

    @Get('contacts/:userId1/:userId2')
    async getContactsBetweenUsers(@Res() res, @Param() params) {
        if(mongo.ObjectID.isValid(params.userId1)&&mongo.ObjectID.isValid(params.userId1)){
            // const result = await this.contactsService.getBetweenUsers(params.userId1, params.userId2);
            const result = await this.contactsService.getBetweenUsers(params.userId1, params.userId2);
            var a1 = result.filter(c=>c.id_user==params.userId1);
            var a2 = result.filter(c=>c.id_user==params.userId2);
            var af = [];
            a1.forEach(element => {
                if(a2.find(e=>e.contactName==element.contactName&&e.phone==element.phone)){
                    af.push(element);
                }
            });
            if(af&&JSON.stringify(af)!="{}"){
                res.status(HttpStatus.OK).json({
                    code: 171,
                    message: 'successfully extract data',
                    success: true,
                    contacts: af
                });
            }else{
                res.status(HttpStatus.NOT_FOUND).json({
                    code: 172,
                    message: 'not found error',
                    success: false
                });
            }
        }else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                code: 173,
                message: 'error',
                success: false
            });
        }
    }

}