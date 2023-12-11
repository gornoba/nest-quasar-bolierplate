import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordRogEntity } from '../entities/record.entity';

@Injectable()
export class RecordRepository {
  constructor(
    @InjectRepository(RecordRogEntity)
    private recordRepository: Repository<RecordRogEntity>,
  ) {}

  async insertData(payload) {
    const {
      method,
      url,
      latency,
      status,
      message,
      result,
      session,
      created_writer,
      body,
    } = payload;

    const record = this.recordRepository.create({
      method,
      url,
      latency,
      status: status ? status : 200,
      message,
      result,
      session,
      created_writer,
      body,
    });
    await this.recordRepository.save(record);
  }
}
