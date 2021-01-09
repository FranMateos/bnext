import { Controller, Get } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { AppService } from './app.service';
import * as mongo from 'mongodb';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    @InjectDb() private readonly db: mongo.Db) {
      console.log(`Conectado a la base de datos ${db.databaseName}`);
    }

  @Get()
  getHello(): string {
    return "El servicio está levantado";
  }
}
