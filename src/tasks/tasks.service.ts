import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRespository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.taskRespository.getTasks(filterDTO);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRespository.findOneBy({ id: id });
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.taskRespository.createTask(createTaskDTO);
  }

  async deleteTask(id: number): Promise<object> {
    const task = this.taskRespository.delete(id);
    if ((await task).affected === 0) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
    return {
      success: true,
      message: `Task with id: ${id} deleted successfully.`,
    };
  }

  async updateTaskStatus(
    id: number,
    updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = updateTaskStatusDTO.status;
    task.save();
    return task;
  }
}
