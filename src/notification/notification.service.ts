import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { ListNotificationsDto } from './dto/list-notifications.dto';
import { NotificationDto } from './dto/notification.dto';
import { Notification } from './notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async listNotifications(
    authUser: User,
    { page, offsetPlus = 0, limit = 10 }: ListNotificationsDto,
  ) {
    const offset = (page - 1) * limit + offsetPlus;

    return await this.notificationRepository
      .createQueryBuilder('notifications')
      .select('notifications')
      .where(`notifications.userId = ${authUser.id}`)
      .orderBy('notifications.created_at', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  async sendNotification(data: NotificationDto): Promise<Notification> {
    const notification = await this.notificationRepository.create(data);
    return await this.notificationRepository.save(notification);
  }
}
