import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Channel } from '../../channel/entities/channel.entity';

@ObjectType()
@Entity({ name: 'messages' })
export class Message {
  @Field(() => Int, { description: 'message id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'message title' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'message title',
  })
  title: string;

  @Field(() => String, { description: 'message content' })
  @Column({
    type: 'text',
    nullable: false,
    comment: 'message content',
  })
  content: string;

  @Field({ description: 'channel of the message' })
  @ManyToOne(() => Channel)
  channel: Channel;

  @Field(() => Date, { description: 'message created time' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'message updated time' })
  @UpdateDateColumn()
  updatedAt: Date;
}
