import { Controller, Get } from '@nestjs/common';
import { InjectDb } from 'nest-mongodb';
import { AppService } from './app.service';
import * as mongo from 'mongodb';
import { getConnection } from 'typeorm';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService){}

  @Get()
  getHello(): string {
    return JSON.stringify(getConnection().isConnected?'El servicio está levantado':'Hay algún problema con el pool de datos');
  }
}
