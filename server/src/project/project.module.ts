import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';

@Module({
  
})
export class ProjectModule {
  providers: [ProjectService]
  controllers: [ProjectController]
}
