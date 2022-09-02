import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'channels' })
export class Channel {
  @Field(() => Int, { description: 'channel id' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { description: 'channel name' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'channel name',
  })
  name: string;

  @Field(() => Date, { description: 'channel created time' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: 'channel updated time' })
  @UpdateDateColumn()
  updatedAt: Date;
}
