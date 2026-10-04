import { Injectable } from '@nestjs/common';
import type { taskDto } from './Dto/createTaskDto.js';
import type { updateTaskDto } from './Dto/updateTaskDto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(@InjectModel('Task') private taskModel: Model<TaskDocument>
    ){}


async getTask(status?:string){
    if(status){
        return this.taskModel.find({status:status})
    }
    return this.taskModel.find()
}

async getTaskById(id:string){
    const task =  this.taskModel.findOne({id:id})
    if(!task){
        return{
            message : "Task not found"
        }
    }
    return task;
}

async deleteTask(id:string){
    await this.taskModel.findOneAndDelete({id:id})
    return this.taskModel.find()
}

async createTask(data:taskDto){
    if(data.status !== 'completed' && data.status !== 'pending'){
        return {
            message : "Invalid status"
        }
    }
    return this.taskModel.create(data);
}

async updateTask(id:string , data:taskDto){
    const task = await this.taskModel.findOne({id:id})
    if(!task){
        return {
            message : "Task not found"
        } 
    }
     if(data.status !== 'completed' && data.status !== 'pending'){
        return {
            message : "Invalid status"
        }
    }
     task.title = data.title;
     task.status = data.status;
     await task.save();
     return task;
}

async partialUpdateTask(id:string , data:updateTaskDto){
   const task = await this.taskModel.findOne({id:id})
    if(!task){
        return {
            message : "Task not found"
        } 
    }
    if(data.status && data.status !== 'completed' && data.status !== 'pending'){
        return {
            message : "Invalid status"
        }
    }
    Object.assign(task,data)
    await task.save();
    return task;
}

}
