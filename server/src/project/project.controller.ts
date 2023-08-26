import { Controller, Get, Query, Post, Body, Req, Request, BadRequestException, Put, Param, Delete, UseGuards,HttpCode,HttpStatus } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProjectDto } from './Project.Dto';
import { ProjectService } from './project.service';
import { AuthenticationMiddleware } from 'src/middleware/authentication/authentication.middleware';

@Controller('project')
export class ProjectController {
  constructor(private prisma: PrismaClient,private ProjectService:ProjectService) {}

  // const accessToken=localStorage(this.accessToken)
  

  @Get(':adminId')
  async getProjectsByAdmin(@Param('adminId') adminId: string) {
    const numericAdminId = parseInt(adminId, 10); // Convert the string to a number
    const projects = await this.ProjectService.getAllProjectsByAdmin(numericAdminId);
    return projects;
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)

async createProject(@Body() projectDto: ProjectDto, @Req() request: Request) {
  const authorizationHeader = request.headers['authorization'];
  
  if (!authorizationHeader || !authorizationHeader) {
    throw new BadRequestException('Missing or invalid Authorization header');
  }

  const accessToken = authorizationHeader;
  return await this.ProjectService.createProject(accessToken, projectDto);
}

@Put('/update')
  async updateProject(
    @Query('projectId') projectId: string,
    @Body() updatedProjectDto: ProjectDto,
    @Req() request: Request
  ) {
    const authorizationHeader = request.headers['authorization'];
  
    if (!authorizationHeader || !authorizationHeader) {
      throw new BadRequestException('Missing or invalid Authorization header');
    }

    const accessToken = authorizationHeader;
    return await this.ProjectService.updateProject(accessToken, projectId, updatedProjectDto);
  }


  @Delete('/delete')
  async deleteProject(@Query('projectId') projectId: string, @Req() request: Request) {
    const authorizationHeader = request.headers['authorization'];
  
    if (!authorizationHeader || !authorizationHeader) {
      throw new BadRequestException('Missing or invalid Authorization header');
    }

    const accessToken = authorizationHeader;

    return await this.ProjectService.deleteProject(accessToken, projectId);
  }

}
