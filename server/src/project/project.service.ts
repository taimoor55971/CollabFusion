import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Project } from '@prisma/client';
import { ProjectDto } from './Project.Dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../Mail/Mail.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaClient,
    private JwtService: JwtService,
    private mailService: MailService,
  ) {}

  async createProject(
    accessToken: string,
    projectDto: ProjectDto,
  ): Promise<Project> {
    const { projectTitle, projectDescription } = projectDto;
    const decodeToken = (await this.JwtService.decode(accessToken)) as {
      sub: number;
      username: string;
      email: string;
    };

    const project = await this.prisma.project.create({
      data: {
        projectTitle,
        projectDescription,
        adminId: decodeToken.sub,
        collaborators: { connect: [{ id: decodeToken.sub }] }, // Connect the admin as a collaborator
      },
    });

    return project;
  }

  async getProjectById(projectId: number): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id: projectId },
    });
  }

  async getAllProjectsByAdmin(adminId: number) {
    return this.prisma.project.findMany({
      where: {
        adminId: adminId,
      },
    });
  }

  async updateProject(
    accessToken: string,
    projectId: string,
    updatedProjectDto: ProjectDto,
  ): Promise<Project> {
    const { projectTitle, projectDescription } = updatedProjectDto;
    const decodeToken = (await this.JwtService.decode(accessToken)) as {
      sub: number;
      username: string;
      email: string;
    };

    const project = await this.prisma.project.update({
      where: { id: parseInt(projectId), adminId: decodeToken.sub },
      data: {
        projectTitle,
        projectDescription,
      },
    });

    return project;
  }

  async deleteProject(accessToken: string, projectId: number): Promise<void> {
    const decodeToken = (await this.JwtService.decode(accessToken)) as {
      sub: number;
      username: string;
      email: string;
    };

    await this.prisma.project.delete({
      where: { id: projectId, adminId: decodeToken.sub },
    });
  }

  async sendInvitationEmail(
    projectId: number,
    email: string,
    accessToken: string
  ): Promise<void> {
    const project = await this.getProjectById(projectId);
  
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
  
    const decodeToken = (await this.JwtService.decode(accessToken)) as {
      sub: number;
      username: string;
      email: string;
    };
  
    if (project.adminId !== decodeToken.sub) {
      throw new ForbiddenException('Only the project admin can send invites');
    }
  
    // Check if the collaborator's email already exists in the user database
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email },
    });
  
    if (!userWithSameEmail) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  
    // Update the project to associate the user as a collaborator
    await this.prisma.project.update({
      where: { id: projectId },
      data: { collaborators: { connect: { id: userWithSameEmail.id } } },
    });
  
    // Now you can send the invitation email
    const subject = `Invitation to Collaborate on Project: ${project.projectTitle}`;
    const html = `
      <p>You have been invited to collaborate on the project "${project.projectTitle}".</p>
      <p>Click <a href="${process.env.FRONTEND_URL}/accept-invitation/${project.id}">here</a> to accept the invitation.</p>
    `;
  
    await this.mailService.sendEmail(email, subject, html);
  }
  
  

  }
