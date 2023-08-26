import { Module } from '@nestjs/common';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
 
})
export class TaskModule {
   controllers: [TaskController]
  providers: [TaskService]}
