import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentEntity } from './entities/treatment.entity';
import { TreatmentTypeEntity } from './entities/treatment-type.entity';
import { TreatmentSessionEntity } from './entities/treatment-session.entity';
import { TreatmentService } from './treatment.service';
import { TreatmentTypeController } from './treatment-type.controller';
import { PhysicianModule } from '../physician/physician.module';
import { OncologyCenterModule } from '../oncology-center/oncology-center.module';
import { DiagnosticModule } from '../diagnostic/diagnostic.module';
import { TreatmentsController } from './treatment.controller';
import { RecipeModule } from '../recipe/recipe.module';
import { PhysicianSupportModule } from '../physician-support/physician-support.module';
import { TreatmentSessionsController } from './treatment-sessions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TreatmentEntity, TreatmentTypeEntity, TreatmentSessionEntity]),
    PhysicianModule,
    DiagnosticModule,
    OncologyCenterModule,
    forwardRef(() => RecipeModule),
    PhysicianSupportModule
  ],
  controllers: [TreatmentsController, TreatmentSessionsController, TreatmentTypeController],
  exports: [TreatmentService],
  providers: [TreatmentService],
})
export class TreatmentModule {}
