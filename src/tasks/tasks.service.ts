import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskStatusDTO } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRespository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.taskRespository.getTasks(filterDTO, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRespository.findOne({
      where: {
        userId: user.id,
        id: id,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found.`);
    }
    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRespository.createTask(createTaskDTO, user);
  }

  async deleteTask(id: number, user: User): Promise<object> {
    const task = this.taskRespository.delete({ id, userId: user.id });
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
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = updateTaskStatusDTO.status;
    task.save();
    return task;
  }
}
