import { Controller, Get, Query, Post, Body, Req, Request, BadRequestException, Put, Param, Delete } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProjectDto } from './Dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private prisma: PrismaClient,private ProjectService:ProjectService) {}

  // const accessToken=localStorage(this.accessToken)
  

  @Get()
  async getAllProjects(@Query('adminId') adminId: number) {
    const projects = await this.prisma.project.findMany({
      where: {
        adminId: adminId,
      },
    });

    return projects;
  }

  @Post('/create')
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
