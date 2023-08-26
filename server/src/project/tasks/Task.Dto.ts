// src/tasks/dto/create-task.dto.ts
export class CreateTaskDto {
   taskTitle: string;
   taskDescription: string;
}

// src/tasks/dto/update-task.dto.ts
export class UpdateTaskDto {
  readonly taskTitle?: string;
  readonly taskDescription?: string;
}
