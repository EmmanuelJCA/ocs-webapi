import { UseDto } from '../../../decorators';
import { Column, Entity, OneToMany } from 'typeorm';
import { CancerStageDto } from '../dtos/cancer-stage.dto';
import { DiagnosticEntity } from '../../diagnostic/entities/diagnostic.entity';
import { AbstractEntity } from '../../../common/abstract.entity';

@Entity({ name: 'cancer_stages' })
@UseDto(CancerStageDto)
export class CancerStageEntity extends AbstractEntity<CancerStageDto> {
  @Column({ type: 'int' })
  level!: number;

  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @OneToMany(
    () => DiagnosticEntity,
    diagnostic => diagnostic.cancerStage
  )
  diagnostics!: DiagnosticEntity[];
}
