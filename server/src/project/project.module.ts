import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MailService } from 'src/Mail/Mail.service';

@Module({
  

})
export class ProjectModule {
  providers: [ProjectService,MailService]
  controllers: [ProjectController]
}
