import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancerTypeEntity } from './entities/cancer-type.entity';
import { CancerStageEntity } from './entities/cancer-stage.entity';
import { CancerService } from './cancer.service';
import { CancerController } from './cancer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CancerTypeEntity, CancerStageEntity])
  ],
  exports: [CancerService],
  providers: [CancerService],
  controllers: [CancerController],
})
export class CancerModule {}
