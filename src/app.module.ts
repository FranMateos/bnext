import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongoModule } from 'nest-mongodb';
import { UsersController } from './controllers/users/users.controller';
import * as fs from 'fs';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './services/users/users.service';
import { User } from './models/user';
import { Contact } from './models/contact';
import { ContactsService } from './services/contacts/contacts.service';

const ca = fs.readFileSync('/home/fran/Documentos/bnext.crt');
const key = fs.readFileSync('/home/fran/Documentos/bnext_key.pem').toString();
//const pem = fs.readFileSync('/home/fran/Documentos/bnext_mongo.pem').toString();

@Module({

  imports:
    [TypeOrmModule.forRoot(
      {
        type: "mongodb",
        keepAlive: 30000,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        synchronize: true,
        logging: true,
        database: 'bnext',
        host: 'localhost',
        entities: [User, Contact]
        //url: 'mongodb+srv://bnext01-shard-00-01.bf2jg.mongodb.net',
        //url: 'mongodb+srv://bnext01-shard-00-01.bf2jg.mongodb.net/bnext',
        //ssl: true,
        //sslCert: ca,
        //sslKey: key,
        //authSource: '$external',
        //w: 'mayority',
        //authMechanism: 'MONGODB-X509'
      }
    ),
    TypeOrmModule.forFeature([User, Contact])
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, ContactsService],
})
export class AppModule { }
