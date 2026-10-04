import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TaskModule } from './task/task.module.js';
import { ConfigModule } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
      ConfigModule.forRoot({ 
      isGlobal: true, 
    }), 
      MongooseModule.forRoot( 
      process.env.MONGO_URI!, 
      
    ),
    TaskModule, 
    AuthModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
