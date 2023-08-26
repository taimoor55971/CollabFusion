// src/project/project.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';
import { ProjectDto } from './Project.Dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaClient,private JwtService:JwtService) {}

  async createProject(accessToken:string, projectDto: ProjectDto): Promise<Project> {
  const { projectTitle, projectDescription } = projectDto;
const decodeToken=await this.JwtService.decode(accessToken) as { sub: number, username: string, email: string };

  const project = await this.prisma.project.create({
    data: {
      projectTitle,
      projectDescription,
      adminId:decodeToken.sub,
      collaborators: { connect: [{ id: decodeToken.sub }] } // Connect the admin as a collaborator


    },
    
  });

  return project;
}

    // return `${this.prisma.project.create({
    //   data: {
    //     projectTitle,
    //     projectDescription,
    //     adminId,
    //   },
    // })}`


   



  async getAllProjectsByAdmin(adminId: number) {
    return this.prisma.project.findMany({
      where: {
        adminId:adminId ,
      },
    });
  }


  async updateProject(accessToken: string, projectId: string, updatedProjectDto: ProjectDto): Promise<Project> {
    const { projectTitle, projectDescription } = updatedProjectDto;
    const decodeToken = await this.JwtService.decode(accessToken) as { sub: number, username: string, email: string };
    
    const project = await this.prisma.project.update({
      where: { id: parseInt(projectId), adminId: decodeToken.sub },
      data: {
        projectTitle,
        projectDescription,
      },
    });
  
    return project;
  }


  async deleteProject(accessToken: string, projectId: string): Promise<void> {
    const decodeToken = await this.JwtService.decode(accessToken) as { sub: number, username: string, email: string };
    
    
    await this.prisma.project.delete({
      where: { id: parseInt(projectId) , adminId: decodeToken.sub },
    });
  }
  
  
}


