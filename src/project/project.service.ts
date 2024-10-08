import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listProjects({ email }: AuthGuardUserDto): Promise<Project[]> {
    const authUser = await this.userRepository.findOne({
      where: { email },
      relations: ['teams.projects'],
    });

    return authUser.teams[0].projects;
  }

  async showProject(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({ id: +id });
  }

  async createProject(
    { email }: AuthGuardUserDto,
    data: CreateProjectDto,
  ): Promise<Project> {
    const authUser = await this.userRepository.findOneBy({ email });

    if (!authUser) throw new ForbiddenException('Not allowed');

    const project = this.projectRepository.create({
      ...data,
      team: authUser.teams[0],
    });

    return await this.projectRepository.save(project);
  }

  async updateProject(data: UpdateProjectDto): Promise<boolean> {
    let project = await this.projectRepository.findOneBy({ id: +data.id });

    if (!project)
      throw new NotFoundException('Couldn’t find project matches id.');

    project = await this.projectRepository.merge(project, data);
    return await !!this.projectRepository.update(project.id, project);
  }

  async deleteProject(id: string): Promise<boolean> {
    return await !!this.projectRepository.delete(id);
  }
}
