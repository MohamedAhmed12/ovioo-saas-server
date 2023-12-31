import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuardUserDto } from 'src/user/dto/auth-guard-user.dto';
import { UserRoleEnum } from 'src/user/enums/user-role.enum';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Team } from './team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getTeam({ email, provider }: AuthGuardUserDto): Promise<Team> {
    const user = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['team.members'],
    });

    const ownerIndex = user.team.members.findIndex(
      (member: User) => member.id == user.team.owner_id,
    );
    const owner = user.team.members[+ownerIndex];
    user.team.members.splice(+ownerIndex, 1);
    user.team.members.unshift(owner);

    return user.team;
  }

  async transferOwnership(
    memberId: string,
    { email, provider }: { email: string; provider: string },
  ): Promise<boolean> {
    const authUser = await this.userRepository.findOne({
      where: {
        email,
        provider,
      },
      relations: ['team.members'],
    });

    if (
      authUser.id != authUser.team.owner_id &&
      authUser.role == UserRoleEnum.User
    )
      throw new ForbiddenException('Not allowed');

    let memberIndex = -1;

    authUser.team.members.map((user, i) => {
      if (user.id === +memberId) {
        user.role = UserRoleEnum.User;
        memberIndex = i;
      } else {
        user.role = UserRoleEnum.Member;
      }
    });

    if (memberIndex == -1)
      throw new NotFoundException('Couldn’t find team member matches this id.');

    this.userRepository.save(authUser.team.members);

    authUser.team.owner_id = +memberId;
    this.teamRepository.save(authUser.team);

    return true;
  }
}
