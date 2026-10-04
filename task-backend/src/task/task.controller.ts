import { Controller, Get, Param , Delete , Body , Post, Query , Put , Patch, UseGuards} from '@nestjs/common';
import { TaskService } from './task.service.js';
import type { taskDto } from './Dto/createTaskDto.js';
import type { updateTaskDto } from './Dto/updateTaskDto.js';
import { JwtAuthGuard } from '../auth/jwt-auth-guard.js';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
constructor(private readonly taskService : TaskService){}


@Get()
getTask(@Query('status') status?:string){
   return this.taskService.getTask(status)
}


@Get(':id')
getTaskById(@Param('id') id:string){
    return this.taskService.getTaskById(id)
}

@Delete(':id')
deleteTask(@Param('id') id:string){
    return this.taskService.deleteTask(id)
}
@Post()
createTask(@Body() data:taskDto){
    return this.taskService.createTask(data)
}

@Put(':id')
updateTask(@Body() data:taskDto , @Param('id') id:string){
    return this.taskService.updateTask(id,data);
}

@Patch(':id')
partialUpdateTask(@Body() data:updateTaskDto , @Param('id') id:string){
    return this.taskService.partialUpdateTask(id,data);
}

// @Put(':id')
// updateTask(@Body() data:taskDto , @Param('id') id:string){
//     return this.taskService.updateTask(Number(id),data)
// }

// @Patch(':id')
// partialUpdateTask(@Body() data:updateTaskDto , @Param('id') id:string){
//     return this.taskService.partialUpdateTask(Number(id) , data)
// }




}
