import { UseDto } from '../../../decorators';
import { Column, Entity, OneToMany } from 'typeorm';
import { CancerTypeDto } from '../dtos/cancer-type.dto';
import { DiagnosticEntity } from '../../diagnostic/entities/diagnostic.entity';
import { AbstractEntity } from '../../../common/abstract.entity';

@Entity({ name: 'cancer_types' })
@UseDto(CancerTypeDto)
export class CancerTypeEntity extends AbstractEntity<CancerTypeDto> {
  @Column({ unique: true, type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  description!: string;

  @OneToMany(
    () => DiagnosticEntity,
    diagnostic => diagnostic.cancerType
  )
  diagnostics!: DiagnosticEntity[];
}
