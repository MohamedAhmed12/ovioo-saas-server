import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
@ObjectType({ description: 'profiles' })
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('text', { default: '', nullable: true })
  @Field(() => String, { nullable: true })
  company_name: string;

  @Column('text', { default: '', nullable: true })
  @Field(() => String, { nullable: true })
  company_website: string;

  @Column('text', { default: '', nullable: true })
  @Field(() => String, { nullable: true })
  business_info: string;

  @Column('text', { default: '', nullable: true })
  @Field(() => String, { nullable: true })
  target_audience: string;

  @Column('text', { default: '', nullable: true })
  @Field(() => String, { nullable: true })
  company_links: string;

  @Column('boolean', { default: false, nullable: true })
  @Field(() => Boolean)
  push_notification_enabled: boolean;

  @Column('boolean', { default: false, nullable: true })
  @Field(() => Boolean)
  mail_notification_enabled: boolean;

  @CreateDateColumn({ nullable: true })
  @Field()
  created_at: Date;

  @CreateDateColumn({ nullable: true })
  @Field()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  @Field(() => User)
  user: User;
}
