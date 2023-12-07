import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task.dto';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO) {
    return this.tasksService.getTasks(filterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<object> {
    return this.tasksService.deleteTask(id);
  }

  /* The `@Patch('/:id/status')` decorator is used to define a PATCH route for updating the status of a
  task. */
  @Patch('/:id/status')
  /* The `updateTask` method in the `TasksController` class is responsible for updating the status of a
  task. It takes in the task ID as a parameter from the route URL and the updated task status from
  the request body. It then calls the `updateTaskStatus` method from the `TasksService` class to
  update the task status and returns the updated task. */
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDTO);
  }
}
