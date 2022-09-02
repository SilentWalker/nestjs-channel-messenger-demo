import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMessageInput {
  @Field({ description: 'message title' })
  @IsNotEmpty({ message: 'message title is required' })
  @IsString({ message: 'message title must be a string' })
  title: string;

  @Field({ description: 'message content' })
  @IsNotEmpty({ message: 'message content is required' })
  @IsString({ message: 'message content must be a string' })
  content: string;

  @Field(() => Int, { description: 'channel id' })
  @IsNotEmpty({ message: 'channel id is required' })
  channelId: number;
}
