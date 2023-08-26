// src/tasks/task.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './Task.Dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto, projectId: number): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        taskTitle: createTaskDto.taskTitle,
        taskDescription: createTaskDto.taskDescription,
        numCommits: 0, // Initial value
        projectId: projectId, // Use the provided projectId
      },
    });

    // Now, associate the created task with the project
    await this.prisma.project.update({
      where: { id: projectId },
      data: { tasks: { connect: { id: task.id } } },
    });

    return task;
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    const task = await this.getTaskById(id);
    await this.prisma.task.delete({
      where: { id },
    });
    return task;
  }

  async searchTasksByRegex(query: string): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        OR: [
          { taskTitle: { contains: query, mode: 'insensitive' } },
          { taskDescription: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}
