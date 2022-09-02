import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateChannelInput {
  @Field({ description: 'channel name' })
  @IsNotEmpty({ message: 'channel name is required' })
  @IsString({ message: 'channel name must be a string' })
  name: string;
}
