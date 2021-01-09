import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from 'nest-mongodb';
import { UsersController } from './controllers/users/users.controller';
import * as fs from 'fs';

const credentials = fs.readFileSync('/home/fran/Documentos/bnext_mongo.pem');

@Module({

  imports: 
  [MongoModule.forRoot('mongodb+srv://bnext01.bf2jg.mongodb.net/bnext?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority',
   'bnext', {
    sslKey: credentials,
    sslCert: credentials,
    useUnifiedTopology: true
  }
  )],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule { }
