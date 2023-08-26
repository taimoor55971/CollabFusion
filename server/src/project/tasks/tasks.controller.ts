import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './Task.Dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(parseInt(id));
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Query('projectId') projectId: string // Add projectId query parameter
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, parseInt(projectId));
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(parseInt(id));
  }


  @Get('search/:query') // Change the route pattern
  async searchTasks(@Param('query') query: string): Promise<Task[]> {
    return this.taskService.searchTasksByRegex(query);
  }
}
