import { HttpModule, HttpService, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import * as fs from 'fs';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './services/users/users.service';
import { User } from './models/user';
import { Contact } from './models/contact';
import { ContactsService } from './services/contacts/contacts.service';
import { NeutrinoService } from './services/neutrino/neutrino.service';
import { Config } from './config';

const ca = fs.readFileSync('/home/fran/Documentos/bnext.crt');
const key = fs.readFileSync('/home/fran/Documentos/bnext_key.pem').toString();

@Module({

  imports:
    [TypeOrmModule.forRoot(
        Config.orm
    ),
    TypeOrmModule.forFeature([User, Contact]),
    HttpModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, ContactsService, NeutrinoService],
})
export class AppModule { }
