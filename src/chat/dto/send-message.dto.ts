import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { AssetDto } from 'src/asset/dto/create-asset.dto';
import { MessageStatusEnum } from '../enum/message-status.enum';
import { MessageSentSubscriptionDto } from './message-sent-subs.dto';

@InputType()
export class SendMessageDto extends MessageSentSubscriptionDto {
  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  content?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  voice_note_src?: string;

  @IsOptional()
  @Field(() => AssetDto, { nullable: true })
  asset?: AssetDto;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  status?: MessageStatusEnum;
}
