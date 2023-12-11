import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { BaseRepository } from 'src/base/base.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends BaseRepository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource);
  }

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(
    { title, description }: CreateTaskDTO,
    user: User,
  ): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user: user,
    });

    await this.save(task);
    delete task.user;
    return task;
  }
}
