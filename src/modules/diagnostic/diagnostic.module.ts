import { Module } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticEntity } from './entities/diagnostic.entity';
import { CancerTypeEntity } from '../cancer/entities/cancer-type.entity';
import { CancerStageEntity } from '../cancer/entities/cancer-stage.entity';
import { AppointmentModule } from '../appointment/appointment.module';
import { CancerModule } from '../cancer/cancer.module';
import { DiagnosticController } from './diagnostic.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiagnosticEntity, CancerTypeEntity, CancerStageEntity]),
    AppointmentModule,
    CancerModule
  ],
  exports: [],
  providers: [DiagnosticService],
  controllers: [DiagnosticController],
})
export class DiagnosticModule {}
