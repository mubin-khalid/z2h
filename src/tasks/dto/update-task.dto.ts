import { IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskStatusDTO {
  @IsNotEmpty()
  status: TaskStatus;
}
