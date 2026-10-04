import { Module } from '@nestjs/common';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports :[
    MongooseModule.forFeature([
      {
      name: 'Task',
      schema : TaskSchema
      }
    ]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
