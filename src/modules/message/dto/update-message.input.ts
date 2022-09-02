import { CreateMessageInput } from './create-message.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {}
