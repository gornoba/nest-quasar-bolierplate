import { IsUUID } from 'class-validator';
import {
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
  Column,
} from 'typeorm';
import { timeFormat } from '../util';

export abstract class CommonEntity {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  created_at: string;

  @BeforeInsert()
  insertTimestamp() {
    this.created_at = timeFormat('YYYY-MM-DD HH:mm:ss');
  }

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: string | null;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated_at = timeFormat('YYYY-MM-DD HH:mm:ss');
  }

  @Column({
    type: 'varchar',
    nullable: true,
  })
  created_writer: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  updated_writer: string | null;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;
}
