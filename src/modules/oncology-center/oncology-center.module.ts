import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OncologyCenterEntity } from './entities/oncology-center.entity';
import { OncologyCenterController } from './oncology-center.controller';
import { OncologyCenterService } from './oncology-center.service';

@Module({
  imports: [TypeOrmModule.forFeature([OncologyCenterEntity])],
  exports: [OncologyCenterService],
  providers: [OncologyCenterService],
  controllers: [OncologyCenterController],
})
export class OncologyCenterModule {}
