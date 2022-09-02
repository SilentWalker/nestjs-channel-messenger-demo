import { CreateChannelInput } from './create-channel.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChannelInput extends PartialType(CreateChannelInput) {}
